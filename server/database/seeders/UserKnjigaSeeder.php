<?php

namespace Database\Seeders;

use App\Models\UserKnjiga;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserKnjigaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        $users = \App\Models\User::all();
        $knjige = \App\Models\Knjiga::all();

        foreach ($users as $user) {
            UserKnjiga::create([
                'userId' => $user->id,
                'knjigaId' => $knjige->random()->id,
                'vreme' => $faker->dateTimeBetween('-1 year', 'now')
            ]);
        }
    }
}
