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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->nullable()->after('email_verified_at')->constrained()->onDelete('set null');
            $table->string('student_id')->nullable()->after('role_id')->comment('Student ID number');
            $table->string('teacher_id')->nullable()->after('student_id')->comment('Teacher ID number');
            $table->string('phone')->nullable()->after('teacher_id')->comment('Phone number');
            $table->text('address')->nullable()->after('phone')->comment('Address');
            $table->date('date_of_birth')->nullable()->after('address')->comment('Date of birth');
            $table->enum('gender', ['male', 'female'])->nullable()->after('date_of_birth')->comment('Gender');
            $table->boolean('is_active')->default(true)->after('gender')->comment('User active status');
            
            $table->index('role_id');
            $table->index('student_id');
            $table->index('teacher_id');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn([
                'role_id',
                'student_id', 
                'teacher_id',
                'phone',
                'address',
                'date_of_birth',
                'gender',
                'is_active'
            ]);
        });
    }
};