<?php

namespace App\Http\Controllers;

use App\Http\Resources\GradResurs;
use App\Models\Grad;
use Illuminate\Http\Request;

class GradController extends OdgovorController
{
    public function index(Request $request)
    {
        $gradovi = Grad::all();

        return $this->uspesanOdgovor(GradResurs::collection($gradovi), 'Svi gradovi');
    }
}
