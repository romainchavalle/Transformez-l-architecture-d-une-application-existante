<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNoteRequest extends FormRequest
{
    /**
     * Détermine si l'utilisateur est autorisé à faire cette requête.
     */
    public function authorize(): bool
    {
        // L'autorisation d'accès globale (utilisateur connecté) est gérée par 
        // le middleware auth:sanctum sur la route. On renvoie donc true ici.
        return true;
    }

    /**
     * Les règles de validation qui s'appliquent à la requête.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'text'   => 'required|string',
            'tag_id' => 'required|exists:tags,id',
        ];
    }
}
