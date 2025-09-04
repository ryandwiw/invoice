<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'), // ganti di production
                'role' => 'admin',
            ]
        );

        // Finance
        User::updateOrCreate(
            ['email' => 'finance@example.com'],
            [
                'name' => 'Finance User',
                'password' => Hash::make('password'), // ganti di production
                'role' => 'finance',
            ]
        );
    }
}
