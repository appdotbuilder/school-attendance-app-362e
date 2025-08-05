<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display attendance records.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = Attendance::with(['student', 'schedule.subject', 'schedule.schoolClass', 'recordedBy']);
        
        // Filter based on user role
        if ($user->isTeacher()) {
            $query->whereHas('schedule', function ($q) use ($user) {
                $q->where('teacher_id', $user->id);
            });
        } elseif ($user->isStudent()) {
            $query->where('student_id', $user->id);
        }
        
        // Apply filters
        if ($request->filled('date')) {
            $query->whereDate('attendance_date', $request->date);
        }
        
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        
        $attendances = $query->orderBy('attendance_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(15);
            
        return Inertia::render('attendance/index', [
            'attendances' => $attendances,
            'filters' => $request->only(['date', 'status']),
            'can_manage' => $user->isAdmin() || $user->isTeacher(),
        ]);
    }

    /**
     * Show attendance form for a specific schedule.
     */
    public function create(Request $request)
    {
        $user = $request->user();
        
        if (!$user->isTeacher() && !$user->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }
        
        $scheduleId = $request->get('schedule_id');
        $date = $request->get('date', now()->format('Y-m-d'));
        
        $schedule = Schedule::with(['schoolClass.classStudents.student', 'subject'])
            ->findOrFail($scheduleId);
            
        // Check if teacher owns this schedule
        if ($user->isTeacher() && $schedule->teacher_id !== $user->id) {
            abort(403, 'You can only manage attendance for your own classes.');
        }
        
        $classStudents = $schedule->schoolClass->classStudents()
            ->with('student')
            ->where('is_active', true)
            ->get();
            
        $students = $classStudents->map(function ($classStudent) use ($scheduleId, $date) {
            /** @var \App\Models\ClassStudent $classStudent */
            $student = $classStudent->student;
            $attendance = Attendance::where('schedule_id', $scheduleId)
                ->where('student_id', $student->id)
                ->where('attendance_date', $date)
                ->first();
                
            return [
                'id' => $student->id,
                'name' => $student->name,
                'student_id' => $student->student_id,
                'attendance' => $attendance ? [
                    'status' => $attendance->status,
                    'check_in_time' => $attendance->check_in_time,
                    'notes' => $attendance->notes,
                ] : null,
            ];
        });
        
        return Inertia::render('attendance/create', [
            'schedule' => $schedule,
            'students' => $students,
            'date' => $date,
        ]);
    }

    /**
     * Store attendance records.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        
        if (!$user->isTeacher() && !$user->isAdmin()) {
            abort(403, 'Unauthorized action.');
        }
        
        $validated = $request->validate([
            'schedule_id' => 'required|exists:schedules,id',
            'date' => 'required|date',
            'attendances' => 'required|array',
            'attendances.*.student_id' => 'required|exists:users,id',
            'attendances.*.status' => 'required|in:present,absent,late,excused',
            'attendances.*.check_in_time' => 'nullable|date_format:H:i',
            'attendances.*.notes' => 'nullable|string|max:500',
        ]);
        
        $schedule = Schedule::findOrFail($validated['schedule_id']);
        
        // Check if teacher owns this schedule
        if ($user->isTeacher() && $schedule->teacher_id !== $user->id) {
            abort(403, 'You can only manage attendance for your own classes.');
        }
        
        foreach ($validated['attendances'] as $attendanceData) {
            Attendance::updateOrCreate(
                [
                    'schedule_id' => $validated['schedule_id'],
                    'student_id' => $attendanceData['student_id'],
                    'attendance_date' => $validated['date'],
                ],
                [
                    'status' => $attendanceData['status'],
                    'check_in_time' => $attendanceData['check_in_time'],
                    'notes' => $attendanceData['notes'],
                    'recorded_by' => $user->id,
                ]
            );
        }
        
        return redirect()->route('attendance.index')
            ->with('success', 'Attendance recorded successfully.');
    }
}