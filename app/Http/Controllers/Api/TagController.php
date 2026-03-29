<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\TagService;
use App\Http\Requests\StoreTagRequest;
use Illuminate\Http\JsonResponse;

class TagController extends Controller
{
    public function __construct(private TagService $tagService) {}

    /**
     * Récupère la liste de tous les tags.
     */
    public function index(): JsonResponse
    {
        $tags = $this->tagService->getAll();
        
        return response()->json([
            'data' => $tags
        ]);
    }

    /**
     * Crée un nouveau tag après validation via FormRequest.
     */
    public function store(StoreTagRequest $request): JsonResponse
    {
        $tag = $this->tagService->create($request->validated());
        
        return response()->json([
            'data' => $tag, 
            'message' => 'Tag created successfully'
        ], 201);
    }
}
