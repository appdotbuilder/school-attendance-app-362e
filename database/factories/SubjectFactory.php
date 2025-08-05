<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subject>
 */
class SubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(2, true),
            'code' => fake()->unique()->regexify('[A-Z]{3}'),
            'description' => fake()->sentence(),
            'credits' => fake()->numberBetween(1, 4),
            'category' => fake()->randomElement(['core', 'science', 'social', 'arts', 'physical']),
            'is_active' => true,
        ];
    }
}