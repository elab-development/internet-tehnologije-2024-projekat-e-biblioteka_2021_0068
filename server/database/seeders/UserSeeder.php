<?php

namespace Database\Seeders;

use App\Models\Grad;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kragujevac = Grad::where('nazivGrada', 'Kragujevac')->first();
        $gradovi = Grad::all();

        $user = User::create([
            'name' => 'Katarina',
            'email' => 'katarina@gmail.com',
            'password' => bcrypt('katarina123'),
            'uloga' => 'admin',
            'gradId' => $kragujevac->id,
            'brojTelefona' => '063 323 3443',
            'adresa' => 'Kneza Mihaila 23'
        ]);

        $user2 = User::create([
            'name' => 'Ivana',
            'email' => 'ivana@gmail.com',
            'password' => bcrypt('ivana123'),
            'uloga' => 'bibliotekar',
            'gradId' => $kragujevac->id,
            'brojTelefona' => '063 323 3443',
            'adresa' => 'Kneza Mihaila 32'
        ]);

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            User::create([
                'name' => $faker->name,
                'email' => $faker->email,
                'password' => bcrypt('password'),
                'uloga' => 'korisnik',
                'gradId' => $gradovi->random()->id,
                'brojTelefona' => $faker->phoneNumber,
                'adresa' => $faker->address
            ]);
        }
    }
}
