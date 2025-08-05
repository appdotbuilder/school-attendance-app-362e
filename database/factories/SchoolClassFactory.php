<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SchoolClass>
 */
class SchoolClassFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $grade = fake()->randomElement(['10', '11', '12']);
        $major = fake()->randomElement(['IPA', 'IPS', 'Bahasa']);
        $number = fake()->numberBetween(1, 3);
        
        return [
            'name' => "{$grade}-{$major}-{$number}",
            'grade' => $grade,
            'major' => $major,
            'capacity' => fake()->numberBetween(25, 35),
            'room' => 'R-' . fake()->numberBetween(101, 320),
            'homeroom_teacher_id' => null,
            'is_active' => true,
        ];
    }
}