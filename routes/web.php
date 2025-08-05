<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Attendance routes
    Route::controller(AttendanceController::class)->group(function () {
        Route::get('/attendance', 'index')->name('attendance.index');
        Route::get('/attendance/create', 'create')->name('attendance.create');
        Route::post('/attendance', 'store')->name('attendance.store');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';