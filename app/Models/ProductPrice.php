<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPrice extends Model
{
    protected $fillable = [
        'product_id',
        'label',
        'unit',
        'price',
        'min_qty',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
