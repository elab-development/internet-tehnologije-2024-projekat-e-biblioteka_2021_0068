<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserKnjigaResurs;
use Illuminate\Http\Request;

class UserKnjigaController extends OdgovorController
{
    public function pretraziPoKorisniku(Request $request, $userId): \Illuminate\Http\JsonResponse
    {
        $knjige = \App\Models\UserKnjiga::where('userId', $userId)->get();

        return $this->uspesanOdgovor(UserKnjigaResurs::collection($knjige), 'Omiljene knjige korisnika');
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'userId' => 'required|exists:users,id',
            'knjigaId' => 'required|exists:knjige,id',
        ]);
        if ($validator->fails()) {
            return $this->neuspesanOdgovor('Validacija nije uspela', $validator->errors());
        }
        $userKnjiga = \App\Models\UserKnjiga::create(
            [
                'userId' => $request->userId,
                'knjigaId' => $request->knjigaId,
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
