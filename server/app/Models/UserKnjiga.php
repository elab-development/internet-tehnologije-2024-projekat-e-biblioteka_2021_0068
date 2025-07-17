<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserKnjiga extends Model
{
    protected $table = 'user_knjige';

    protected $fillable = ['userId', 'knjigaId', 'vreme'];

    public function korisnik()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function knjiga()
    {
        return $this->belongsTo(Knjiga::class, 'knjigaId');
    }
}
