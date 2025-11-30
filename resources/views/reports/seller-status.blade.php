<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Status Penjual</title>
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
            background-color: #3b82f6;
            color: white;
            padding: 10px;
            text-align: left;
            font-weight: bold;
        }
        td {
            padding: 8px;
            border-bottom: 1px solid #e5e7eb;
        }
        tr:hover {
            background-color: #f9fafb;
        }
        .section-title {
            font-size: 14px;
            font-weight: bold;
            color: #1e40af;
            margin-top: 20px;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 2px solid #3b82f6;
        }
        .status-active {
            color: #10b981;
            font-weight: bold;
        }
        .status-inactive {
            color: #ef4444;
            font-weight: bold;
        }
        .summary {
            background-color: #f3f4f6;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        .summary-item {
            display: inline-block;
            margin-right: 30px;
        }
    </style>
</head>
<body>
    <h1>LAPORAN STATUS PENJUAL</h1>
    <p class="subtitle">Marketplace Platform</p>
    <p class="meta">Dicetak: {{ $generatedAt }}</p>

    <div class="summary">
        <div class="summary-item">
            <strong>Total Penjual Aktif:</strong> {{ $activeSellers->count() }}
        </div>
        <div class="summary-item">
            <strong>Total Penjual Tidak Aktif:</strong> {{ $inactiveSellers->count() }}
        </div>
        <div class="summary-item">
            <strong>Total Keseluruhan:</strong> {{ $activeSellers->count() + $inactiveSellers->count() }}
        </div>
    </div>

    <h2 class="section-title">PENJUAL AKTIF</h2>
    <table>
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="25%">Nama Toko</th>
                <th width="20%">Email</th>
                <th width="20%">Nama PIC</th>
                <th width="15%">No. HP</th>
                <th width="15%">Provinsi</th>
            </tr>
        </thead>
        <tbody>
            @forelse($activeSellers as $index => $user)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $user->seller->nama_toko ?? '-' }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->seller->nama_pic ?? '-' }}</td>
                    <td>{{ $user->seller->no_handphone_pic ?? '-' }}</td>
                    <td>{{ $user->seller->propinsi ?? '-' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" style="text-align: center; color: #999;">Tidak ada data penjual aktif</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <h2 class="section-title">PENJUAL TIDAK AKTIF</h2>
    <table>
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="25%">Nama Toko</th>
                <th width="20%">Email</th>
                <th width="20%">Nama PIC</th>
                <th width="15%">No. HP</th>
                <th width="15%">Provinsi</th>
            </tr>
        </thead>
        <tbody>
            @forelse($inactiveSellers as $index => $user)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $user->seller->nama_toko ?? '-' }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->seller->nama_pic ?? '-' }}</td>
                    <td>{{ $user->seller->no_handphone_pic ?? '-' }}</td>
                    <td>{{ $user->seller->propinsi ?? '-' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" style="text-align: center; color: #999;">Tidak ada data penjual tidak aktif</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
