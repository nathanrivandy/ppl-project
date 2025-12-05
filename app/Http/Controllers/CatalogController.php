<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CatalogController extends Controller
{
    /**
     * Display product catalog with search and filter
     */
    public function index(Request $request)
    {
        $query = Product::with(['category', 'seller', 'reviews'])
            ->where('is_active', true);

        // Search by product name
        if ($request->filled('search')) {
            $query->where('nama_produk', 'like', '%' . $request->search . '%');
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        // Filter by price range
        if ($request->filled('min_price')) {
            $query->where('harga', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('harga', '<=', $request->max_price);
        }

        // Sort products
        $sortBy = $request->get('sort', 'latest');
        switch ($sortBy) {
            case 'price_low':
                $query->orderBy('harga', 'asc');
                break;
            case 'price_high':
                $query->orderBy('harga', 'desc');
                break;
            case 'name':
                $query->orderBy('nama_produk', 'asc');
                break;
            default: // latest
                $query->latest();
                break;
        }

        $products = $query->paginate(12)->withQueryString();

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
                'category' => $request->category,
                'min_price' => $request->min_price,
                'max_price' => $request->max_price,
                'sort' => $sortBy,
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
        ]);
    }
}
