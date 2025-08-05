<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\SchoolClass;
use App\Models\Schedule;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        if (!$user) {
            return redirect()->route('login');
        }

        $data = [
            'user' => $user->load('role'),
            'role' => $user->role ? $user->role->name : 'guest'
        ];

        // Add role-specific data
        $roleName = $user->role ? $user->role->name : null;
        switch ($roleName) {
            case 'admin':
                $data = array_merge($data, $this->getAdminData());
                break;
            case 'teacher':
                $data = array_merge($data, $this->getTeacherData($user));
                break;
            case 'student':
                $data = array_merge($data, $this->getStudentData($user));
                break;
        }

        return Inertia::render('dashboard', $data);
    }

    /**
     * Get admin dashboard data.
     */
    protected function getAdminData(): array
    {
        return [
            'stats' => [
                'total_students' => User::students()->active()->count(),
                'total_teachers' => User::teachers()->active()->count(),
                'total_classes' => SchoolClass::active()->count(),
                'total_subjects' => Subject::active()->count(),
            ],
            'recent_activities' => $this->getRecentActivities(),
        ];
    }

    /**
     * Get teacher dashboard data.
     */
    protected function getTeacherData(User $teacher): array
    {
        $todaySchedules = Schedule::where('teacher_id', $teacher->id)
            ->where('day_of_week', strtolower(now()->format('l')))
            ->where('is_active', true)
            ->with(['schoolClass', 'subject'])
            ->orderBy('start_time')
            ->get();

        return [
            'today_schedules' => $todaySchedules,
            'stats' => [
                'total_classes' => Schedule::where('teacher_id', $teacher->id)
                    ->where('is_active', true)
                    ->distinct('class_id')
                    ->count(),
                'today_classes' => $todaySchedules->count(),
            ],
        ];
    }

    /**
     * Get student dashboard data.
     */
    protected function getStudentData(User $student): array
    {
        $todaySchedules = Schedule::whereHas('schoolClass.classStudents', function ($query) use ($student) {
                $query->where('student_id', $student->id)
                    ->where('is_active', true);
            })
            ->where('day_of_week', strtolower(now()->format('l')))
            ->where('is_active', true)
            ->with(['subject', 'teacher'])
            ->orderBy('start_time')
            ->get();

        $recentAttendances = Attendance::where('student_id', $student->id)
            ->with(['schedule.subject', 'schedule.teacher'])
            ->orderBy('attendance_date', 'desc')
            ->limit(5)
            ->get();

        return [
            'today_schedules' => $todaySchedules,
            'recent_attendances' => $recentAttendances,
            'stats' => [
                'attendance_rate' => $this->calculateAttendanceRate($student),
                'today_classes' => $todaySchedules->count(),
            ],
        ];
    }

    /**
     * Get recent activities for admin.
     */
    protected function getRecentActivities(): array
    {
        $recentAttendances = Attendance::with(['student', 'schedule.subject'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($attendance) {
                return [
                    'type' => 'attendance',
                    'message' => "{$attendance->student->name} - {$attendance->schedule->subject->name} ({$attendance->status})",
                    'time' => $attendance->created_at->diffForHumans(),
                ];
            });

        return $recentAttendances->toArray();
    }

    /**
     * Calculate attendance rate for a student.
     */
    protected function calculateAttendanceRate(User $student): float
    {
        $totalAttendances = Attendance::where('student_id', $student->id)->count();
        
        if ($totalAttendances === 0) {
            return 0;
        }

        $presentAttendances = Attendance::where('student_id', $student->id)
            ->where('status', 'present')
            ->count();

        return round(($presentAttendances / $totalAttendances) * 100, 1);
    }
}