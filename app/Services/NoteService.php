<?php

namespace App\Services;

use App\Models\Note;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Auth\Access\AuthorizationException;

class NoteService
{
    /**
     * Récupère toutes les notes d'un utilisateur avec leurs tags associés.
     */
    public function getAllForUser(User $user): Collection
    {
        return $user->notes()->with('tag')->latest()->get();
    }

    /**
     * Crée une nouvelle note pour un utilisateur.
     */
    public function create(User $user, array $data): Note
    {
        return $user->notes()->create([
            'text' => $data['text'],
            'tag_id' => $data['tag_id'],
        ]);
    }

    /**
     * Supprime une note en s'assurant que l'utilisateur en est bien le propriétaire.
     * 
     * @throws AuthorizationException
     */
    public function delete(User $user, Note $note): void
    {
        if ($note->user_id !== $user->id) {
            throw new AuthorizationException('This action is unauthorized.');
        }

        $note->delete();
    }
}
