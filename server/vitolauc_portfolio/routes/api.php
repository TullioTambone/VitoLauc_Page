<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\MacroCategoryController;
use App\Models\User;

Route::post('/login', function(Request $request) {
    $user = User::where('email', $request->email)->first(); // ✅ usa $request
    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Credenziali errate'], 401);
    }

    $token = $user->createToken('admin-token')->plainTextToken;

    return response()->json([
        'token' => $token,
        'user' => $user
    ]);
});

// Pubblico
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::get('/photos', [PhotoController::class, 'index']);
Route::get('/photos/category/{id}', [PhotoController::class, 'byCategory']);
Route::get('/macrocategories', [MacroCategoryController::class, 'index']);


// Admin (protette)
Route::middleware('auth:sanctum')->group(function () {
    // Categories
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    // Photos
    Route::post('/photos', [PhotoController::class, 'store']);
    Route::post('/photos/multi-upload', [PhotoController::class, 'multiUpload']);
    Route::put('/photos/{id}', [PhotoController::class, 'update']);
    Route::delete('/photos/{id}', [PhotoController::class, 'destroy']);
});
