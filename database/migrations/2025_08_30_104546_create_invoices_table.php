<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();

            // Data perusahaan pengirim
            $table->string('company_name');
            $table->text('company_address');
            $table->string('company_phone');
            $table->string('company_email');

            // Data client (tujuan)
            $table->string('company_profile_tujuan');
            $table->text('company_address_tujuan')->nullable();
            $table->string('company_phone_tujuan')->nullable();
            $table->string('company_email_tujuan')->nullable();

            // Detail invoice
            $table->string('referensi')->nullable();
            $table->date('invoice_date');
            $table->date('due_date')->nullable();
            $table->json('items'); // simpan array JSON
            $table->decimal('subtotal', 16, 2)->default(0);
            $table->decimal('total', 16, 2)->default(0);

            // Status tracking
            $table->enum('status', ['draft', 'pending', 'sent', 'delivered', 'paid', 'cancelled'])->default('draft');
            $table->string('pdf_url')->nullable();

            // Relasi user pembuat
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
