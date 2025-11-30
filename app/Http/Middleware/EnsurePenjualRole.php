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

        if (!$request->user()->is_active) {
            abort(403, 'Akun Anda belum diaktifkan. Silakan tunggu proses verifikasi.');
        }

        return $next($request);
    }
}
