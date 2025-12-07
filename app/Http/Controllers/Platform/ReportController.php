<?php

namespace App\Http\Controllers\Platform;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use App\Models\User;
use App\Models\Product;
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
        $productsDB = Product::query()
            ->with([
                'category',
                'seller',
                'reviews.guestProvince', // penting: biar provinsi bisa diakses tanpa N+1
            ])
            ->withAvg('reviews as avg_rating', 'rating')
            ->orderByDesc('avg_rating')
            ->get()
            ->map(function ($p) {
                // Nama produk & harga pakai field yang ada di DB kamu
                $productName = $p->nama_produk ?? $p->name ?? '-';
                $price       = $p->harga ?? $p->price ?? 0;

                // Nama kategori
                $categoryName = null;
                if ($p->category) {
                    $categoryName =
                        $p->category->nama_kategori
                        ?? $p->category->name
                        ?? $p->category->nama
                        ?? null;
                }

                // ================================
                //  PROVINSI DOMINAN PEMBERI RATING
                // ================================
                $dominantProvinceName = '-';

                if ($p->reviews->isNotEmpty()) {
                    // Group review by guest_province_id dan hitung jumlahnya
                    $grouped = $p->reviews
                        ->filter(fn ($r) => !is_null($r->guest_province_id))
                        ->groupBy('guest_province_id')
                        ->map->count(); // [province_id => total_review]

                    if ($grouped->isNotEmpty()) {
                        // Ambil province_id dengan jumlah review terbanyak
                        $dominantProvinceId = $grouped->sortDesc()->keys()->first();

                        // Cari salah satu review dengan province_id tersebut
                        $exampleReview = $p->reviews
                            ->firstWhere('guest_province_id', $dominantProvinceId);

                        // Ambil nama provinsi dari relasi Laravolt
                        $dominantProvinceName = optional(
                            optional($exampleReview)->guestProvince
                        )->name ?? '-';
                    }
                }

                return [
                    'name'       => $productName,
                    'category'   => $categoryName ?? '-',
                    'price'      => $price,
                    'rating'     => round($p->avg_rating ?? 0, 2),
                    'store_name' => $p->seller->nama_toko ?? '-',
                    'province'   => $dominantProvinceName,
                ];
            });

        $generatedAt = now()->format('d-m-Y H:i');
        $processedBy = auth()->user()->name ?? 'Admin Platform';

        $pdf = Pdf::loadView('reports.product-rating', [
            'products'    => $productsDB,
            'generatedAt' => $generatedAt,
            'processedBy' => $processedBy,
        ]);

        return $pdf->download('laporan-produk-rating-' . now()->format('Ymd-His') . '.pdf');
    }

}
