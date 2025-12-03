<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'seller_id',
        'category_id',
        'nama_produk',
        'deskripsi',
        'harga',
        'stok',
        'foto_produk',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'harga' => 'decimal:2',
            'stok' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Get the seller that owns the product
     */
    public function seller()
    {
        return $this->belongsTo(Seller::class);
    }

    /**
     * Get the category of the product
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
