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
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_id')->constrained()->onDelete('cascade');
            $table->foreignId('subject_id')->constrained()->onDelete('cascade');
            $table->foreignId('teacher_id')->constrained('users')->onDelete('cascade');
            $table->enum('day_of_week', ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'])->comment('Day of the week');
            $table->time('start_time')->comment('Class start time');
            $table->time('end_time')->comment('Class end time');
            $table->string('room')->nullable()->comment('Classroom location');
            $table->string('academic_year')->comment('Academic year (e.g., 2024/2025)');
            $table->boolean('is_active')->default(true)->comment('Schedule active status');
            $table->timestamps();
            
            $table->index(['class_id', 'day_of_week']);
            $table->index(['teacher_id', 'day_of_week']);
            $table->index(['day_of_week', 'start_time']);
            $table->index('academic_year');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};