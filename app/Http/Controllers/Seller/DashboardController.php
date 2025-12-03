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

        // Sebaran jumlah stok setiap produk (placeholder - akan diimplementasi saat fitur produk dibuat)
        $productStock = [
            ['name' => 'Produk A', 'value' => 150],
            ['name' => 'Produk B', 'value' => 85],
            ['name' => 'Produk C', 'value' => 220],
            ['name' => 'Produk D', 'value' => 45],
            ['name' => 'Produk E', 'value' => 120],
        ];

        // Sebaran nilai rating per produk (placeholder)
        $productRatings = [
            ['name' => 'Produk A', 'rating' => 4.5],
            ['name' => 'Produk B', 'rating' => 4.8],
            ['name' => 'Produk C', 'rating' => 3.9],
            ['name' => 'Produk D', 'rating' => 4.2],
            ['name' => 'Produk E', 'rating' => 4.7],
        ];

        // Sebaran pemberi rating berdasarkan provinsi (placeholder)
        $ratingsByProvince = [
            ['name' => 'DKI Jakarta', 'value' => 45],
            ['name' => 'Jawa Barat', 'value' => 32],
            ['name' => 'Jawa Timur', 'value' => 28],
            ['name' => 'Banten', 'value' => 15],
            ['name' => 'Jawa Tengah', 'value' => 12],
        ];

        // Summary statistics
        $stats = [
            'total_products' => 5, // placeholder
            'total_stock' => 620, // placeholder
            'average_rating' => 4.4, // placeholder
            'total_reviews' => 132, // placeholder
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
