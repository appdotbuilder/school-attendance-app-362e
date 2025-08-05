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
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Subject name');
            $table->string('code')->unique()->comment('Subject code');
            $table->text('description')->nullable()->comment('Subject description');
            $table->integer('credits')->default(1)->comment('Subject credits/hours per week');
            $table->string('category')->nullable()->comment('Subject category (core, elective, etc.)');
            $table->boolean('is_active')->default(true)->comment('Subject active status');
            $table->timestamps();
            
            $table->index('code');
            $table->index('category');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};