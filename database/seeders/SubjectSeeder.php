<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            [
                'name' => 'Matematika',
                'code' => 'MTK',
                'description' => 'Mata pelajaran Matematika',
                'credits' => 4,
                'category' => 'core'
            ],
            [
                'name' => 'Bahasa Indonesia',
                'code' => 'BIN',
                'description' => 'Mata pelajaran Bahasa Indonesia',
                'credits' => 4,
                'category' => 'core'
            ],
            [
                'name' => 'Bahasa Inggris',
                'code' => 'BIG',
                'description' => 'Mata pelajaran Bahasa Inggris',
                'credits' => 3,
                'category' => 'core'
            ],
            [
                'name' => 'Fisika',
                'code' => 'FIS',
                'description' => 'Mata pelajaran Fisika',
                'credits' => 3,
                'category' => 'science'
            ],
            [
                'name' => 'Kimia',
                'code' => 'KIM',
                'description' => 'Mata pelajaran Kimia',
                'credits' => 3,
                'category' => 'science'
            ],
            [
                'name' => 'Biologi',
                'code' => 'BIO',
                'description' => 'Mata pelajaran Biologi',
                'credits' => 3,
                'category' => 'science'
            ],
            [
                'name' => 'Sejarah',
                'code' => 'SEJ',
                'description' => 'Mata pelajaran Sejarah',
                'credits' => 2,
                'category' => 'social'
            ],
            [
                'name' => 'Geografi',
                'code' => 'GEO',
                'description' => 'Mata pelajaran Geografi',
                'credits' => 2,
                'category' => 'social'
            ],
            [
                'name' => 'Pendidikan Jasmani',
                'code' => 'PJS',
                'description' => 'Mata pelajaran Pendidikan Jasmani',
                'credits' => 2,
                'category' => 'physical'
            ],
            [
                'name' => 'Seni Budaya',
                'code' => 'SBU',
                'description' => 'Mata pelajaran Seni Budaya',
                'credits' => 2,
                'category' => 'arts'
            ]
        ];

        foreach ($subjects as $subject) {
            Subject::firstOrCreate(['code' => $subject['code']], $subject);
        }
    }
}