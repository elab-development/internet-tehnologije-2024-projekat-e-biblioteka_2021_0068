<?php

use App\Http\Controllers\GradController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ZanrController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/logovanje', [LoginController::class, 'login']);
Route::post('/registracija', [LoginController::class, 'register']);

Route::get('/gradovi', [GradController::class, 'index']);
Route::get('/zanrovi', [ZanrController::class, 'index']);
Route::get('/paginacija', [\App\Http\Controllers\KnjigaController::class, 'paginacija']);
Route::get('/donatori', [\App\Http\Controllers\UserController::class, 'donatoriBiblioteke']);

//Route::resource('/knjige', \App\Http\Controllers\KnjigaController::class)->only(['index', 'show']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::get('/pretplate-na-dan', [\App\Http\Controllers\PretplataController::class, 'aktivnePretplateNadanasnjiDan']);
    Route::get('/pretplate-korisnika-na-dan/{userId}', [\App\Http\Controllers\PretplataController::class, 'aktivnePretplateZaKorisnika']);
    Route::get('/pretplate', [\App\Http\Controllers\PretplataController::class, 'index']);

    Route::resource('/knjige', \App\Http\Controllers\KnjigaController::class)->only(['index', 'show']);

    Route::post('/pretplata', [\App\Http\Controllers\PretplataController::class, 'pretplatiSe']);

    Route::post('/knjige', [\App\Http\Controllers\KnjigaController::class, 'store'])->middleware(\App\Http\Middleware\AdminPristup::class);
    Route::delete('/knjige/{id}', [\App\Http\Controllers\KnjigaController::class, 'delete']);
    Route::get('/sviUseri', [UserController::class, 'sviUseri']);

    Route::post('/odjava', [LoginController::class, 'logout']);


});
