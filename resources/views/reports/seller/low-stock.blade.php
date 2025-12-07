<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Daftar Produk Segera Dipesan</title>
    <style>
        * { box-sizing: border-box; }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #111827;
            background-color: #f9fafb;
            margin: 0;
            padding: 24px;
        }

        .report-card {
            background: #ffffff;
            border-radius: 8px;
            padding: 18px 20px;
            box-shadow: 0 2px 6px rgba(15,23,42,0.08);
            border: 1px solid #e5e7eb;
        }

        h1 {
            font-size: 18px;
            margin: 0;
            color: #111827;
        }

        .meta {
            font-size: 11px;
            color: #4b5563;
            margin-top: 6px;
            margin-bottom: 14px;
        }

        .meta span {
            display: inline-block;
            margin-right: 12px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
            border-radius: 6px;
            overflow: hidden;
        }

        thead {
            background: #ca8a04; /* yellow-600 */
            color: #ffffff;
        }

        th, td {
            padding: 6px 8px;
            border: 1px solid #e5e7eb;
            font-size: 11px;
        }

        th {
            font-weight: 600;
            text-align: left;
        }

        tbody tr:nth-child(even) { background-color: #f3f4f6; }
        tbody tr:nth-child(odd)  { background-color: #ffffff; }

        .text-center { text-align: center; }
        .text-right  { text-align: right; }

        .badge-lowstock {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 999px;
            background-color: #fef9c3; /* yellow-100 */
            color: #854d0e;           /* yellow-800 */
            font-weight: 600;
        }
    </style>
</head>
<body>

<div class="report-card">
    <h1>Laporan Daftar Produk Segera Dipesan</h1>

    <div class="meta">
        <span>Tanggal dibuat: {{ ($generatedAt ?? now()->format('d-m-Y')) }}</span>
        <span>Oleh: {{ $processedBy ?? (auth()->user()->name ?? 'Akun Penjual') }}</span>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 40px;">No</th>
                <th>Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th style="width: 70px;">Stock</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($products as $i => $product)
                <tr>
                    <td class="text-center">{{ $i + 1 }}</td>
                    <td>{{ $product->nama_produk }}</td>
                    <td>{{ optional($product->category)->nama ?? '-' }}</td>
                    <td class="text-right">
                        Rp {{ number_format($product->harga, 0, ',', '.') }}
                    </td>
                    <td class="text-center">
                        <span class="badge-lowstock">{{ $product->stok }}</span>
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="text-center">Tidak ada produk dengan stok rendah.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>

</body>
</html>
