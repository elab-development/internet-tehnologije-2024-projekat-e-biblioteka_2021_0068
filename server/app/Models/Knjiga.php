<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Knjiga extends Model
{
    protected $table = 'knjige';

    protected $fillable = ['nazivKnjige', 'autor', 'zanrId', 'urlKnjige', 'uvidKnjige'];


    public function zanr()
    {
        return $this->belongsTo(Zanr::class, 'zanrId');
    }
}
