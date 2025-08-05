import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    GraduationCap, 
    Users, 
    Calendar, 
    CheckCircle, 
    BookOpen, 
    Shield,
    BarChart3,
    UserCheck,
    School
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistem Absensi Sekolah - Kelola Kehadiran dengan Mudah">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Navigation */}
                <nav className="absolute top-0 right-0 p-6 z-10">
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-lg"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                        <div className="text-center">
                            <div className="flex justify-center items-center mb-8">
                                <div className="bg-blue-100 p-4 rounded-full">
                                    <School className="h-16 w-16 text-blue-600" />
                                </div>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                📚 Sistem Absensi 
                                <span className="block text-blue-600">Sekolah Modern</span>
                            </h1>
                            
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                                Kelola kehadiran siswa dan guru dengan mudah. Sistem terintegrasi untuk admin, guru, dan siswa 
                                dengan fitur pencatatan real-time, laporan otomatis, dan dashboard yang intuitif.
                            </p>
                            
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg inline-flex items-center justify-center"
                                    >
                                        <UserCheck className="h-5 w-5 mr-2" />
                                        Mulai Sekarang
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
                                    >
                                        Masuk Akun
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                ✨ Fitur Unggulan
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Solusi lengkap untuk manajemen kehadiran dengan teknologi modern
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
                                <div className="bg-blue-600 p-3 rounded-lg w-fit mb-6">
                                    <Users className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-Role Management</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Dashboard khusus untuk Admin, Guru, dan Siswa dengan hak akses yang disesuaikan. 
                                    Setiap peran memiliki fitur dan tampilan yang berbeda.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-green-50 p-8 rounded-xl border border-green-100 hover:shadow-lg transition-shadow">
                                <div className="bg-green-600 p-3 rounded-lg w-fit mb-6">
                                    <CheckCircle className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Pencatatan Real-time</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Guru dapat mencatat kehadiran siswa secara langsung dengan status lengkap: 
                                    hadir, tidak hadir, terlambat, atau izin.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-purple-50 p-8 rounded-xl border border-purple-100 hover:shadow-lg transition-shadow">
                                <div className="bg-purple-600 p-3 rounded-lg w-fit mb-6">
                                    <Calendar className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Jadwal Terintegrasi</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Sistem jadwal pelajaran otomatis dengan informasi kelas, mata pelajaran, 
                                    dan guru pengampu yang lengkap.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-orange-50 p-8 rounded-xl border border-orange-100 hover:shadow-lg transition-shadow">
                                <div className="bg-orange-600 p-3 rounded-lg w-fit mb-6">
                                    <BarChart3 className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Laporan & Statistik</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Dashboard dengan grafik dan statistik kehadiran. Siswa dapat melihat 
                                    tingkat kehadiran pribadi mereka.
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="bg-red-50 p-8 rounded-xl border border-red-100 hover:shadow-lg transition-shadow">
                                <div className="bg-red-600 p-3 rounded-lg w-fit mb-6">
                                    <Shield className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Keamanan Data</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Sistem autentikasi yang aman dengan enkripsi data dan kontrol akses 
                                    berdasarkan peran pengguna.
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-100 hover:shadow-lg transition-shadow">
                                <div className="bg-indigo-600 p-3 rounded-lg w-fit mb-6">
                                    <BookOpen className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Manajemen Master Data</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Admin dapat mengelola data siswa, guru, kelas, mata pelajaran, 
                                    dan jadwal dengan interface yang mudah digunakan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Role Overview Section */}
                <div className="bg-gray-50 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                🎯 Tiga Peran Utama
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Setiap pengguna memiliki akses dan fitur yang disesuaikan dengan perannya
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Admin */}
                            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-blue-100">
                                <div className="text-center mb-6">
                                    <div className="bg-blue-600 p-4 rounded-full w-fit mx-auto mb-4">
                                        <Shield className="h-12 w-12 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">👑 Administrator</h3>
                                </div>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Kelola data siswa dan guru
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Atur kelas dan mata pelajaran
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Buat jadwal pelajaran
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Lihat semua statistik
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Monitor aktivitas sistem
                                    </li>
                                </ul>
                            </div>

                            {/* Teacher */}
                            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-green-100">
                                <div className="text-center mb-6">
                                    <div className="bg-green-600 p-4 rounded-full w-fit mx-auto mb-4">
                                        <GraduationCap className="h-12 w-12 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">👩‍🏫 Guru</h3>
                                </div>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Catat kehadiran siswa
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Lihat jadwal mengajar
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Kelola kelas yang diampu
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Tambahkan catatan khusus
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Akses data kehadiran
                                    </li>
                                </ul>
                            </div>

                            {/* Student */}
                            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-purple-100">
                                <div className="text-center mb-6">
                                    <div className="bg-purple-600 p-4 rounded-full w-fit mx-auto mb-4">
                                        <Users className="h-12 w-12 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900">🎓 Siswa</h3>
                                </div>
                                <ul className="space-y-3 text-gray-600">
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Lihat jadwal pelajaran
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Cek riwayat kehadiran
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Monitor tingkat kehadiran
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Lihat mata pelajaran hari ini
                                    </li>
                                    <li className="flex items-center">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        Akses profil pribadi
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-blue-600 py-20">
                    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            🚀 Siap Memulai?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                            Bergabunglah dengan ribuan sekolah yang sudah menggunakan sistem absensi modern. 
                            Daftar sekarang dan rasakan kemudahan pengelolaan kehadiran yang efisien!
                        </p>
                        
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg inline-flex items-center justify-center"
                                >
                                    <UserCheck className="h-5 w-5 mr-2" />
                                    Daftar Gratis
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors inline-flex items-center justify-center"
                                >
                                    Sudah Punya Akun?
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex justify-center items-center mb-6">
                            <School className="h-8 w-8 text-blue-400 mr-2" />
                            <span className="text-xl font-bold text-white">Sistem Absensi Sekolah</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Solusi modern untuk manajemen kehadiran sekolah yang efektif dan efisien
                        </p>
                        <div className="border-t border-gray-800 pt-6">
                            <p className="text-sm text-gray-500">
                                © 2024 Sistem Absensi Sekolah. Dibuat dengan ❤️ menggunakan Laravel dan React.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}