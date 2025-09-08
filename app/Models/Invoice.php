<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'company_id',
        'user_id',
        'customer_id',
        'invoice_no',
        'ref_no',
        'invoice_date',
        'due_date',
        'currency',
        'subtotal',
        'discount_total',
        'extra_discount',
        'shipping_cost',
        'tax_total',
        'grand_total',
        'custom_labels',
        'logo_path',
        'signature_path',
        'status',
    ];

    protected $casts = [
        'custom_labels' => 'array',
        'invoice_date' => 'date',
        'due_date' => 'date',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(InvoiceItem::class);
    }
}
