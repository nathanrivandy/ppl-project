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

### Langkah Selanjutnya:

1. Login ke akun Anda menggunakan email dan password yang telah Anda daftarkan
2. Lengkapi profil toko Anda di dashboard
3. Mulai unggah produk pertama Anda
4. Kelola pesanan dan transaksi

Jika Anda memiliki pertanyaan atau memerlukan bantuan, jangan ragu untuk menghubungi tim support kami.

Terima kasih telah bergabung dengan {{ config('app.name') }}!

Salam hangat,<br>
{{ config('app.name') }} Team
</x-mail::message>
