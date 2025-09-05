<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ZanrSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $zanroviKnjige = [
            'Roman',
            'Triler',
            'Komedija',
            'Drama',
            'Horor',
            'Fantazija',
            'Biografija',
            'Putopis',
            'Kriminalistički',
        ];

        foreach ($zanroviKnjige as $zanr) {
            \App\Models\Zanr::create([
                'nazivZanra' => $zanr
            ]);
        }
    }
}
