<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravolt\Indonesia\Models\Province;

class Review extends Model
{
    protected $fillable = [
        'product_id',
        'guest_name',
        'guest_phone',
        'guest_email',
        'guest_province_id',
        'rating',
        'comment',
    ];

    protected $casts = [
        'rating' => 'integer',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the guest province (SRS-08 requirement)
     */
    public function guestProvince(): BelongsTo
    {
        return $this->belongsTo(\Laravolt\Indonesia\Models\Province::class, 'guest_province_id');
    }

    /**
     * Get reviewer name (always guest as per SRS-06)
     */
    public function getReviewerNameAttribute(): string
    {
        return $this->guest_name;
    }

}
