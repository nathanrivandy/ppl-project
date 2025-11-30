<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\SellerRegistrationRequest;
use App\Models\User;
use App\Models\Seller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class SellerRegistrationController extends Controller
{
    /**
     * Display the registration form.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register-seller');
    }

    /**
     * Handle the registration request.
     */
    public function store(SellerRegistrationRequest $request)
    {
        try {
            DB::beginTransaction();

            // Create user account
            $user = User::create([
                'name' => $request->nama_pic,
                'email' => $request->email_pic,
                'password' => Hash::make($request->password),
                'role' => 'penjual',
                'is_active' => false, // Will be activated after verification
            ]);

            // Handle file uploads
            $fotoPicPath = null;
            $fileKtpPath = null;

            if ($request->hasFile('foto_pic')) {
                $fotoPicPath = $request->file('foto_pic')->store('sellers/photos', 'public');
            }

            if ($request->hasFile('file_ktp')) {
                $fileKtpPath = $request->file('file_ktp')->store('sellers/ktp', 'public');
            }

            // Get location names from IDs
            $province = \Laravolt\Indonesia\Models\Province::find($request->province_id);
            $city = \Laravolt\Indonesia\Models\City::find($request->city_id);
            $district = \Laravolt\Indonesia\Models\District::find($request->district_id);
            $village = \Laravolt\Indonesia\Models\Village::find($request->village_id);

            // Create seller profile
            $seller = Seller::create([
                'user_id' => $user->id,
                'nama_toko' => $request->nama_toko,
                'deskripsi_singkat' => $request->deskripsi_singkat,
                'nama_pic' => $request->nama_pic,
                'no_handphone_pic' => $request->no_handphone_pic,
                'email_pic' => $request->email_pic,
                'alamat_jalan' => $request->alamat_jalan,
                'rt' => $request->rt,
                'rw' => $request->rw,
                'kelurahan' => $village->name,
                'kabupaten_kota' => $city->name,
                'propinsi' => $province->name,
                'province_id' => $request->province_id,
                'city_id' => $request->city_id,
                'district_id' => $request->district_id,
                'village_id' => $request->village_id,
                'no_ktp' => $request->no_ktp,
                'foto_pic' => $fotoPicPath,
                'file_ktp' => $fileKtpPath,
                'status_verifikasi' => 'pending',
            ]);

            DB::commit();

            // TODO: Send notification email to platform admin
            // TODO: Send confirmation email to seller

            return redirect()->route('login')->with('status', 
                'Registrasi berhasil! Akun Anda akan diverifikasi oleh admin. '
                . 'Anda akan menerima email notifikasi setelah proses verifikasi selesai.'
            );

        } catch (\Exception $e) {
            DB::rollBack();
            
            // Clean up uploaded files if any
            if (isset($fotoPicPath)) {
                Storage::disk('public')->delete($fotoPicPath);
            }
            if (isset($fileKtpPath)) {
                Storage::disk('public')->delete($fileKtpPath);
            }

            return back()->withErrors([
                'error' => 'Terjadi kesalahan saat registrasi. Silakan coba lagi.'
            ])->withInput();
        }
    }
}
