<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $seller = Auth::user()->seller;

        if (!$seller) {
            return redirect()->route('dashboard')->with('error', 'Anda belum terdaftar sebagai penjual');
        }

        // Redirect to rejection page if seller is rejected
        if ($seller->status_verifikasi === 'rejected') {
            return redirect()->route('seller.rejection');
        }

        // Get all products for this seller
        $products = $seller->products()->with('reviews')->get();

        // Sebaran jumlah stok setiap produk
        $productStock = $products->map(function ($product) {
            return [
                'name' => $product->nama_produk,
                'value' => $product->stok,
            ];
        })->toArray();

        // Sebaran nilai rating per produk
        $productRatings = $products->map(function ($product) {
            $averageRating = $product->reviews->avg('rating') ?? 0;
            return [
                'name' => $product->nama_produk,
                'rating' => round($averageRating, 1),
            ];
        })->toArray();

        // Get all reviews for seller's products
        $allReviews = \App\Models\Review::whereIn('product_id', $products->pluck('id'))
            ->with(['user.seller', 'guestProvince'])
            ->get();

        // Sebaran pemberi rating berdasarkan provinsi
        $ratingsByProvince = $allReviews
            ->groupBy(function ($review) {
                // Get province from:
                // 1. Guest province (if guest review)
                // 2. User's seller profile province (if user review and is seller)
                // 3. "Tidak Diketahui" (if no province data)
                if ($review->guest_province_id && $review->guestProvince) {
                    return $review->guestProvince->name;
                } elseif ($review->user && $review->user->seller && $review->user->seller->propinsi) {
                    return $review->user->seller->propinsi;
                } else {
                    return 'Tidak Diketahui';
                }
            })
            ->map(function ($group, $province) {
                return [
                    'name' => $province,
                    'value' => $group->count(),
                ];
            })
            ->sortByDesc('value')
            ->values()
            ->toArray();

        // Summary statistics
        $stats = [
            'total_products' => $products->count(),
            'total_stock' => $products->sum('stok'),
            'average_rating' => round($allReviews->avg('rating') ?? 0, 1),
            'total_reviews' => $allReviews->count(),
        ];

        return Inertia::render('seller/dashboard', [
            'seller' => $seller,
            'productStock' => $productStock,
            'productRatings' => $productRatings,
            'ratingsByProvince' => $ratingsByProvince,
            'stats' => $stats,
        ]);
    }
}
