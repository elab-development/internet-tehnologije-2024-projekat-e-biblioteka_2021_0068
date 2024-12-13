<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grad extends Model
{
    protected $table = 'gradovi';

    protected $fillable = ['nazivGrada'];

    public function korisnici()
    {
        return $this->hasMany(User::class, 'gradId');
    }
}
