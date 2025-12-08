<x-mail::message>
# Selamat! Akun Penjual Anda Telah Disetujui

Halo **{{ $user->name }}**,

Kami dengan senang hati menginformasikan bahwa permohonan Anda untuk menjadi penjual di **{{ config('app.name') }}** telah **disetujui**.

## Detail Akun Toko Anda

- **Nama Toko:** {{ $seller->nama_toko }}
- **Email:** {{ $user->email }}

Akun Anda sekarang sudah aktif dan Anda dapat mulai mengelola toko serta mengunggah produk.

<x-mail::button :url="$loginUrl">
Login ke Dashboard
</x-mail::button>

Terima kasih telah bergabung dengan {{ config('app.name') }}!

Salam hangat,<br>
{{ config('app.name') }} Team
</x-mail::message>