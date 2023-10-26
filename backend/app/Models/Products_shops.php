<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products_shops extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'shop_id'
    ];
}
