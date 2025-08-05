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
        Schema::create('class_students', function (Blueprint $table) {
            $table->id();
            $table->foreignId('class_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained('users')->onDelete('cascade');
            $table->string('academic_year')->comment('Academic year (e.g., 2024/2025)');
            $table->boolean('is_active')->default(true)->comment('Enrollment active status');
            $table->timestamps();
            
            $table->unique(['class_id', 'student_id', 'academic_year']);
            $table->index(['class_id', 'is_active']);
            $table->index(['student_id', 'is_active']);
            $table->index('academic_year');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_students');
    }
};