import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { XCircle, ArrowLeft, Mail } from 'lucide-react';

interface Seller {
    id: number;
    nama_toko: string;
    status_verifikasi: 'pending' | 'approved' | 'rejected';
    alasan_penolakan: string | null;
    tanggal_verifikasi: string | null;
}

interface RejectionProps {
    seller: Seller;
}

export default function SellerRejection({ seller }: RejectionProps) {
    return (
        <>
            <Head title="Pendaftaran Ditolak" />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4 max-w-3xl">
                    {/* Header */}
                    <div className="mb-6">
                        <Link href="/">
                            <Button variant="ghost" className="mb-4">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Kembali ke Beranda
                            </Button>
                        </Link>
                    </div>

                    {/* Main Card */}
                    <Card className="border-red-200 bg-white">
                        <CardHeader className="text-center pb-4">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <XCircle className="h-10 w-10 text-red-600" />
                            </div>
                            <CardTitle className="text-2xl text-gray-900">
                                Pendaftaran Ditolak
                            </CardTitle>
                            <CardDescription className="text-base">
                                Mohon maaf, pendaftaran toko "{seller.nama_toko}" tidak dapat disetujui
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            {/* Rejection Reason */}
                            <Alert variant="destructive">
                                <AlertDescription className="text-sm">
                                    <div className="font-semibold mb-2">Alasan Penolakan:</div>
                                    <div className="whitespace-pre-wrap">
                                        {seller.alasan_penolakan || 'Tidak ada alasan yang diberikan'}
                                    </div>
                                </AlertDescription>
                            </Alert>

                            {/* Info Card */}
                            <Card className="bg-blue-50 border-blue-200">
                                <CardContent className="pt-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Langkah Selanjutnya:</h3>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start">
                                            <span className="mr-2">1.</span>
                                            <span>Perbaiki dokumen dan informasi sesuai dengan alasan penolakan di atas</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">2.</span>
                                            <span>Daftar ulang dengan data yang sudah diperbaiki</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="mr-2">3.</span>
                                            <span>Pastikan semua dokumen jelas dan sesuai dengan persyaratan</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Link href="/register-seller" className="flex-1">
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                                        Daftar Ulang
                                    </Button>
                                </Link>
                                <a href="mailto:support@marketplace.com" className="flex-1">
                                    <Button variant="outline" className="w-full">
                                        <Mail className="mr-2 h-4 w-4" />
                                        Hubungi Support
                                    </Button>
                                </a>
                            </div>

                            {/* Additional Info */}
                            <div className="text-center text-sm text-gray-600 pt-4 border-t">
                                Jika Anda memiliki pertanyaan atau memerlukan klarifikasi lebih lanjut,
                                silakan hubungi tim support kami.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
