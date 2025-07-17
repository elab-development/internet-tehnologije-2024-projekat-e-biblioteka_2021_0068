<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResurs;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LoginController extends OdgovorController
{
    public function login(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->neuspesanOdgovor(
                'Molimo vas da unesete ispravne podatke',
                $validator->errors()
            );
        }

        $credentials = $request->only('email', 'password');

        if (!auth()->attempt($credentials)) {
            return $this->neuspesanOdgovor('Pogrešan email ili lozinka');
        }

        $user = auth()->user();

        return $this->uspesanOdgovor([
            'user' => new UserResurs($user),
            'token' => $user->createToken('authToken')->plainTextToken
        ], 'Uspešno ste se prijavili');

    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->uspesanOdgovor([], 'Uspešno ste se odjavili');
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'name' => 'required',
            'brojTelefona' => 'required',
            'gradId' => 'required',
            'adresa' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->neuspesanOdgovor('Molimo vas da unesete ispravne podatke', $validator->errors());
        }

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'name' => $request->name,
            'brojTelefona' => $request->brojTelefona,
            'gradId' => $request->gradId,
            'adresa' => $request->adresa,
            'uloga' => 'korisnik'
        ]);

        return $this->uspesanOdgovor(new UserResurs($user), 'Uspešno ste se registrovali');
    }
}
