<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    /**
     * Display product catalog with search
     */
    public function index(Request $request)
    {
        $query = Product::with(['category', 'seller.city', 'reviews'])
            ->where('is_active', true);

        // Search by product name, category name, seller name, city, or province
        if ($request->filled('search')) {
            $searchTerm = '%' . $request->search . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('nama_produk', 'like', $searchTerm)
                    ->orWhereHas('category', function ($cat) use ($searchTerm) {
                        $cat->where('nama', 'like', $searchTerm);
                    })
                    ->orWhereHas('seller', function ($seller) use ($searchTerm) {
                        $seller->where('nama_toko', 'like', $searchTerm);
                    })
                    ->orWhereHas('seller.city', function ($city) use ($searchTerm) {
                        $city->where('name', 'like', $searchTerm);
                    })
                    ->orWhereHas('seller.province', function ($province) use ($searchTerm) {
                        $province->where('name', 'like', $searchTerm);
                    });
            });
        }

        $products = $query->latest()->paginate(12)->withQueryString();

        // Add average rating to each product
        $products->getCollection()->transform(function ($product) {
            $product->average_rating = $product->averageRating();
            $product->reviews_count = $product->reviewsCount();
            return $product;
        });

        return Inertia::render('catalog/index', [
            'products' => $products,
            'categories' => Category::all(),
            'filters' => [
                'search' => $request->search,
            ],
        ]);
    }

    /**
     * Display product detail with reviews (guest only - SRS-06)
     */
    public function show($id)
    {
        $product = Product::with(['category', 'seller.province', 'seller.city', 'reviews'])
            ->findOrFail($id);

        // Calculate rating statistics
        $reviews = $product->reviews;
        $averageRating = $reviews->avg('rating') ?? 0;
        $totalReviews = $reviews->count();
        
        $ratingDistribution = [
            5 => $reviews->where('rating', 5)->count(),
            4 => $reviews->where('rating', 4)->count(),
            3 => $reviews->where('rating', 3)->count(),
            2 => $reviews->where('rating', 2)->count(),
            1 => $reviews->where('rating', 1)->count(),
        ];

        // Add seller location info
        $productData = $product->toArray();
        $productData['seller']['kota'] = $product->seller->city ? $product->seller->city->name : '';
        $productData['seller']['provinsi'] = $product->seller->province ? $product->seller->province->name : '';

        // Get all provinces for dropdown (SRS-06 requirement)
        $provinces = \Laravolt\Indonesia\Models\Province::orderBy('name')->get(['id', 'name']);

        return Inertia::render('catalog/show', [
            'product' => $productData,
            'averageRating' => round($averageRating, 1),
            'totalReviews' => $totalReviews,
            'ratingDistribution' => $ratingDistribution,
            'relatedProducts' => Product::where('category_id', $product->category_id)
                ->where('id', '!=', $product->id)
                ->where('is_active', true)
                ->limit(4)
                ->get(),
            'provinces' => $provinces,
            'categories' => Category::all(),
        ]);
    }
}
