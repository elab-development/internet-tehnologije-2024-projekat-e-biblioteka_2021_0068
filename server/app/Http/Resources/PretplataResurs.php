<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PretplataResurs extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'korisnik' => new UserResurs($this->korisnik),
            'datumOd' => $this->datumOd,
            'datumDo' => $this->datumDo
        ];
    }
}
