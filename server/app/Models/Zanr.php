<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Zanr extends Model
{
    protected $table = 'zanrovi';

    protected $fillable = ['nazivZanra'];

    public function knjige()
    {
        return $this->hasMany(Knjiga::class, 'zanrId');
    }
}
