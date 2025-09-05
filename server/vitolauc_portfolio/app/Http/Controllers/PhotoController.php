<?php

namespace App\Http\Controllers;

use App\Models\Photo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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

    // upload singola foto
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'required|image|max:2048',
        ]);

        $path = $request->file('image')->store('photos', 'public');

        $photo = Photo::create([
            'title' => $request->title,
            'filename' => $path,
            'category_id' => $request->category_id,
        ]);

        return response()->json($photo, 201);
    }

    // upload multiplo
    public function multiUpload(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'images.*' => 'required|image|max:2048',
        ]);

        $photos = [];

        foreach ($request->file('images') as $image) {
            $path = $image->store('photos', 'public');

            $photos[] = Photo::create([
                'title' => $request->title,
                'filename' => $path,
                'category_id' => $request->category_id,
            ]);
        }

        return response()->json($photos, 201);
    }

    // update foto
    public function update(Request $request, $id)
    {
        $photo = Photo::findOrFail($id);

        $data = $request->validate([
            'title' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:2048',
        ]);

        // se c’è una nuova immagine → sostituisci
        if ($request->hasFile('image')) {
            // elimina la vecchia se esiste
            if ($photo->filename) {
                Storage::disk('public')->delete($photo->filename);
            }

            $data['filename'] = $request->file('image')->store('photos', 'public');
        }

        $photo->update($data);

        return response()->json($photo);
    }

    // elimina foto
    public function destroy($id)
    {
        $photo = Photo::findOrFail($id);

        if ($photo->filename) {
            Storage::disk('public')->delete($photo->filename);
        }

        $photo->delete();

        return response()->json(['message' => 'Foto eliminata']);
    }
}
