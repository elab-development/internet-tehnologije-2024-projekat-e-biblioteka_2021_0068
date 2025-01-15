<?php

namespace App\Http\Controllers;

use App\Http\Resources\ZanrResurs;
use App\Models\Zanr;
use Illuminate\Http\Request;

class ZanrController extends OdgovorController
{
    public function index(Request $request)
    {
        $zanrovi = Zanr::all();

        return $this->uspesanOdgovor(ZanrResurs::collection($zanrovi), 'Svi zanrovi');
    }
}
