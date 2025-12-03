<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Seller extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nama_toko',
        'deskripsi_singkat',
        'nama_pic',
        'no_handphone_pic',
        'email_pic',
        'alamat_jalan',
        'rt',
        'rw',
        'kelurahan',
        'kabupaten_kota',
        'propinsi',
        'province_id',
        'city_id',
        'district_id',
        'village_id',
        'no_ktp',
        'foto_pic',
        'file_ktp',
        'status_verifikasi',
        'alasan_penolakan',
        'tanggal_verifikasi',
        'verified_by',
    ];

    protected function casts(): array
    {
        return [
            'tanggal_verifikasi' => 'datetime',
        ];
    }

    /**
     * Get the user that owns the seller profile.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user who verified this seller.
     */
    public function verifiedBy()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    /**
     * Get the products for this seller.
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Check if seller is approved
     */
    public function isApproved(): bool
    {
        return $this->status_verifikasi === 'approved';
    }

    /**
     * Check if seller is pending
     */
    public function isPending(): bool
    {
        return $this->status_verifikasi === 'pending';
    }

    /**
     * Check if seller is rejected
     */
    public function isRejected(): bool
    {
        return $this->status_verifikasi === 'rejected';
    }
}
