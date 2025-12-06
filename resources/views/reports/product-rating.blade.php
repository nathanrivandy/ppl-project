<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Daftar Produk Berdasarkan Rating</title>
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
            box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
            border: 1px solid #e5e7eb;
        }

        .srs {
            font-size: 11px;
            color: #6b7280;
            margin-bottom: 2px;
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

        .summary {
            font-size: 11px;
            color: #374151;
            margin-bottom: 8px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
            border-radius: 6px;
            overflow: hidden;
        }

        thead {
            background: #7c2d12; /* coklat kemerahan biar beda */
            color: #ffffff;
        }

        th, td {
            padding: 6px 8px;
            border: 1px solid #e5e7eb;
            text-align: left;
        }

        th {
            font-size: 12px;
            font-weight: 600;
        }

        tbody tr:nth-child(even) {
            background-color: #f3f4f6;
        }

        tbody tr:nth-child(odd) {
            background-color: #ffffff;
        }

        .rating-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 600;
            background-color: #fef3c7;
            color: #92400e;
        }

        .price {
            white-space: nowrap;
        }
    </style>
</head>
<body>
    <div class="report-card">
        <h1>Laporan Daftar Produk Berdasarkan Rating</h1>
        <div class="meta">
            <span>
                Tanggal dibuat:
                {{ $generatedAt ?? now()->format('d-m-Y H:i') }} 
            </span>
            <span>
                Oleh:
                {{ $processedBy ?? (auth()->user()->name ?? 'Platform Admin') }}
            </span>
        </div>


        <table>
            <thead>
                <tr>
                    <th style="width: 40px;">No</th>
                    <th>Produk</th>
                    <th>Kategori</th>
                    <th>Harga</th>
                    <th style="width: 80px;">Rating</th>
                    <th>Nama Toko</th>
                    <th>Propinsi</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($products as $index => $product)
                    @php
                        $isArray = is_array($product);
                        $name = $isArray ? ($product['name'] ?? '') : ($product->name ?? '');
                        $category = $isArray
                            ? ($product['category'] ?? '')
                            : (optional($product->category)->name ?? '');
                        $price = $isArray
                            ? ($product['price'] ?? 0)
                            : ($product->price ?? 0);
                        $ratingValue = $isArray
                            ? ($product['rating'] ?? 0)
                            : ($product->avg_rating ?? 0);
                        $storeName = $isArray
                            ? ($product['store_name'] ?? '')
                            : (optional($product->store)->nama_toko ?? '');
                        $province = $isArray
                            ? ($product['province'] ?? '')
                            : ($product->rating_province_name ?? '');
                    @endphp

                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $name }}</td>
                        <td>{{ $category ?: '-' }}</td>
                        <td class="price">
                            Rp {{ number_format($price, 0, ',', '.') }}
                        </td>
                        <td>
                            <span class="rating-badge">
                                {{ number_format($ratingValue, 2) }}
                            </span>
                        </td>
                        <td>{{ $storeName ?: '-' }}</td>
                        <td>{{ $province ?: '-' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7">Tidak ada data produk.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
</body>
</html>
