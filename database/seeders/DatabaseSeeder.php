<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            SubjectSeeder::class,
        ]);

        // Create default admin user
        $adminRole = \App\Models\Role::where('name', 'admin')->first();
        
        \App\Models\User::factory()->create([
            'name' => 'Administrator',
            'email' => 'admin@school.com',
            'role_id' => $adminRole->id,
            'is_active' => true,
        ]);

        // Create sample teacher
        $teacherRole = \App\Models\Role::where('name', 'teacher')->first();
        
        \App\Models\User::factory()->create([
            'name' => 'Guru Matematika',
            'email' => 'teacher@school.com',
            'role_id' => $teacherRole->id,
            'teacher_id' => 'TCH001',
            'phone' => '081234567890',
            'is_active' => true,
        ]);

        // Create sample student
        $studentRole = \App\Models\Role::where('name', 'student')->first();
        
        \App\Models\User::factory()->create([
            'name' => 'Siswa Demo',
            'email' => 'student@school.com',
            'role_id' => $studentRole->id,
            'student_id' => 'STD001',
            'phone' => '081234567891',
            'is_active' => true,
        ]);

        // Create sample class
        \App\Models\SchoolClass::create([
            'name' => 'X-IPA-1',
            'grade' => '10',
            'major' => 'IPA',
            'capacity' => 30,
            'room' => 'R-101',
            'homeroom_teacher_id' => 2, // Teacher user
            'is_active' => true,
        ]);
    }
}
