<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Auth\SellerRegistrationController;
use App\Http\Controllers\Platform\SellerVerificationController;
use App\Http\Controllers\Platform\DashboardController as PlatformDashboardController;
use App\Http\Controllers\Platform\ReportController;
use App\Http\Controllers\Seller\DashboardController as SellerDashboardController;
use App\Http\Controllers\Seller\RejectionController;
use App\Http\Controllers\Seller\ProductController;
use App\Http\Controllers\Api\LocationController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\ReviewController;

Route::get('/', function () {
    // If user is authenticated and is a seller who is not active, redirect to pending verification
    if (Auth::check()) {
        $user = Auth::user();
        if ($user->isPenjual()) {
            $seller = $user->seller;
            
            // Check if rejected
            if ($seller && $seller->status_verifikasi === 'rejected') {
                return redirect()->route('seller.rejection');
            }
            
            // Check if pending (not active)
            if (!$user->is_active) {
                return redirect()->route('seller.pending-verification');
            }
            
            // If active, redirect to dashboard
            return redirect()->route('seller.dashboard');
        } elseif ($user->isPlatform()) {
            return redirect()->route('platform.dashboard');
        }
    }
    
    return Inertia::render('welcome');
})->name('home');

// API Routes for Location
Route::prefix('api')->group(function () {
    Route::get('provinces', [LocationController::class, 'provinces']);
    Route::get('cities/{provinceCode}', [LocationController::class, 'cities']);
    Route::get('districts/{cityCode}', [LocationController::class, 'districts']);
    Route::get('villages/{districtCode}', [LocationController::class, 'villages']);
});

// Seller Registration (public)
Route::get('/register-seller', [SellerRegistrationController::class, 'create'])
    ->name('register.seller');
Route::post('/register-seller', [SellerRegistrationController::class, 'store']);

// Catalog Routes (public)
Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/catalog/{id}', [CatalogController::class, 'show'])->name('catalog.show');

// Review Routes (public - no auth required for creating)
Route::post('products/{productId}/reviews', [ReviewController::class, 'store'])
    ->name('reviews.store');

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        if ($user->isPlatform()) {
            return redirect()->route('platform.dashboard');
        } elseif ($user->isPenjual()) {
            // Check if seller is rejected
            $seller = $user->seller;
            if ($seller && $seller->status_verifikasi === 'rejected') {
                return redirect()->route('seller.rejection');
            }
            // Check if seller is not active (pending verification)
            if (!$user->is_active) {
                return redirect()->route('seller.pending-verification');
            }
            return redirect()->route('seller.dashboard');
        }
        
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Pending verification page for sellers
    Route::get('seller/pending-verification', function () {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        
        if (!$user->isPenjual()) {
            return redirect()->route('dashboard');
        }
        
        $seller = $user->seller;
        
        return Inertia::render('seller/pending-verification', [
            'seller' => $seller,
        ]);
    })->name('seller.pending-verification');

    // Review Update/Delete Routes (authenticated users only)
    Route::put('reviews/{id}', [ReviewController::class, 'update'])
        ->name('reviews.update');
    Route::delete('reviews/{id}', [ReviewController::class, 'destroy'])
        ->name('reviews.destroy');
});

// Platform Admin Routes
Route::middleware(['auth', 'verified', 'platform'])->prefix('platform')->name('platform.')->group(function () {
    Route::get('dashboard', [PlatformDashboardController::class, 'index'])
        ->name('dashboard');
    Route::get('sellers/verification', [SellerVerificationController::class, 'index'])
        ->name('sellers.verification');
    Route::get('sellers/{seller}', [SellerVerificationController::class, 'show'])
        ->name('sellers.show');
    Route::post('sellers/{seller}/approve', [SellerVerificationController::class, 'approve'])
        ->name('sellers.approve');
    Route::post('sellers/{seller}/reject', [SellerVerificationController::class, 'reject'])
        ->name('sellers.reject');
    
    // Reports
    Route::get('reports/seller-status', [ReportController::class, 'sellerStatusReport'])
        ->name('reports.seller-status');
    Route::get('reports/seller-by-province', [ReportController::class, 'sellerByProvinceReport'])
        ->name('reports.seller-by-province');
    Route::get('reports/product-rating', [ReportController::class, 'productRatingReport'])
        ->name('reports.product-rating');
});

// Seller Routes
Route::middleware(['auth', 'verified', 'penjual'])->prefix('seller')->name('seller.')->group(function () {
    Route::get('dashboard', [SellerDashboardController::class, 'index'])
        ->name('dashboard');
    Route::get('rejection', [RejectionController::class, 'show'])
        ->name('rejection');
    
    // Product Management
    Route::resource('products', ProductController::class);
});

require __DIR__.'/settings.php';
