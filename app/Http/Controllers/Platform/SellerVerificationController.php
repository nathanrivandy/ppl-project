<?php

namespace App\Http\Controllers\Platform;

use App\Http\Controllers\Controller;
use App\Models\Seller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SellerVerificationController extends Controller
{
    /**
     * Display list of pending sellers
     */
    public function index()
    {
        $sellers = Seller::with('user')
            ->where('status_verifikasi', 'pending')
            ->latest()
            ->paginate(10);

        return Inertia::render('platform/seller-verification/index', [
            'sellers' => $sellers
        ]);
    }

    /**
     * Display seller detail for verification
     */
    public function show(Seller $seller)
    {
        $seller->load('user');
        
        return Inertia::render('platform/seller-verification/show', [
            'seller' => $seller
        ]);
    }

    /**
     * Approve seller registration
     */
    public function approve(Request $request, Seller $seller)
    {
        $seller->update([
            'status_verifikasi' => 'approved',
            'tanggal_verifikasi' => now(),
            'verified_by' => Auth::id(),
        ]);

        // Activate user account
        $seller->user->update([
            'is_active' => true
        ]);

        // TODO: Send approval email notification
        // Mail::to($seller->email_pic)->send(new SellerApprovedMail($seller));

        return redirect()->route('platform.sellers.verification')
            ->with('success', 'Penjual berhasil disetujui dan akun telah diaktifkan.');
    }

    /**
     * Reject seller registration
     */
    public function reject(Request $request, Seller $seller)
    {
        $request->validate([
            'alasan_penolakan' => 'required|string|max:500'
        ]);

        $seller->update([
            'status_verifikasi' => 'rejected',
            'alasan_penolakan' => $request->alasan_penolakan,
            'tanggal_verifikasi' => now(),
            'verified_by' => Auth::id(),
        ]);

        // TODO: Send rejection email notification
        // Mail::to($seller->email_pic)->send(new SellerRejectedMail($seller));

        return redirect()->route('platform.sellers.verification')
            ->with('success', 'Registrasi penjual ditolak.');
    }
}
