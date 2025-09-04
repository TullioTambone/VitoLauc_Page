<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Lista tutte le categorie, opzionalmente solo quelle in homepage
    public function index(Request $request)
    {
        if ($request->query('show_on_home')) {
            return Category::where('show_on_home', true)->get();
        }

        return Category::all();
    }

    // Mostra una categoria singola
    public function show($id)
    {
        return Category::findOrFail($id);
    }

    // Crea nuova categoria
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:categories,name',
            'show_on_home' => 'boolean',
        ]);

        $category = Category::create([
            'name' => $request->name,
            'show_on_home' => $request->show_on_home ?? false,
        ]);

        return response()->json($category, 201);
    }

    // Aggiorna categoria
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'required|string|unique:categories,name,' . $id,
            'show_on_home' => 'boolean',
        ]);

        $category->update([
            'name' => $request->name,
            'show_on_home' => $request->show_on_home ?? false,
        ]);

        return response()->json($category);
    }

    // Cancella categoria
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Categoria eliminata']);
    }
}
