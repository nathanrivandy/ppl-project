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
                'category',   // relasi kategori
                'seller',     // relasi seller/toko
                'reviews',    // relasi review, buat ambil provinsi pemberi rating
            ])
            ->withAvg('reviews as avg_rating', 'rating') // rata-rata rating
            ->orderByDesc('avg_rating')
            ->get()
            ->map(function ($p) {
                // === Nama produk & harga (pakai field yang bener di DB lu) ===
                $productName = $p->nama_produk ?? $p->name ?? '-';
                $price       = $p->harga ?? $p->price ?? 0;

                // === Nama kategori ===
                $categoryName = null;
                if ($p->category) {
                    $categoryName =
                        $p->category->nama_kategori
                        ?? $p->category->name
                        ?? $p->category->nama
                        ?? null;
                }

                // === PROVINSI PEMBERI RATING (DIAMBIL DARI REVIEW) ===
                $firstReview = $p->reviews->first(); // ambil 1 review pertama saja

                $rawProvince =
                    ($firstReview->province ?? null)
                    ?? ($firstReview->province_name ?? null)
                    ?? ($firstReview->provinsi ?? null);

                $provinceName = null;

                if (is_array($rawProvince)) {
                    $provinceName = $rawProvince['name'] ?? reset($rawProvince);
                } elseif (is_object($rawProvince)) {
                    $provinceName = $rawProvince->name ?? null;
                } elseif (is_string($rawProvince)) {
                    $trim = trim($rawProvince);
                    if (strlen($trim) && $trim[0] === '{') {
                        $decoded = json_decode($rawProvince, true);
                        $provinceName = $decoded['name'] ?? null;
                    } else {
                        $provinceName = $rawProvince;
                    }
                }

                return [
                    'name'       => $productName,
                    'category'   => $categoryName ?? '-',
                    'price'      => $price,
                    'rating'     => round($p->avg_rating ?? 0, 2),
                    'store_name' => $p->seller->nama_toko ?? '-',
                    // SEKARANG: provinsi = provinsi PEMBERI rating (dari review)
                    'province'   => $provinceName ?? '-',
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
