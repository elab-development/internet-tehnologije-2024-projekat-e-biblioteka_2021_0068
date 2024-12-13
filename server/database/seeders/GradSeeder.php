<?php

namespace Database\Seeders;

use App\Models\Grad;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GradSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $gradovi = [
            'Beograd',
            'Novi Sad',
            'Niš',
            'Kragujevac',
            'Subotica',
            'Zrenjanin',
            'Pančevo',
            'Čačak',
            'Kraljevo',
            'Smederevo',
            'Valjevo',
        ];

        foreach ($gradovi as $grad) {
           Grad::create([
                'nazivGrada' => $grad
           ]);
        }
    }
}
