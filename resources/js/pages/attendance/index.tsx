import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { 
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    Filter,
    Calendar,
    User,
    BookOpen,
    UserCheck
} from 'lucide-react';

interface Props {
    attendances: {
        data: Array<{
            id: number;
            attendance_date: string;
            status: string;
            check_in_time?: string;
            notes?: string;
            student: {
                id: number;
                name: string;
                student_id?: string;
            };
            schedule: {
                id: number;
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
            };
            recorded_by: {
                name: string;
            };
        }>;
        links: Array<{
            url?: string;
            label: string;
            active: boolean;
        }>;
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        date?: string;
        status?: string;
    };
    can_manage: boolean;
    [key: string]: unknown;
}

export default function AttendanceIndex({ attendances, filters, can_manage }: Props) {
    const [dateFilter, setDateFilter] = useState(filters.date || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

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

    const applyFilters = () => {
        router.get(route('attendance.index'), {
            date: dateFilter,
            status: statusFilter,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setDateFilter('');
        setStatusFilter('');
        router.get(route('attendance.index'));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Data Absensi - School Attendance" />
            
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href={route('dashboard')} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                ← Kembali ke Dashboard
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900 mt-2">
                                📊 Data Absensi
                            </h1>
                        </div>
                        {can_manage && (
                            <Button 
                                onClick={() => router.get(route('attendance.create'))}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                <UserCheck className="h-4 w-4 mr-2" />
                                Catat Absensi
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Filter className="h-5 w-5 mr-2" />
                            Filter Data
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tanggal
                                </label>
                                <Input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Status
                                </label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Semua Status</SelectItem>
                                        <SelectItem value="present">Hadir</SelectItem>
                                        <SelectItem value="absent">Tidak Hadir</SelectItem>
                                        <SelectItem value="late">Terlambat</SelectItem>
                                        <SelectItem value="excused">Izin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-end gap-2">
                                <Button onClick={applyFilters} className="flex-1">
                                    Terapkan Filter
                                </Button>
                                <Button onClick={clearFilters} variant="outline">
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Attendance List */}
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Daftar Absensi ({attendances.total} data)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {attendances.data.length > 0 ? (
                            <div className="space-y-4">
                                {attendances.data.map((attendance) => (
                                    <div key={attendance.id} className="border rounded-lg p-4 hover:bg-gray-50">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-gray-500" />
                                                        <span className="font-semibold">
                                                            {attendance.student.name}
                                                        </span>
                                                        {attendance.student.student_id && (
                                                            <span className="text-sm text-gray-500">
                                                                ({attendance.student.student_id})
                                                            </span>
                                                        )}
                                                    </div>
                                                    {getStatusBadge(attendance.status)}
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-2">
                                                        <BookOpen className="h-4 w-4" />
                                                        <span>
                                                            {attendance.schedule.subject.name} ({attendance.schedule.subject.code})
                                                        </span>
                                                    </div>
                                                    
                                                    {attendance.schedule.school_class && (
                                                        <div>
                                                            <span className="font-medium">Kelas:</span> {attendance.schedule.school_class.name}
                                                        </div>
                                                    )}
                                                    
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4" />
                                                        <span>
                                                            {new Date(attendance.attendance_date).toLocaleDateString('id-ID', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                    
                                                    {attendance.check_in_time && (
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4" />
                                                            <span>Jam masuk: {attendance.check_in_time}</span>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                {attendance.notes && (
                                                    <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
                                                        <span className="font-medium">Catatan:</span> {attendance.notes}
                                                    </div>
                                                )}
                                                
                                                <div className="mt-2 text-xs text-gray-500">
                                                    Dicatat oleh: {attendance.recorded_by.name}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                                {/* Pagination */}
                                {attendances.last_page > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-6">
                                        {attendances.links.map((link, index) => (
                                            <Button
                                                key={index}
                                                onClick={() => link.url && router.get(link.url)}
                                                variant={link.active ? "default" : "outline"}
                                                size="sm"
                                                disabled={!link.url}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">Belum ada data absensi</p>
                                {can_manage && (
                                    <Button 
                                        onClick={() => router.get(route('attendance.create'))}
                                        className="mt-4 bg-blue-600 hover:bg-blue-700"
                                    >
                                        Catat Absensi Pertama
                                    </Button>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}