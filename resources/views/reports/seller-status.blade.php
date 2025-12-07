<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Daftar Akun Penjual Berdasarkan Status</title>
    <style>
        * {
            box-sizing: border-box;
        }

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

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
            border-radius: 6px;
            overflow: hidden;
        }

        thead {
            background: #2563eb; /* blue-600 */
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

        .status-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 600;
        }

        .status-active {
            background-color: #dcfce7;
            color: #166534;
        }

        .status-inactive {
            background-color: #fee2e2;
            color: #b91c1c;
        }
    </style>
</head>
<body>
    <div class="report-card">
        <h1>Laporan Daftar Akun Penjual Berdasarkan Status</h1>
        <div class="meta">
            <span>
                Tanggal dibuat:
                {{ ($generatedAt ?? now()->format('d-m-Y')) }}
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
                    <th>Nama User</th>
                    <th>Nama PIC</th>
                    <th>Nama Toko</th>
                    <th style="width: 90px;">Status</th>
                </tr>
            </thead>
            <tbody>
                @php $no = 1; @endphp

                {{-- Penjual Aktif dulu --}}
                @foreach ($activeSellers as $user)
                    <tr>
                        <td>{{ $no++ }}</td>
                        <td>{{ $user->name }}</td>
                        <td>{{ optional($user->seller)->nama_pic ?? '-' }}</td>
                        <td>{{ optional($user->seller)->nama_toko ?? '-' }}</td>
                        <td>
                            <span class="status-badge status-active">
                                Aktif
                            </span>
                        </td>
                    </tr>
                @endforeach

                {{-- Lalu Penjual Tidak Aktif --}}
                @foreach ($inactiveSellers as $user)
                    <tr>
                        <td>{{ $no++ }}</td>
                        <td>{{ $user->name }}</td>
                        <td>{{ optional($user->seller)->nama_pic ?? '-' }}</td>
                        <td>{{ optional($user->seller)->nama_toko ?? '-' }}</td>
                        <td>
                            <span class="status-badge status-inactive">
                                Tidak Aktif
                            </span>
                        </td>
                    </tr>
                @endforeach

                @if ($no === 1)
                    <tr>
                        <td colspan="5">Tidak ada data penjual.</td>
                    </tr>
                @endif
            </tbody>
        </table>
    </div>
</body>
</html>
