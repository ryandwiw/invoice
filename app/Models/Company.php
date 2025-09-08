<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'name',
        'phone',
        'email',
        'address',
        'logo_path',
    ];

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
}
