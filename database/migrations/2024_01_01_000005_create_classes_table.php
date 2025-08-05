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
        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Class name (e.g., X-IPA-1)');
            $table->string('grade')->comment('Grade level (e.g., 10, 11, 12)');
            $table->string('major')->nullable()->comment('Major/specialization (IPA, IPS, etc.)');
            $table->integer('capacity')->default(30)->comment('Maximum students');
            $table->string('room')->nullable()->comment('Classroom location');
            $table->foreignId('homeroom_teacher_id')->nullable()->constrained('users')->onDelete('set null');
            $table->boolean('is_active')->default(true)->comment('Class active status');
            $table->timestamps();
            
            $table->index(['grade', 'major']);
            $table->index('homeroom_teacher_id');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classes');
    }
};