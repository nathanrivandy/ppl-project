<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlatformUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::create([
            'name' => 'Platform Admin',
            'email' => 'admin@akademarket.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password'),
            'role' => 'platform',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
    }
}
