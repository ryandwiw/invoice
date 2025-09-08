<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'sku',
        'name',
        'description',
        'pieces_per_carton',
    ];

    public function prices()
    {
        return $this->hasMany(ProductPrice::class);
    }

    public function stock()
    {
        return $this->hasOne(Stock::class);
    }

    public function invoiceItems()
    {
        return $this->hasMany(InvoiceItem::class);
    }
}
