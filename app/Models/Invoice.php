<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'company_address',
        'company_phone',
        'company_email',
        'company_profile_tujuan',
        'company_address_tujuan',
        'company_phone_tujuan',
        'company_email_tujuan',
        'referensi',
        'invoice_date',
        'due_date',
        'items',
        'subtotal',
        'total',
        'status',
        'pdf_url',
        'user_id'
    ];

    protected $casts = [
        'items' => 'array',
        'invoice_date' => 'date:d-m-Y',
        'due_date' => 'date:d-m-Y',
        'subtotal' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
