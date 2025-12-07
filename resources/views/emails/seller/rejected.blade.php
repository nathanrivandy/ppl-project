<x-mail::message>
# Permohonan Menjadi Penjual Ditolak

Halo **{{ $user->name }}**,

Terima kasih atas minat Anda untuk menjadi penjual di **{{ config('app.name') }}**.

Setelah melakukan verifikasi, kami mohon maaf untuk menginformasikan bahwa permohonan Anda untuk menjadi penjual saat ini **belum dapat kami setujui**.

## Alasan Penolakan

{{ $seller->alasan_penolakan ?? 'Dokumen atau informasi yang Anda berikan belum memenuhi persyaratan kami.' }}

## Apa yang Dapat Anda Lakukan?

Anda dapat melakukan pendaftaran ulang dengan melengkapi persyaratan yang diperlukan:

<x-mail::button :url="$registerUrl" color="error">
Daftar Ulang
</x-mail::button>

### Tips untuk Pendaftaran Ulang:

- Pastikan semua dokumen yang diunggah jelas dan dapat dibaca
- Lengkapi seluruh informasi yang diminta
- Gunakan data yang valid dan sesuai dengan dokumen resmi
- Pastikan nomor telepon dan alamat email aktif

## Butuh Bantuan?

Jika Anda memiliki pertanyaan atau memerlukan klarifikasi lebih lanjut mengenai penolakan ini, silakan hubungi tim support kami:

- **Email:** {{ $supportEmail }}
- **Subjek:** Verifikasi Penjual - {{ $seller->nama_toko }}

Kami siap membantu Anda untuk melengkapi persyaratan yang diperlukan.

Terima kasih atas pengertian Anda.

Salam,<br>
{{ config('app.name') }} Team
</x-mail::message>
