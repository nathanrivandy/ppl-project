<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravolt\Indonesia\Models\Province;

/**
 * @property int $id
 * @property int $product_id
 * @property int|null $user_id
 * @property int $rating
 * @property string|null $comment
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $guest_name
 * @property string|null $guest_phone
 * @property string|null $guest_email
 * @property int|null $guest_province_id
 * @property-read string $reviewer_name
 * @property-read Province|null $guestProvince
 * @property-read \App\Models\Product $product
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereGuestEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereGuestName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereGuestPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereGuestProvinceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereUserId($value)
 * @mixin \Eloquent
 */
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
