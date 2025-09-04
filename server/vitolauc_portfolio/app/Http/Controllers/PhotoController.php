<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;

class PhotoController extends Controller
{
    // lista tutte le foto
    public function index()
    {
        return Photo::with('category')->get();
    }

    // lista per categoria
    public function byCategory($id)
    {
        return Photo::where('category_id', $id)->get();
    }

    // upload + insert nel db
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|image|max:2048',
        ]);

        // Salva file su storage/app/public/photos
        $path = $request->file('image')->store('photos', 'public');

        $photo = Photo::create([
            'title' => $request->title,
            'filename' => $path,
            'category_id' => $request->category_id,
        ]);

        return response()->json($photo, 201);
    }

    // cancella una foto
    public function destroy($id)
    {
        $photo = Photo::findOrFail($id);

        // elimina file fisico
        \Storage::disk('public')->delete($photo->filename);

        $photo->delete();

        return response()->json(['message' => 'Foto eliminata']);
    }
}
