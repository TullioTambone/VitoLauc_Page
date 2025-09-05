<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'filename', 'category_id'];
    protected $appends = ['url'];
    
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Accessor per ottenere l'URL completo dell'immagine
    public function getUrlAttribute()
    {
        return asset('storage/' . $this->filename);
    }
}
