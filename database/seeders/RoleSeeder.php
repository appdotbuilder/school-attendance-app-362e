<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Full system access and user management capabilities'
            ],
            [
                'name' => 'teacher',
                'display_name' => 'Teacher',
                'description' => 'Can manage attendance for assigned classes and view schedules'
            ],
            [
                'name' => 'student',
                'display_name' => 'Student',
                'description' => 'Can view personal attendance history and schedule'
            ]
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role['name']], $role);
        }
    }
}