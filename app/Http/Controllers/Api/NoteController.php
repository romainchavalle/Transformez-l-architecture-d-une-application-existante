<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\NoteService;
use App\Http\Requests\StoreNoteRequest;
use App\Models\Note;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function __construct(private NoteService $noteService) {}

    /**
     * Récupère la liste des notes de l'utilisateur connecté.
     */
    public function index(Request $request): JsonResponse
    {
        $notes = $this->noteService->getAllForUser($request->user());
        
        return response()->json([
            'data' => $notes
        ]);
    }

    /**
     * Crée une nouvelle note après validation via FormRequest.
     */
    public function store(StoreNoteRequest $request): JsonResponse
    {
        $note = $this->noteService->create($request->user(), $request->validated());
        
        return response()->json([
            'data' => $note,
            'message' => 'Note created successfully'
        ], 201);
    }

    /**
     * Supprime une note spécifique (après vérification des droits dans le Service).
     */
    public function destroy(Request $request, Note $note): JsonResponse
    {
        $this->noteService->delete($request->user(), $note);
        
        return response()->json(null, 204);
    }
}
