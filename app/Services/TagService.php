<?php

namespace App\Services;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Collection;

class TagService
{
    /**
     * Récupère tous les tags disponibles.
     */
    public function getAll(): Collection
    {
        return Tag::all();
    }

    /**
     * Crée un nouveau tag.
     */
    public function create(array $data): Tag
    {
        return Tag::create([
            'name' => $data['name'],
        ]);
    }
}
