<?php

namespace App\Http\Controllers\Platform;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Jumlah produk berdasarkan kategori (placeholder - akan diimplementasi saat fitur produk dibuat)
        $productsByCategory = [
            ['name' => 'Elektronik', 'value' => 45],
            ['name' => 'Fashion', 'value' => 78],
            ['name' => 'Makanan', 'value' => 32],
            ['name' => 'Otomotif', 'value' => 23],
            ['name' => 'Kesehatan', 'value' => 15],
        ];

        // Sebaran toko berdasarkan provinsi
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

        // Jumlah user penjual aktif dan tidak aktif
        $sellerStatus = [
            [
                'name' => 'Aktif',
                'value' => User::where('role', 'penjual')->where('is_active', true)->count()
            ],
            [
                'name' => 'Tidak Aktif',
                'value' => User::where('role', 'penjual')->where('is_active', false)->count()
            ],
        ];

        // Jumlah pengunjung yang memberikan komentar dan rating (placeholder)
        $commentRatingStats = [
            ['name' => 'Dengan Komentar', 'value' => 145],
            ['name' => 'Rating Saja', 'value' => 203],
        ];

        // Summary statistics
        $stats = [
            'total_sellers' => Seller::count(),
            'active_sellers' => User::where('role', 'penjual')->where('is_active', true)->count(),
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
