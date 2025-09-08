<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = [
        'product_id',
        'quantity_pcs',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
