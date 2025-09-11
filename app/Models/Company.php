<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'logo_path',
    ];

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
}
