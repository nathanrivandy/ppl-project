<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Penjual Per Provinsi</title>
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
            margin-bottom: 30px;
        }
        th {
            background-color: #10b981;
            color: white;
            padding: 10px;
            text-align: left;
            font-weight: bold;
        }
        td {
            padding: 8px;
            border-bottom: 1px solid #e5e7eb;
        }
        .province-header {
            background-color: #f3f4f6;
            font-weight: bold;
            color: #1e40af;
            padding: 10px;
            margin-top: 20px;
            border-left: 4px solid #10b981;
        }
        .summary {
            background-color: #f3f4f6;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 5px;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>LAPORAN PENJUAL PER PROVINSI</h1>
    <p class="subtitle">Marketplace Platform</p>
    <p class="meta">Dicetak: {{ $generatedAt }}</p>

    <div class="summary">
        <strong>Total Toko Terdaftar:</strong> {{ $totalSellers }} toko di {{ $sellersByProvince->count() }} provinsi
    </div>

    @foreach($sellersByProvince as $province => $sellers)
        <div class="province-header">
            {{ strtoupper($province) }} ({{ $sellers->count() }} Toko)
        </div>
        
        <table>
            <thead>
                <tr>
                    <th width="5%">No</th>
                    <th width="25%">Nama Toko</th>
                    <th width="20%">Nama PIC</th>
                    <th width="20%">Email</th>
                    <th width="15%">No. HP</th>
                    <th width="15%">Kota</th>
                </tr>
            </thead>
            <tbody>
                @foreach($sellers as $index => $seller)
                    <tr>
                        <td>{{ $index + 1 }}</td>
                        <td>{{ $seller->nama_toko }}</td>
                        <td>{{ $seller->nama_pic }}</td>
                        <td>{{ $seller->email_pic }}</td>
                        <td>{{ $seller->no_handphone_pic }}</td>
                        <td>{{ $seller->kabupaten_kota }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endforeach

    @if($sellersByProvince->isEmpty())
        <p style="text-align: center; color: #999; padding: 40px;">Tidak ada data penjual yang terverifikasi</p>
    @endif
</body>
</html>
