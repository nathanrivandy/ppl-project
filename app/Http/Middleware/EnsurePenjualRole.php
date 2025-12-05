<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsurePenjualRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !$request->user()->isPenjual()) {
            abort(403, 'Akses ditolak. Hanya untuk penjual.');
        }

        $user = $request->user();
        $seller = $user->seller;

        // Check if seller profile exists
        if (!$seller) {
            return redirect()->route('home')->with('error', 'Anda belum terdaftar sebagai penjual');
        }

        // If seller is rejected, redirect to rejection page (except if already on rejection page)
        if ($seller->status_verifikasi === 'rejected' && !$request->routeIs('seller.rejection')) {
            return redirect()->route('seller.rejection');
        }

        // If seller is pending or not active, redirect to pending verification page
        if (!$user->is_active && !$request->routeIs('seller.rejection') && !$request->routeIs('seller.pending-verification')) {
            return redirect()->route('seller.pending-verification');
        }

        return $next($request);
    }
}
