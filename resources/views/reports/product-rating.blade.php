<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Rating Produk</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #333;
        }
        h1 {
            text-align: center;
            color: #1e40af;
            margin-bottom: 5px;
        }
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 20px;
        }
        .meta {
            text-align: right;
            font-size: 10px;
            color: #666;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th {
            background-color: #f59e0b;
            color: white;
            padding: 10px;
            text-align: left;
            font-weight: bold;
        }
        td {
            padding: 8px;
            border-bottom: 1px solid #e5e7eb;
        }
        .rating-high {
            color: #10b981;
            font-weight: bold;
        }
        .rating-medium {
            color: #f59e0b;
            font-weight: bold;
        }
        .rating-low {
            color: #ef4444;
            font-weight: bold;
        }
        .summary {
            background-color: #fef3c7;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 5px;
            text-align: center;
        }
        .price {
            text-align: right;
        }
    </style>
</head>
<body>
    <h1>LAPORAN RATING PRODUK</h1>
    <p class="subtitle">Diurutkan Berdasarkan Rating (Tertinggi ke Terendah)</p>
    <p class="meta">Dicetak: {{ $generatedAt }}</p>

    <div class="summary">
        <strong>Total Produk:</strong> {{ $products->count() }} produk
    </div>

    <table>
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="25%">Nama Produk</th>
                <th width="20%">Nama Toko</th>
                <th width="12%">Kategori</th>
                <th width="13%">Harga</th>
                <th width="10%">Rating</th>
                <th width="15%">Provinsi</th>
            </tr>
        </thead>
        <tbody>
            @forelse($products as $index => $product)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $product['name'] }}</td>
                    <td>{{ $product['store_name'] }}</td>
                    <td>{{ $product['category'] }}</td>
                    <td class="price">Rp {{ number_format($product['price'], 0, ',', '.') }}</td>
                    <td class="
                        @if($product['rating'] >= 4.5) rating-high
                        @elseif($product['rating'] >= 3.5) rating-medium
                        @else rating-low
                        @endif
                    ">
                        ⭐ {{ number_format($product['rating'], 1) }}
                    </td>
                    <td>{{ $product['province'] }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="7" style="text-align: center; color: #999;">Tidak ada data produk</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div style="margin-top: 30px; padding: 10px; background-color: #eff6ff; border-left: 4px solid #3b82f6;">
        <strong>Catatan:</strong> Data ini akan otomatis diperbarui setelah fitur produk dan rating diimplementasikan.
    </div>
</body>
</html>
