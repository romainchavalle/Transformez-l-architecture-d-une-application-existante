<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use OpenApi\Attributes as OA;
use App\Services\NoteService;
use App\Http\Requests\StoreNoteRequest;
use App\Models\Note;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function __construct(private NoteService $noteService) {}

    #[OA\Get(
        path: '/api/notes',
        summary: 'Récupère la liste des notes de l\'utilisateur connecté.',
        security: [['sanctum' => []]],
        tags: ['Notes']
    )]
    #[OA\Response(response: 200, description: 'Liste des notes')]
    public function index(Request $request): JsonResponse
    {
        $notes = $this->noteService->getAllForUser($request->user());
        
        return response()->json([
            'data' => $notes
        ]);
    }

    #[OA\Post(
        path: '/api/notes',
        summary: 'Crée une nouvelle note',
        security: [['sanctum' => []]],
        tags: ['Notes']
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['text', 'tag_id'],
            properties: [
                new OA\Property(property: 'text', type: 'string', example: 'Ma nouvelle note secrète'),
                new OA\Property(property: 'tag_id', type: 'integer', example: 1)
            ]
        )
    )]
    #[OA\Response(response: 201, description: 'Note créée')]
    #[OA\Response(response: 422, description: 'Erreur de validation')]
    public function store(StoreNoteRequest $request): JsonResponse
    {
        $note = $this->noteService->create($request->user(), $request->validated());
        $note->load('tag');
        
        return response()->json([
            'data' => $note,
            'message' => 'Note created successfully'
        ], 201);
    }

    #[OA\Delete(
        path: '/api/notes/{id}',
        summary: 'Supprime une note spécifique',
        security: [['sanctum' => []]],
        tags: ['Notes']
    )]
    #[OA\Parameter(
        name: 'id',
        description: 'ID de la note',
        in: 'path',
        required: true,
        schema: new OA\Schema(type: 'integer')
    )]
    #[OA\Response(response: 204, description: 'Note supprimée')]
    #[OA\Response(response: 403, description: 'Accès refusé')]
    #[OA\Response(response: 404, description: 'Note introuvable')]
    public function destroy(Request $request, Note $note): JsonResponse
    {
        $this->noteService->delete($request->user(), $note);
        
        return response()->json(null, 204);
    }
}
