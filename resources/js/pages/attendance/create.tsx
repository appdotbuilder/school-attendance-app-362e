import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { 
    Save,
    User,
    BookOpen,
    Calendar,
    Clock
} from 'lucide-react';

interface Props {
    schedule: {
        id: number;
        start_time: string;
        end_time: string;
        room?: string;
        subject: {
            name: string;
            code: string;
        };
        school_class: {
            name: string;
        };
    };
    students: Array<{
        id: number;
        name: string;
        student_id?: string;
        attendance?: {
            status: string;
            check_in_time?: string;
            notes?: string;
        };
    }>;
    date: string;
    [key: string]: unknown;
}

export default function AttendanceCreate({ schedule, students, date }: Props) {
    const [attendanceData, setAttendanceData] = useState<{[key: number]: {
        status: string;
        check_in_time: string;
        notes: string;
    }}>(() => {
        const initial: {[key: number]: {status: string; check_in_time: string; notes: string}} = {};
        students.forEach(student => {
            initial[student.id] = {
                status: student.attendance?.status || 'present',
                check_in_time: student.attendance?.check_in_time || '',
                notes: student.attendance?.notes || ''
            };
        });
        return initial;
    });

    const updateAttendance = (studentId: number, field: string, value: string) => {
        setAttendanceData(prev => ({
            ...prev,
            [studentId]: {
                ...prev[studentId],
                [field]: value
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = {
            schedule_id: schedule.id,
            date: date,
            attendances: students.map(student => ({
                student_id: student.id,
                status: attendanceData[student.id]?.status || 'present',
                check_in_time: attendanceData[student.id]?.check_in_time || null,
                notes: attendanceData[student.id]?.notes || null
            }))
        };

        router.post(route('attendance.store'), formData, {
            preserveScroll: true,
            onSuccess: () => {
                // Success handled by redirect in controller
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            }
        });
    };

    const setAllStatus = (status: string) => {
        const newData: {[key: number]: {status: string; check_in_time: string; notes: string}} = {};
        students.forEach(student => {
            newData[student.id] = {
                ...attendanceData[student.id],
                status: status
            };
        });
        setAttendanceData(newData);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Catat Absensi - School Attendance" />
            
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div>
                        <Link href={route('attendance.index')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            ← Kembali ke Data Absensi
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 mt-2">
                            ✏️ Catat Absensi
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Schedule Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BookOpen className="h-5 w-5 mr-2" />
                                Informasi Jadwal
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-700">Mata Pelajaran:</span>
                                    <p className="mt-1">{schedule.subject.name} ({schedule.subject.code})</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Kelas:</span>
                                    <p className="mt-1">{schedule.school_class.name}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Tanggal:</span>
                                    <p className="mt-1 flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {new Date(date).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Waktu:</span>
                                    <p className="mt-1 flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {schedule.start_time} - {schedule.end_time}
                                    </p>
                                    {schedule.room && <p className="text-xs text-gray-500">Ruang: {schedule.room}</p>}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Aksi Cepat</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-2 flex-wrap">
                                <Button 
                                    type="button" 
                                    onClick={() => setAllStatus('present')} 
                                    variant="outline"
                                    className="text-green-600 border-green-200 hover:bg-green-50"
                                >
                                    Semua Hadir
                                </Button>
                                <Button 
                                    type="button" 
                                    onClick={() => setAllStatus('absent')} 
                                    variant="outline"
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                >
                                    Semua Tidak Hadir
                                </Button>
                                <Button 
                                    type="button" 
                                    onClick={() => setAllStatus('late')} 
                                    variant="outline"
                                    className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                                >
                                    Semua Terlambat
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Students List */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <User className="h-5 w-5 mr-2" />
                                Daftar Siswa ({students.length} siswa)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {students.map((student, index) => (
                                    <div key={student.id} className="border rounded-lg p-4 bg-white">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                                                {index + 1}
                                            </div>
                                            
                                            <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4">
                                                <div className="lg:col-span-1">
                                                    <h4 className="font-semibold text-gray-900">{student.name}</h4>
                                                    {student.student_id && (
                                                        <p className="text-sm text-gray-500">NIS: {student.student_id}</p>
                                                    )}
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Status Kehadiran
                                                    </label>
                                                    <Select 
                                                        value={attendanceData[student.id]?.status || 'present'} 
                                                        onValueChange={(value) => updateAttendance(student.id, 'status', value)}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="present">
                                                                <span className="flex items-center">
                                                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                                                    Hadir
                                                                </span>
                                                            </SelectItem>
                                                            <SelectItem value="absent">
                                                                <span className="flex items-center">
                                                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                                                    Tidak Hadir
                                                                </span>
                                                            </SelectItem>
                                                            <SelectItem value="late">
                                                                <span className="flex items-center">
                                                                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                                                                    Terlambat
                                                                </span>
                                                            </SelectItem>
                                                            <SelectItem value="excused">
                                                                <span className="flex items-center">
                                                                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                                                    Izin
                                                                </span>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Jam Masuk (Opsional)
                                                    </label>
                                                    <Input
                                                        type="time"
                                                        value={attendanceData[student.id]?.check_in_time || ''}
                                                        onChange={(e) => updateAttendance(student.id, 'check_in_time', e.target.value)}
                                                        className="w-full"
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Catatan (Opsional)
                                                    </label>
                                                    <Textarea
                                                        value={attendanceData[student.id]?.notes || ''}
                                                        onChange={(e) => updateAttendance(student.id, 'notes', e.target.value)}
                                                        placeholder="Tambahkan catatan..."
                                                        className="w-full resize-none"
                                                        rows={2}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => router.get(route('attendance.index'))}
                        >
                            Batal
                        </Button>
                        <Button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Simpan Absensi
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}