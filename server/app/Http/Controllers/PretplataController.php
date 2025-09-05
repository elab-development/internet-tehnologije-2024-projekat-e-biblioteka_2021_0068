<?php

namespace App\Http\Controllers;

use App\Http\Resources\PretplataResurs;
use App\Models\Pretplata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PretplataController extends OdgovorController
{
    public function aktivnePretplateNadanasnjiDan(Request $request)
    {
        $danas = now()->format('Y-m-d');

        $pretplate = Pretplata::where('datumOd', '<=', $danas)
            ->where('datumDo', '>=', $danas)
            ->get();

        return $this->uspesanOdgovor(PretplataResurs::collection($pretplate), 'Aktivne pretplate na danasnjem danu');
    }

    public function aktivnePretplateZaKorisnika(Request $request, $userId)
    {
        $danas = $request->datum ?? now()->format('Y-m-d');

        $pretplate = Pretplata::where('userId', $userId)
            ->where('datumOd', '<=', $danas)
            ->where('datumDo', '>=', $danas)
            ->get();

        return $this->uspesanOdgovor(PretplataResurs::collection($pretplate), 'Aktivne pretplate za korisnika');
    }

    public function index(Request $request)
    {
        $pretplate = Pretplata::all();

        return $this->uspesanOdgovor(PretplataResurs::collection($pretplate), 'Sve pretplate');
    }

    public function pretplatiSe(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userId' => 'required|exists:users,id',
            'datumOd' => 'required|date',
            'datumDo' => 'required|date|after:datumOd',
        ]);

        if ($validator->fails()) {
            return $this->neuspesanOdgovor('Greska pri validaciji', $validator->errors());
        }

        $pretplata = Pretplata::create($request->all());

        return $this->uspesanOdgovor(new PretplataResurs($pretplata), 'Uspesno ste se pretplatili');
    }
}
