<?php

namespace App\Http\Controllers\Platform;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use App\Models\User;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Jumlah produk berdasarkan kategori (real data)
        $productsByCategory = Product::join('categories', 'products.category_id', '=', 'categories.id')
            ->select('categories.nama as name', DB::raw('count(*) as value'))
            ->groupBy('categories.id', 'categories.nama')
            ->orderBy('value', 'desc')
            ->get();

        // Sebaran toko berdasarkan provinsi (hanya seller approved)
        $sellersByProvince = Seller::where('status_verifikasi', 'approved')
            ->select('propinsi', DB::raw('count(*) as total'))
            ->groupBy('propinsi')
            ->orderBy('total', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->propinsi ?? 'Tidak Diketahui',
                    'value' => $item->total
                ];
            });

        // Jumlah user penjual aktif dan tidak aktif (berdasarkan produk yang diupload)
        $activeSellerCount = Seller::where('status_verifikasi', 'approved')
            ->whereHas('products')
            ->count();
        $inactiveSellerCount = Seller::where('status_verifikasi', 'approved')
            ->whereDoesntHave('products')
            ->count();
        
        $sellerStatus = [
            [
                'name' => 'Aktif (Ada Produk)',
                'value' => $activeSellerCount
            ],
            [
                'name' => 'Tidak Aktif (Belum Upload Produk)',
                'value' => $inactiveSellerCount
            ],
        ];

        // Jumlah pengunjung yang memberikan komentar dan rating (real data)
        $withCommentCount = Review::whereNotNull('comment')->where('comment', '!=', '')->count();
        $ratingOnlyCount = Review::where(function($query) {
            $query->whereNull('comment')->orWhere('comment', '');
        })->count();
        
        $commentRatingStats = [
            ['name' => 'Dengan Komentar', 'value' => $withCommentCount],
            ['name' => 'Rating Saja', 'value' => $ratingOnlyCount],
        ];

        // Summary statistics (tidak menghitung seller yang ditolak)
        $stats = [
            'total_sellers' => Seller::whereIn('status_verifikasi', ['approved', 'pending'])->count(),
            'active_sellers' => $activeSellerCount,
            'pending_verification' => Seller::where('status_verifikasi', 'pending')->count(),
            'total_visitors' => User::where('role', 'pengunjung')->count(),
        ];

        return Inertia::render('platform/dashboard', [
            'productsByCategory' => $productsByCategory,
            'sellersByProvince' => $sellersByProvince,
            'sellerStatus' => $sellerStatus,
            'commentRatingStats' => $commentRatingStats,
            'stats' => $stats,
        ]);
    }
}
