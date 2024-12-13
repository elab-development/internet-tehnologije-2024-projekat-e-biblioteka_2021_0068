<?php

namespace Database\Seeders;

use App\Models\Pretplata;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PretplataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();
        $faker = \Faker\Factory::create();

        foreach ($users as $user) {
            Pretplata::create([
                'userId' => $user->id,
                'datumOd' => $faker->dateTimeBetween('-1 year', 'now'),
                'datumDo' => $faker->dateTimeBetween('now', '+1 year')
            ]);
        }
    }
}
