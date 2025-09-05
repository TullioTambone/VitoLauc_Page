<?php

namespace App\Http\Controllers;

use App\Models\MacroCategory;
use Illuminate\Http\Request;

class MacroCategoryController extends Controller
{
    // Lista tutte le macrocategorie con categorie e foto annidate
    public function index()
    {
        return MacroCategory::select('id', 'name')->get();
    }

    // Mostra una singola macrocategoria con categorie e foto
    public function show($id)
    {
        return MacroCategory::with('categories.photos')->findOrFail($id);
    }

    // Creazione macrocategoria
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $macro = MacroCategory::create($data);

        return response()->json($macro, 201);
    }

    // Modifica macrocategoria
    public function update(Request $request, $id)
    {
        $macro = MacroCategory::findOrFail($id);

        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $macro->update($data);

        return response()->json($macro);
    }

    // Cancella macrocategoria
    public function destroy($id)
    {
        $macro = MacroCategory::findOrFail($id);
        $macro->delete();

        return response()->json(['message' => 'Macrocategoria eliminata']);
    }
}
