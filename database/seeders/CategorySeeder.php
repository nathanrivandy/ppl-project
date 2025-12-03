<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['nama' => 'Elektronik', 'is_active' => true],
            ['nama' => 'Fashion', 'is_active' => true],
            ['nama' => 'Makanan & Minuman', 'is_active' => true],
            ['nama' => 'Kesehatan & Kecantikan', 'is_active' => true],
            ['nama' => 'Rumah Tangga', 'is_active' => true],
            ['nama' => 'Olahraga', 'is_active' => true],
            ['nama' => 'Buku & Alat Tulis', 'is_active' => true],
            ['nama' => 'Mainan & Hobi', 'is_active' => true],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'nama' => $category['nama'],
                'is_active' => $category['is_active'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
