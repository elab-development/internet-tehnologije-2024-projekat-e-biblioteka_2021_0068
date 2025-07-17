<?php

namespace App\Http\Controllers;

use App\Http\Resources\KnjigaResurs;
use App\Models\Knjiga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class KnjigaController extends OdgovorController
{
    public function index(Request $request)
    {
        $knjige = Knjiga::all();

        return $this->uspesanOdgovor(KnjigaResurs::collection($knjige), 'Sve knjige');
    }

    public function show($id)
    {
        $knjiga = Knjiga::find($id);

        if (!$knjiga) {
            return $this->neuspesanOdgovor('Knjiga nije pronadjena');
        }

        return $this->uspesanOdgovor(new KnjigaResurs($knjiga), 'Knjiga pronadjena');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nazivKnjige' => 'required',
            'autor' => 'required',
            'zanrId' => 'required',
            'knjiga' => 'file',
            'uvidKnjige' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->neuspesanOdgovor('Greska pri validaciji', $validator->errors());
        }

        $knjiga = $request->file('knjiga');
        $knjigaNaziv = time() . '.' . $knjiga->getClientOriginalExtension();
        $knjiga->move(public_path('knjige'), $knjigaNaziv);
        $knjigaUrl = url('knjige/' . $knjigaNaziv);

        //100 chars split
        $uvidKnjige = $request->uvidKnjige;

        if (strlen($uvidKnjige) > 100) {
            $uvidKnjige = substr($uvidKnjige, 0, 100);
            $uvidKnjige .= ' ...';
        }

        $knjiga = Knjiga::create([
            'nazivKnjige' => $request->nazivKnjige,
            'autor' => $request->autor,
            'zanrId' => $request->zanrId,
            'urlKnjige' => $knjigaUrl,
            'uvidKnjige' => $uvidKnjige
        ]);

        return $this->uspesanOdgovor(new KnjigaResurs($knjiga), 'Knjiga uspesno dodata');
    }

    public function delete($id)
    {
        $knjiga = Knjiga::find($id);

        if (!$knjiga) {
            return $this->neuspesanOdgovor('Knjiga nije pronadjena');
        }

        $knjiga->delete();

        return $this->uspesanOdgovor([], 'Knjiga uspesno obrisana');
    }

    public function paginacija(Request $request)
    {
        $perPage = $request->perPage ?? 10;

        $knjige = DB::table('knjige')
            ->join('zanrovi', 'knjige.zanrId', '=', 'zanrovi.id')
            ->select('knjige.*', 'zanrovi.nazivZanra')
            ->orderBy('knjige.id', 'asc')
            ->paginate($perPage);

        return $this->uspesanOdgovor($knjige, 'Knjige paginacija');
    }
}
