<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;


    protected $fillable = [
        'title',
        'description',
        'price',
        'like',
        'dislike',
        'img',
        'category_id',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function cart()
    {
        return $this->hasMany(Cart::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorites::class);
    }

    public function categories()
    {
        return $this->belongsTo(Categories::class);
    }

    public function product_shops()
    {
        return $this->belongsToMany(Shops::class, 'products_shops', 'product_id', 'shop_id');
    }

}
