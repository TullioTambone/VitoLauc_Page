<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PhotoController;

// Pubblico
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::get('/photos', [PhotoController::class, 'index']);
Route::get('/photos/category/{id}', [PhotoController::class, 'byCategory']);


// Admin (protette)
Route::middleware('auth:sanctum')->group(function () {
    // Categories
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    // Photos
    Route::post('/photos', [PhotoController::class, 'store']);
    Route::put('/photos/{id}', [PhotoController::class, 'update']);
    Route::delete('/photos/{id}', [PhotoController::class, 'destroy']);
});
