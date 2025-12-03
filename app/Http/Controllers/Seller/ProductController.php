<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $seller = Auth::user()->seller;

        $products = Product::where('seller_id', $seller->id)
            ->with('category')
            ->latest()
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'nama_produk' => $product->nama_produk,
                    'category' => $product->category->nama,
                    'harga' => $product->harga,
                    'stok' => $product->stok,
                    'is_active' => $product->is_active,
                    'foto_produk' => $product->foto_produk ? Storage::url($product->foto_produk) : null,
                ];
            });

        return Inertia::render('seller/products/index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        $categories = Category::where('is_active', true)
            ->get(['id', 'nama']);

        return Inertia::render('seller/products/create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $seller = Auth::user()->seller;

        $validated = $request->validate([
            'nama_produk' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'deskripsi' => 'required|string',
            'harga' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'foto_produk' => 'nullable|image|max:2048',
        ]);

        $validated['seller_id'] = $seller->id;

        if ($request->hasFile('foto_produk')) {
            $validated['foto_produk'] = $request->file('foto_produk')->store('products', 'public');
        }

        Product::create($validated);

        return redirect()->route('seller.products.index')
            ->with('success', 'Produk berhasil ditambahkan');
    }

    public function edit(Product $product)
    {
        // Ensure product belongs to current seller
        if ($product->seller_id !== Auth::user()->seller->id) {
            abort(403, 'Unauthorized action.');
        }

        $categories = Category::where('is_active', true)
            ->get(['id', 'nama']);

        return Inertia::render('seller/products/edit', [
            'product' => [
                'id' => $product->id,
                'nama_produk' => $product->nama_produk,
                'category_id' => $product->category_id,
                'deskripsi' => $product->deskripsi,
                'harga' => $product->harga,
                'stok' => $product->stok,
                'foto_produk' => $product->foto_produk ? Storage::url($product->foto_produk) : null,
                'is_active' => $product->is_active,
            ],
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        // Ensure product belongs to current seller
        if ($product->seller_id !== Auth::user()->seller->id) {
            abort(403, 'Unauthorized action.');
        }

        $validated = $request->validate([
            'nama_produk' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'deskripsi' => 'required|string',
            'harga' => 'required|numeric|min:0',
            'stok' => 'required|integer|min:0',
            'foto_produk' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('foto_produk')) {
            // Delete old photo if exists
            if ($product->foto_produk) {
                Storage::disk('public')->delete($product->foto_produk);
            }
            $validated['foto_produk'] = $request->file('foto_produk')->store('products', 'public');
        }

        $product->update($validated);

        return redirect()->route('seller.products.index')
            ->with('success', 'Produk berhasil diupdate');
    }

    public function destroy(Product $product)
    {
        // Ensure product belongs to current seller
        if ($product->seller_id !== Auth::user()->seller->id) {
            abort(403, 'Unauthorized action.');
        }

        // Delete photo if exists
        if ($product->foto_produk) {
            Storage::disk('public')->delete($product->foto_produk);
        }

        $product->delete();

        return redirect()->route('seller.products.index')
            ->with('success', 'Produk berhasil dihapus');
    }
}
