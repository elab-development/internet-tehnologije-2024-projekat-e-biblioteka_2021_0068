<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KnjigaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $zanrovi = \App\Models\Zanr::all();
        $testPdfUrl = 'https://klubcitalaca.wordpress.com/wp-content/uploads/2011/06/luis-kerol-alisa-u-zemlji-cuda.pdf';

        for ($i = 0; $i < 100; $i++) {
            $knjiga = \App\Models\Knjiga::create([
                'nazivKnjige' => $faker->sentence(3),
                'autor' => $faker->name,
                'urlKnjige' => $testPdfUrl,
                'zanrId' => $zanrovi->random()->id,
                'uvidKnjige' => $faker->sentence(30)
            ]);
        }
    }
}
