<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    // Lista tutte le categorie, opzionalmente solo quelle in homepage
    public function index(Request $request)
    {
        if ($request->query('show_on_home')) {
            return Category::where('show_on_home', true)
                    ->with('macroCategory')
                    ->get();
        }

        return Category::with('macroCategory')->get();
    }

    // Mostra una categoria singola
    public function show($id)
    {
        return Category::findOrFail($id);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'macro_category_id' => 'nullable|exists:macro_categories,id',
            'show_on_home' => 'boolean',
            'photo' => 'nullable|image|max:20480', // fino a 20MB
        ]);

        if ($request->hasFile('photo')) {
            $data['photo'] = $request->file('photo')->store('categories', 'public');
        }

        $category = Category::create($data);
        $category->load('macroCategory');

        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'macro_category_id' => 'nullable|exists:macro_categories,id',
            'show_on_home' => 'boolean',
            'photo' => 'nullable|image|max:20480',
        ]);

        if ($request->hasFile('photo')) {
            if ($category->photo) {
                Storage::disk('public')->delete($category->photo);
            }
            $data['photo'] = $request->file('photo')->store('categories', 'public');
        }

        $category->update($data);
        $category->load('macroCategory');

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
