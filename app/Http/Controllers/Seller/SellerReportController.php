<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use PDF;

class SellerReportController extends Controller
{
    // SRS-MartPlace-12: Produk diurut stok menurun
    public function stockDesc(Request $request)
    {
        $user   = $request->user();
        $seller = $user->seller;

        $products = Product::where('seller_id', $seller->id)
            ->with('category')
            ->withAvg('reviews as average_rating', 'rating')
            ->orderByDesc('stok') // urut stok menurun
            ->get();

        $pdf = \PDF::loadView('reports.seller.stock-desc', [
            'seller'       => $seller,
            'products'     => $products,
            'generatedAt'  => now()->format('d-m-Y'),
            'processedBy'  => $user->name,
        ]);

        return $pdf->download('laporan-stok-produk.pdf');
    }

    // SRS-MartPlace-13: Produk diurut rating menurun
    public function ratingDesc(Request $request)
    {
        $user   = $request->user();
        $seller = $user->seller;

        $products = Product::where('seller_id', $seller->id)
            ->with('category')
            ->withAvg('reviews as average_rating', 'rating')
            ->withCount('reviews')
            ->orderByDesc('average_rating') // urut berdasarkan rating tertinggi
            ->orderByDesc('reviews_count')
            ->get();

        $pdf = \PDF::loadView('reports.seller.rating-desc', [
            'seller'      => $seller,
            'products'    => $products,
            'generatedAt' => now()->format('d-m-Y'),
            'processedBy' => $user->name,
        ]);

        return $pdf->download('laporan-rating-produk.pdf');
    }

    // SRS-MartPlace-14: Produk stok < 2
    public function lowStock(Request $request)
    {
        $user   = $request->user();
        $seller = $user->seller;

        $products = Product::where('seller_id', $seller->id)
            ->where('stok', '<', 2)                 // stok hampir habis
            ->with('category')
            ->withAvg('reviews as average_rating', 'rating')
            ->get()
            ->sortBy(function ($product) {          // urut Kategori lalu Produk
                $cat = optional($product->category)->nama ?? '';
                return $cat . ' ' . $product->nama_produk;
            });

        $pdf = \PDF::loadView('reports.seller.low-stock', [
            'seller'      => $seller,
            'products'    => $products,
            'generatedAt' => now()->format('d-m-Y'),
            'processedBy' => $user->name,
        ]);

        return $pdf->download('laporan-produk-segera-dipesan.pdf');
    }

}