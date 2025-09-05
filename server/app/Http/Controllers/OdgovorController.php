<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OdgovorController extends Controller
{
    public function uspesanOdgovor($podaci, $poruka = '')
    {
        return response()->json([
            'uspesno' => true,
            'podaci' => $podaci,
            'poruka' => $poruka
        ]);
    }

    public function neuspesanOdgovor($poruka = '', $errors = [])
    {
        return response()->json([
            'uspesno' => false,
            'poruka' => $poruka,
            'greske' => $errors
        ]);
    }
}
