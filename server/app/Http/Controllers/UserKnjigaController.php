<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserKnjigaResurs;
use Illuminate\Http\Request;

class UserKnjigaController extends OdgovorController
{
    public function pretraziPoKorisniku(Request $request, $userId): \Illuminate\Http\JsonResponse
    {
        $knjige = \App\Models\UserKnjiga::where('user_id', $userId)->get();

        return $this->uspesanOdgovor(UserKnjigaResurs::collection($knjige), 'Omiljene knjige korisnika');
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'knjiga_id' => 'required|exists:knjige,id',
        ]);
        if ($validator->fails()) {
            return $this->neuspesanOdgovor('Validacija nije uspela', $validator->errors());
        }
        $userKnjiga = \App\Models\UserKnjiga::create(
            [
                'user_id' => $request->user_id,
                'knjiga_id' => $request->knjiga_id,
                'vreme' => now(),
            ]
        );

        return $this->uspesanOdgovor(new UserKnjigaResurs($userKnjiga), 'Knjiga je dodata u omiljene korisnika');
    }

    public function destroy($id): \Illuminate\Http\JsonResponse
    {
        $userKnjiga = \App\Models\UserKnjiga::find($id);

        if (!$userKnjiga) {
            return $this->neuspesanOdgovor('Knjiga nije pronađena u omiljenim korisnika');
        }

        $userKnjiga->delete();

        return $this->uspesanOdgovor([], 'Knjiga je uklonjena iz omiljenih korisnika');
    }
}
