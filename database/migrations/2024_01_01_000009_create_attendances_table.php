<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('schedule_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->date('attendance_date')->comment('Date of attendance');
            $table->enum('status', ['present', 'absent', 'late', 'excused'])->comment('Attendance status');
            $table->time('check_in_time')->nullable()->comment('Time student checked in');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->foreignId('recorded_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            $table->unique(['schedule_id', 'student_id', 'attendance_date']);
            $table->index(['student_id', 'attendance_date']);
            $table->index(['schedule_id', 'attendance_date']);
            $table->index(['attendance_date', 'status']);
            $table->index('recorded_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};