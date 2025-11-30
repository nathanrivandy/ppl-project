import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Seller {
    id: number;
    nama_toko: string;
    nama_pic: string;
    email_pic: string;
    kabupaten_kota: string;
    propinsi: string;
    status_verifikasi: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

interface PaginatedSellers {
    data: Seller[];
    current_page: number;
    last_page: number;
}

interface Props {
    sellers: PaginatedSellers;
}

export default function SellerVerificationIndex({ sellers }: Props) {
    const getStatusBadge = (status: string) => {
        const variants = {
            pending: 'bg-yellow-500',
            approved: 'bg-green-500',
            rejected: 'bg-red-500',
        };
        
        const labels = {
            pending: 'Menunggu',
            approved: 'Disetujui',
            rejected: 'Ditolak',
        };

        return (
            <Badge className={variants[status as keyof typeof variants]}>
                {labels[status as keyof typeof labels]}
            </Badge>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout>
            <Head title="Verifikasi Penjual" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Verifikasi Penjual</h1>
                        <p className="mt-2 text-gray-600">
                            Kelola registrasi penjual yang menunggu verifikasi
                        </p>
                    </div>

                    {sellers.data.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="mt-4 text-gray-600">
                                    Tidak ada penjual yang menunggu verifikasi
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead className="text-gray-700">Nama Toko</TableHead>
                                        <TableHead className="text-gray-700">Nama PIC</TableHead>
                                        <TableHead className="text-gray-700">Email</TableHead>
                                        <TableHead className="text-gray-700">Lokasi</TableHead>
                                        <TableHead className="text-gray-700">Status</TableHead>
                                        <TableHead className="text-gray-700">Tanggal Daftar</TableHead>
                                        <TableHead className="text-right text-gray-700">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sellers.data.map((seller) => (
                                        <TableRow key={seller.id} className="hover:bg-gray-50">
                                            <TableCell className="font-medium text-gray-900">
                                                {seller.nama_toko}
                                            </TableCell>
                                            <TableCell className="text-gray-700">{seller.nama_pic}</TableCell>
                                            <TableCell className="text-gray-700">{seller.email_pic}</TableCell>
                                            <TableCell className="text-gray-700">
                                                {seller.kabupaten_kota}, {seller.propinsi}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(seller.status_verifikasi)}
                                            </TableCell>
                                            <TableCell className="text-gray-700">
                                                {formatDate(seller.created_at)}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Link
                                                    href={`/platform/sellers/${seller.id}`}
                                                >
                                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                                                        Detail
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}

                    {sellers.last_page > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {Array.from({ length: sellers.last_page }, (_, i) => i + 1).map(
                                (page) => (
                                    <Button
                                        key={page}
                                        className={
                                            page === sellers.current_page
                                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                                : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-300'
                                        }
                                        size="sm"
                                        onClick={() =>
                                            router.get(
                                                `/platform/sellers/verification?page=${page}`
                                            )
                                        }
                                    >
                                        {page}
                                    </Button>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
