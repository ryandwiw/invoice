<?php

use App\Http\Controllers\InvoiceController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CheckRole;

Route::middleware(['auth', CheckRole::class.':finance'])->group(function () {
    Route::resource('invoices', InvoiceController::class);
});
