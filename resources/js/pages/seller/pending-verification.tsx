import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AuthLayout from '@/layouts/auth-layout';
import { logout } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { Clock, Mail, CheckCircle2, XCircle } from 'lucide-react';

interface Seller {
    status_verifikasi: 'pending' | 'approved' | 'rejected';
    alasan_penolakan?: string;
    tanggal_verifikasi?: string;
    nama_toko: string;
}

export default function PendingVerification({ seller }: { seller: Seller }) {
    const getStatusConfig = () => {
        switch (seller.status_verifikasi) {
            case 'pending':
                return {
                    icon: Clock,
                    title: 'Menunggu Verifikasi',
                    description: 'Pendaftaran Anda sedang dalam proses verifikasi oleh tim admin kami.',
                    color: 'text-yellow-600',
                    bgColor: 'bg-yellow-50',
                };
            case 'approved':
                return {
                    icon: CheckCircle2,
                    title: 'Akun Telah Diverifikasi',
                    description: 'Selamat! Akun Anda telah diverifikasi dan diaktifkan.',
                    color: 'text-green-600',
                    bgColor: 'bg-green-50',
                };
            case 'rejected':
                return {
                    icon: XCircle,
                    title: 'Verifikasi Ditolak',
                    description: 'Maaf, pendaftaran Anda tidak dapat disetujui.',
                    color: 'text-red-600',
                    bgColor: 'bg-red-50',
                };
            default:
                return {
                    icon: Clock,
                    title: 'Status Tidak Diketahui',
                    description: 'Silakan hubungi admin untuk informasi lebih lanjut.',
                    color: 'text-gray-600',
                    bgColor: 'bg-gray-50',
                };
        }
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    return (
        <AuthLayout
            title={config.title}
            description={config.description}
        >
            <Head title={config.title} />

            <Card className="border-0 bg-white shadow-lg">
                <CardHeader className="space-y-4 pb-6">
                    <div className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${config.bgColor}`}>
                        <Icon className={`h-10 w-10 ${config.color}`} />
                    </div>
                    <CardTitle className="text-center text-2xl font-semibold text-gray-900">
                        {config.title}
                    </CardTitle>
                    <CardDescription className="text-center text-base text-gray-600">
                        Toko: <strong className="text-gray-900">{seller.nama_toko}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-6 pb-8">
                    <div className="space-y-4 text-center">
                        <p className="text-sm text-gray-600">{config.description}</p>

                        {seller.status_verifikasi === 'pending' && (
                            <>
                                <div className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
                                    <Mail className="h-5 w-5 flex-shrink-0" />
                                    <span>
                                        Anda akan menerima email notifikasi setelah proses verifikasi selesai.
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Proses verifikasi biasanya memakan waktu 1-3 hari kerja.
                                </p>
                            </>
                        )}

                        {seller.status_verifikasi === 'rejected' && seller.alasan_penolakan && (
                            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-left">
                                <p className="mb-2 font-semibold text-red-900">Alasan Penolakan:</p>
                                <p className="text-sm text-red-700">{seller.alasan_penolakan}</p>
                            </div>
                        )}

                        {seller.status_verifikasi === 'approved' && (
                            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                                <p>
                                    Silakan logout dan login kembali untuk mengakses dashboard penjual.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 pt-2">
                        {seller.status_verifikasi === 'approved' && (
                            <Button asChild size="lg">
                                <Link href={logout()}>
                                    Logout dan Login Kembali
                                </Link>
                            </Button>
                        )}
                        
                        <Button variant="outline" asChild size="lg">
                            <Link href={logout()}>
                                Logout
                            </Link>
                        </Button>

                        {seller.status_verifikasi === 'rejected' && (
                            <p className="text-center text-xs text-muted-foreground">
                                Untuk mendaftar ulang, silakan hubungi admin atau daftar dengan email lain.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
