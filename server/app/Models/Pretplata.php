<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pretplata extends Model
{
    protected $table = 'pretplate';

    protected $fillable = ['userId', 'datumOd', 'datumDo'];

    public function korisnik()
    {
        return $this->belongsTo(User::class, 'userId');
    }
}
