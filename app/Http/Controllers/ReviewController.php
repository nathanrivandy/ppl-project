<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class ReviewController extends Controller
{
    /**
     * Store a new review (guest only - as per SRS-06)
     */
    public function store(Request $request, $productId)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'guest_name' => 'required|string|max:255',
            'guest_phone' => 'required|string|max:20',
            'guest_email' => 'required|email|max:255',
            'guest_province_id' => 'required|exists:'.config('laravolt.indonesia.table_prefix').'provinces,id',
        ]);

        $product = Product::findOrFail($productId);

        // Check if email already reviewed this product (prevent spam)
        $existingReview = Review::where('product_id', $productId)
            ->where('guest_email', $validated['guest_email'])
            ->first();

        if ($existingReview) {
            return back()->withErrors([
                'guest_email' => 'Email Anda sudah memberikan review untuk produk ini. Setiap email hanya bisa memberikan 1 review per produk.'
            ])->withInput();
        }

        $reviewData = [
            'product_id' => $productId,
            'rating' => $validated['rating'],
            'comment' => $validated['comment'],
            'guest_name' => $validated['guest_name'],
            'guest_phone' => $validated['guest_phone'],
            'guest_email' => $validated['guest_email'],
            'guest_province_id' => $validated['guest_province_id'],
        ];

        Review::create($reviewData);

        // Send thank you email
        $this->sendThankYouEmail($validated['guest_name'], $validated['guest_email'], $product->nama_produk);

        return back()->with('success', 'Terima kasih! Review Anda berhasil ditambahkan. Email konfirmasi telah dikirim.');
    }

    // Note: As per SRS-06, guests cannot edit or delete their reviews
    // Update and delete methods are not needed

    /**
     * Send thank you email to reviewer
     */
    private function sendThankYouEmail($name, $email, $productName)
    {
        try {
            Mail::raw(
                "Halo {$name},\n\nTerima kasih telah memberikan review untuk produk \"{$productName}\".\n\nReview Anda sangat membantu calon pembeli lain dalam membuat keputusan.\n\nSalam,\nMarketplace Team",
                function ($message) use ($email, $name) {
                    $message->to($email, $name)
                        ->subject('Terima Kasih atas Review Anda');
                }
            );
        } catch (\Exception $e) {
            // Log error but don't stop the process
            \Log::error('Failed to send review thank you email: ' . $e->getMessage());
        }
    }
}
