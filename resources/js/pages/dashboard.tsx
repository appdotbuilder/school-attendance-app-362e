import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { router } from '@inertiajs/react';
import { 
    Users, 
    GraduationCap, 
    BookOpen, 
    Calendar, 
    Clock, 
    CheckCircle,
    XCircle,
    AlertCircle,
    UserCheck
} from 'lucide-react';

interface Props {
    user: {
        id: number;
        name: string;
        email: string;
        role: {
            name: string;
            display_name: string;
        };
        [key: string]: unknown;
    };
    role: string;
    stats?: {
        total_students?: number;
        total_teachers?: number;
        total_classes?: number;
        total_subjects?: number;
        attendance_rate?: number;
        today_classes?: number;
    };
    today_schedules?: Array<{
        id: number;
        start_time: string;
        end_time: string;
        room?: string;
        subject: {
            name: string;
            code: string;
        };
        school_class?: {
            name: string;
        };
        teacher?: {
            name: string;
        };
    }>;
    recent_attendances?: Array<{
        id: number;
        attendance_date: string;
        status: string;
        schedule: {
            subject: {
                name: string;
            };
            teacher: {
                name: string;
            };
        };
    }>;
    recent_activities?: Array<{
        type: string;
        message: string;
        time: string;
    }>;
    [key: string]: unknown;
}

export default function Dashboard({ 
    user, 
    role, 
    stats = {}, 
    today_schedules = [], 
    recent_attendances = [], 
    recent_activities = [] 
}: Props) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'present':
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case 'absent':
                return <XCircle className="h-4 w-4 text-red-500" />;
            case 'late':
                return <Clock className="h-4 w-4 text-yellow-500" />;
            case 'excused':
                return <AlertCircle className="h-4 w-4 text-blue-500" />;
            default:
                return null;
        }
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            present: 'bg-green-100 text-green-800 border-green-200',
            absent: 'bg-red-100 text-red-800 border-red-200',
            late: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            excused: 'bg-blue-100 text-blue-800 border-blue-200'
        };
        
        return (
            <Badge variant="outline" className={variants[status as keyof typeof variants] || ''}>
                {getStatusIcon(status)}
                <span className="ml-1 capitalize">{status}</span>
            </Badge>
        );
    };

    const handleTakeAttendance = (scheduleId: number) => {
        router.get(route('attendance.create'), {
            schedule_id: scheduleId,
            date: new Date().toISOString().split('T')[0]
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Dashboard - School Attendance" />
            
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                📚 Sistem Absensi Sekolah
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Selamat datang, {user.name} ({user.role.display_name})
                            </p>
                        </div>
                        <div className="flex gap-2">
                            {role === 'teacher' && (
                                <Button 
                                    onClick={() => router.get(route('attendance.index'))}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    <UserCheck className="h-4 w-4 mr-2" />
                                    Kelola Absensi
                                </Button>
                            )}
                            {role === 'student' && (
                                <Button 
                                    onClick={() => router.get(route('attendance.index'))}
                                    variant="outline"
                                >
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Riwayat Absensi
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Admin Dashboard */}
                {role === 'admin' && (
                    <div className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card>
                                <CardContent className="flex items-center p-6">
                                    <Users className="h-12 w-12 text-blue-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Siswa</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total_students || 0}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardContent className="flex items-center p-6">
                                    <GraduationCap className="h-12 w-12 text-green-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Guru</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total_teachers || 0}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardContent className="flex items-center p-6">
                                    <BookOpen className="h-12 w-12 text-purple-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Total Kelas</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total_classes || 0}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardContent className="flex items-center p-6">
                                    <Calendar className="h-12 w-12 text-orange-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Mata Pelajaran</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total_subjects || 0}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activities */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Aktivitas Terbaru</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {recent_activities.length > 0 ? (
                                    <div className="space-y-3">
                                        {recent_activities.map((activity, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <span className="text-sm text-gray-700">{activity.message}</span>
                                                <span className="text-xs text-gray-500">{activity.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">Belum ada aktivitas terbaru</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Teacher Dashboard */}
                {role === 'teacher' && (
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardContent className="flex items-center p-6">
                                    <BookOpen className="h-12 w-12 text-blue-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Kelas Diampu</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.total_classes || 0}</p>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardContent className="flex items-center p-6">
                                    <Calendar className="h-12 w-12 text-green-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Jadwal Hari Ini</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.today_classes || 0}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Today's Schedule */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Jadwal Hari Ini</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {today_schedules.length > 0 ? (
                                    <div className="space-y-4">
                                        {today_schedules.map((schedule) => (
                                            <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">
                                                        {schedule.subject.name} ({schedule.subject.code})
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        Kelas: {schedule.school_class?.name} | 
                                                        Waktu: {schedule.start_time} - {schedule.end_time}
                                                        {schedule.room && ` | Ruang: ${schedule.room}`}
                                                    </p>
                                                </div>
                                                <Button 
                                                    onClick={() => handleTakeAttendance(schedule.id)}
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700"
                                                >
                                                    <UserCheck className="h-4 w-4 mr-2" />
                                                    Absen
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">Tidak ada jadwal hari ini</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Student Dashboard */}
                {role === 'student' && (
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardContent className="flex items-center p-6">
                                    <CheckCircle className="h-12 w-12 text-green-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Tingkat Kehadiran</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.attendance_rate || 0}%</p>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardContent className="flex items-center p-6">
                                    <Calendar className="h-12 w-12 text-blue-600" />
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Jadwal Hari Ini</p>
                                        <p className="text-2xl font-bold text-gray-900">{stats.today_classes || 0}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Today's Schedule */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Jadwal Hari Ini</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {today_schedules.length > 0 ? (
                                        <div className="space-y-3">
                                            {today_schedules.map((schedule) => (
                                                <div key={schedule.id} className="p-3 border rounded-lg">
                                                    <h4 className="font-semibold text-gray-900">
                                                        {schedule.subject.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        Guru: {schedule.teacher?.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {schedule.start_time} - {schedule.end_time}
                                                        {schedule.room && ` | ${schedule.room}`}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">Tidak ada jadwal hari ini</p>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Recent Attendance */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Absensi Terakhir</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {recent_attendances.length > 0 ? (
                                        <div className="space-y-3">
                                            {recent_attendances.map((attendance) => (
                                                <div key={attendance.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">
                                                            {attendance.schedule.subject.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            {new Date(attendance.attendance_date).toLocaleDateString('id-ID')}
                                                        </p>
                                                    </div>
                                                    {getStatusBadge(attendance.status)}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">Belum ada data absensi</p>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}