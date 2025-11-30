import { Head, router, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface Seller {
    id: number;
    nama_toko: string;
    deskripsi_singkat: string;
    nama_pic: string;
    email_pic: string;
    no_handphone_pic: string;
    alamat_jalan: string;
    rt: string;
    rw: string;
    kelurahan: string;
    kabupaten_kota: string;
    propinsi: string;
    no_ktp: string;
    foto_pic: string | null;
    file_ktp: string | null;
    status_verifikasi: 'pending' | 'approved' | 'rejected';
    alasan_penolakan: string | null;
    created_at: string;
}

interface Props {
    seller: Seller;
}

export default function SellerVerificationShow({ seller }: Props) {
    const [showRejectForm, setShowRejectForm] = useState(false);
    const { data, setData, post, processing } = useForm({
        alasan_penolakan: '',
    });

    const handleApprove = () => {
        if (confirm('Apakah Anda yakin ingin menyetujui registrasi penjual ini?')) {
            router.post(`/platform/sellers/${seller.id}/approve`);
        }
    };

    const handleReject = (e: React.FormEvent) => {
        e.preventDefault();
        if (confirm('Apakah Anda yakin ingin menolak registrasi penjual ini?')) {
            post(`/platform/sellers/${seller.id}/reject`);
        }
    };

    const getStatusBadge = (status: string) => {
        const variants = {
            pending: 'bg-yellow-500',
            approved: 'bg-green-500',
            rejected: 'bg-red-500',
        };
        
        const labels = {
            pending: 'Menunggu Verifikasi',
            approved: 'Disetujui',
            rejected: 'Ditolak',
        };

        return (
            <Badge className={variants[status as keyof typeof variants]}>
                {labels[status as keyof typeof labels]}
            </Badge>
        );
    };

    return (
        <AppLayout>
            <Head title={`Verifikasi ${seller.nama_toko}`} />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link href="/platform/sellers/verification">
                            <Button className="mb-4 bg-gray-600 hover:bg-gray-700 text-white">
                                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Kembali ke Daftar
                            </Button>
                        </Link>
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{seller.nama_toko}</h1>
                                <p className="mt-2 text-gray-600">Detail Registrasi Penjual</p>
                            </div>
                            {getStatusBadge(seller.status_verifikasi)}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Data Toko */}
                        <Card className="bg-white border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-gray-900">Data Toko</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-gray-600">Nama Toko</Label>
                                    <p className="font-medium text-gray-900">{seller.nama_toko}</p>
                                </div>
                                <div>
                                    <Label className="text-gray-600">Deskripsi</Label>
                                    <p className="font-medium text-gray-900">{seller.deskripsi_singkat}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Data PIC */}
                    <Card className="bg-white border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-gray-900">Data Penanggung Jawab (PIC)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-gray-600">Nama PIC</Label>
                                <p className="font-medium text-gray-900">{seller.nama_pic}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-gray-600">Email</Label>
                                    <p className="font-medium text-gray-900">{seller.email_pic}</p>
                                </div>
                                <div>
                                    <Label className="text-gray-600">No. Handphone</Label>
                                    <p className="font-medium text-gray-900">{seller.no_handphone_pic}</p>
                                </div>
                            </div>
                            <div>
                                <Label className="text-gray-600">No. KTP</Label>
                                <p className="font-medium text-gray-900">{seller.no_ktp}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Alamat */}
                    <Card className="bg-white border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-gray-900">Alamat</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-gray-600">Alamat Lengkap</Label>
                                <p className="font-medium text-gray-900">{seller.alamat_jalan}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-gray-600">RT</Label>
                                    <p className="font-medium text-gray-900">{seller.rt}</p>
                                </div>
                                <div>
                                    <Label className="text-gray-600">RW</Label>
                                    <p className="font-medium text-gray-900">{seller.rw}</p>
                                </div>
                            </div>
                            <div>
                                <Label className="text-gray-600">Kelurahan</Label>
                                <p className="font-medium text-gray-900">{seller.kelurahan}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-gray-600">Kabupaten/Kota</Label>
                                    <p className="font-medium text-gray-900">{seller.kabupaten_kota}</p>
                                </div>
                                <div>
                                    <Label className="text-gray-600">Provinsi</Label>
                                    <p className="font-medium text-gray-900">{seller.propinsi}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dokumen */}
                    <Card className="bg-white border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-gray-900">Dokumen</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {seller.foto_pic && (
                                <div>
                                    <Label className="text-gray-600">Foto PIC</Label>
                                    <div className="mt-2">
                                        <img
                                            src={`/storage/${seller.foto_pic}`}
                                            alt="Foto PIC"
                                            className="w-48 h-48 object-cover rounded-lg border border-gray-200"
                                        />
                                    </div>
                                </div>
                            )}
                            {seller.file_ktp && (
                                <div>
                                    <Label className="text-gray-600">File KTP</Label>
                                    <div className="mt-2">
                                        {seller.file_ktp.endsWith('.pdf') ? (
                                            <a
                                                href={`/storage/${seller.file_ktp}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:underline"
                                            >
                                                Lihat File KTP (PDF)
                                            </a>
                                        ) : (
                                            <img
                                                src={`/storage/${seller.file_ktp}`}
                                                alt="File KTP"
                                                className="w-full max-w-md rounded-lg border border-gray-200"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Rejection Reason if rejected */}
                    {seller.status_verifikasi === 'rejected' && seller.alasan_penolakan && (
                        <Card className="bg-white border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-gray-900">Alasan Penolakan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-red-600 font-medium">{seller.alasan_penolakan}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Actions */}
                    {seller.status_verifikasi === 'pending' && (
                        <Card className="bg-white border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-gray-900">Verifikasi</CardTitle>
                                <CardDescription className="text-gray-600">
                                    Periksa data dengan teliti sebelum melakukan verifikasi
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {!showRejectForm ? (
                                    <div className="flex gap-4">
                                        <Button
                                            onClick={handleApprove}
                                            disabled={processing}
                                            className="bg-green-600 hover:bg-green-700"
                                        >
                                            Setujui Registrasi
                                        </Button>
                                        <Button
                                            onClick={() => setShowRejectForm(true)}
                                            variant="destructive"
                                        >
                                            Tolak Registrasi
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleReject} className="space-y-4">
                                        <div>
                                            <Label htmlFor="alasan_penolakan" className="text-gray-700">
                                                Alasan Penolakan <span className="text-red-500">*</span>
                                            </Label>
                                            <Textarea
                                                id="alasan_penolakan"
                                                value={data.alasan_penolakan}
                                                onChange={(e) =>
                                                    setData('alasan_penolakan', e.target.value)
                                                }
                                                required
                                                rows={4}
                                                placeholder="Jelaskan alasan penolakan"
                                                className="mt-2 bg-white border-gray-200 text-gray-900"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <Button
                                                type="submit"
                                                variant="destructive"
                                                disabled={processing}
                                            >
                                                Konfirmasi Penolakan
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setShowRejectForm(false)}
                                                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                                            >
                                                Batal
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
            </div>
        </AppLayout>
    );
}
