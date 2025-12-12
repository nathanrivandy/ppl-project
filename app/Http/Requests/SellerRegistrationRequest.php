<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SellerRegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Data Toko
            'nama_toko' => ['required', 'string', 'max:255'],
            'deskripsi_singkat' => ['required', 'string', 'max:500'],
            
            // Data PIC
            'nama_pic' => ['required', 'string', 'max:255'],
            'no_handphone_pic' => ['required', 'string', 'max:20', 'regex:/^[0-9+\-\s]+$/'],
            'email_pic' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            
            // Alamat
            'alamat_jalan' => ['required', 'string'],
            'rt' => ['required', 'string', 'max:10'],
            'rw' => ['required', 'string', 'max:10'],
            'province_id' => ['required', 'string', 'exists:indonesia_provinces,id'],
            'city_id' => ['required', 'string', 'exists:indonesia_cities,id'],
            'district_id' => ['required', 'string', 'exists:indonesia_districts,id'],
            'village_id' => ['required', 'string', 'exists:indonesia_villages,id'],
            
            // Dokumen
            'no_ktp' => ['required', 'string', 'size:16', 'unique:sellers,no_ktp'],
            'foto_pic' => ['required', 'image', 'mimes:jpeg,jpg,png', 'max:2048'],
            'file_ktp' => ['required', 'file', 'mimes:jpeg,jpg,png,pdf', 'max:2048'],
            
            // Auth
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ];
    }

    /**
     * Get custom validation messages.
     */
    public function messages(): array
    {
        return [
            'no_handphone_pic.regex' => 'Nomor handphone hanya boleh berisi angka, tanda +, tanda -, dan spasi.',
            'no_handphone_pic.required' => 'Nomor handphone wajib diisi.',
            'no_handphone_pic.max' => 'Nomor handphone maksimal 20 karakter.',
        ];
    }
}
