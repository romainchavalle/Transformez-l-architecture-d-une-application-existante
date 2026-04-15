<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use OpenApi\Attributes as OA;
use App\Services\TagService;
use App\Http\Requests\StoreTagRequest;
use Illuminate\Http\JsonResponse;

class TagController extends Controller
{
    public function __construct(private TagService $tagService) {}

    #[OA\Get(
        path: '/api/tags',
        summary: 'Récupère la liste de tous les tags.',
        security: [['sanctum' => []]],
        tags: ['Tags']
    )]
    #[OA\Response(response: 200, description: 'Liste des tags')]
    public function index(): JsonResponse
    {
        $tags = $this->tagService->getAll();
        
        return response()->json([
            'data' => $tags
        ]);
    }

    #[OA\Post(
        path: '/api/tags',
        summary: 'Crée un nouveau tag',
        security: [['sanctum' => []]],
        tags: ['Tags']
    )]
    #[OA\RequestBody(
        required: true,
        content: new OA\JsonContent(
            required: ['name'],
            properties: [
                new OA\Property(property: 'name', type: 'string', example: 'Urgent')
            ]
        )
    )]
    #[OA\Response(response: 201, description: 'Tag créé')]
    #[OA\Response(response: 422, description: 'Erreur de validation')]
    public function store(StoreTagRequest $request): JsonResponse
    {
        $tag = $this->tagService->create($request->validated());
        
        return response()->json([
            'data' => $tag, 
            'message' => 'Tag created successfully'
        ], 201);
    }
}
