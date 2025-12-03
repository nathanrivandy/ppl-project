<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class RejectionController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        $seller = $user->seller;

        // Check if user has a seller profile
        if (!$seller) {
            return redirect()->route('dashboard')->with('error', 'Anda belum terdaftar sebagai penjual');
        }

        // Check if seller is rejected
        if ($seller->status_verifikasi !== 'rejected') {
            return redirect()->route('dashboard');
        }

        return Inertia::render('seller/rejection', [
            'seller' => [
                'id' => $seller->id,
                'nama_toko' => $seller->nama_toko,
                'status_verifikasi' => $seller->status_verifikasi,
                'alasan_penolakan' => $seller->alasan_penolakan,
                'tanggal_verifikasi' => $seller->tanggal_verifikasi?->format('d F Y'),
            ]
        ]);
    }
}
