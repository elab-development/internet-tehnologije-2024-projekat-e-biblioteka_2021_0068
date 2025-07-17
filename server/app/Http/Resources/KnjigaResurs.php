<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KnjigaResurs extends JsonResource
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
            'nazivKnjige' => $this->nazivKnjige,
            'autor' => $this->autor,
            'zanr' => new ZanrResurs($this->zanr),
            'urlKnjige' => $this->urlKnjige,
            'uvidKnjige' => $this->uvidKnjige
        ];
    }
}
