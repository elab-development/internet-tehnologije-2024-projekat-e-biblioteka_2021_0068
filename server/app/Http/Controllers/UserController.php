<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResurs;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends OdgovorController
{
    public function sviUseri(Request $request)
    {
        $useri = User::all();

        return $this->uspesanOdgovor(UserResurs::collection($useri), 'Svi korisnici');
    }

    public function donatoriBiblioteke(Request $request)
    {
        $url = 'https://randomuser.me/api/?results=7';

        $client = new \GuzzleHttp\Client();

        $response = $client->request('GET', $url);

        $data = json_decode($response->getBody()->getContents());

        $nizLjudi  = [];

        foreach ($data->results as $osoba) {
            $nizLjudi[] = [
                'ime' => $osoba->name->first,
                'prezime' => $osoba->name->last,
                'email' => $osoba->email,
                'slika' => $osoba->picture->large,
                'donacija' => rand(100, 1000) . 'k dinara'
            ];
        }

        return $this->uspesanOdgovor($nizLjudi, 'Donatori biblioteke');
    }
}
