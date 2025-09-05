<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'show_on_home', 'photo', 'macro_category_id'];
    protected $appends = ['photo_url'];

    public function getPhotoUrlAttribute()
    {
        return $this->photo ? asset('storage/' . $this->photo) : null;
    }

    public function macroCategory()
    {
        return $this->belongsTo(MacroCategory::class);
    }

    public function getMacroCategoryNameAttribute()
    {
        return $this->macroCategory ? $this->macroCategory->name : null;
    }
}
