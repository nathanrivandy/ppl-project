<?php

namespace App\Http\Controllers\Platform;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use App\Models\User;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * SRS-MartPlace-09: Laporan daftar akun penjual aktif dan tidak aktif
     */
    public function sellerStatusReport()
    {
        $activeSellers = User::where('role', 'penjual')
            ->where('is_active', true)
            ->with('seller')
            ->get();
            
        $inactiveSellers = User::where('role', 'penjual')
            ->where('is_active', false)
            ->with('seller')
            ->get();

        $pdf = Pdf::loadView('reports.seller-status', [
            'activeSellers' => $activeSellers,
            'inactiveSellers' => $inactiveSellers,
            'generatedAt' => now()->format('d/m/Y H:i:s'),
        ]);

        return $pdf->download('laporan-status-penjual-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * SRS-MartPlace-10: Laporan daftar penjual (toko) untuk setiap Lokasi provinsi
     */
    public function sellerByProvinceReport()
    {
        $sellersByProvince = Seller::where('status_verifikasi', 'approved')
            ->orderBy('propinsi')
            ->orderBy('nama_toko')
            ->get()
            ->groupBy('propinsi');

        $pdf = Pdf::loadView('reports.seller-by-province', [
            'sellersByProvince' => $sellersByProvince,
            'totalSellers' => Seller::where('status_verifikasi', 'approved')->count(),
            'generatedAt' => now()->format('d/m/Y H:i:s'),
        ]);

        return $pdf->download('laporan-penjual-per-provinsi-' . now()->format('Y-m-d') . '.pdf');
    }

    /**
     * SRS-MartPlace-11: Laporan daftar produk dan ratingnya yang diurutkan berdasarkan rating
     * Note: Placeholder - akan diimplementasi penuh setelah fitur produk dan rating dibuat
     */
    public function productRatingReport()
    {
        // Placeholder data - akan diganti dengan query sebenarnya setelah tabel products dibuat
        $products = collect([
            [
                'name' => 'Laptop ASUS ROG',
                'store_name' => 'Toko Elektronik Jakarta',
                'category' => 'Elektronik',
                'price' => 15000000,
                'rating' => 4.8,
                'province' => 'DKI Jakarta',
            ],
            [
                'name' => 'Sepatu Nike Air',
                'store_name' => 'Fashion Store Bandung',
                'category' => 'Fashion',
                'price' => 1500000,
                'rating' => 4.5,
                'province' => 'Jawa Barat',
            ],
            [
                'name' => 'Smartphone Samsung',
                'store_name' => 'Toko Elektronik Jakarta',
                'category' => 'Elektronik',
                'price' => 8000000,
                'rating' => 4.3,
                'province' => 'DKI Jakarta',
            ],
        ])->sortByDesc('rating');

        $pdf = Pdf::loadView('reports.product-rating', [
            'products' => $products,
            'generatedAt' => now()->format('d/m/Y H:i:s'),
        ]);

        return $pdf->download('laporan-rating-produk-' . now()->format('Y-m-d') . '.pdf');
    }
}
