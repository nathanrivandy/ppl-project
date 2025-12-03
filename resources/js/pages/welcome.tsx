import { dashboard, login } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, LayoutDashboard, ChevronDown, XCircle } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <>
            <Head title="Marketplace - Platform Jual Beli Online" />
            
            <div className="min-h-screen bg-white">
                {/* Header */}
                <header className="border-b bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <h1 className="text-2xl font-bold text-gray-900">🛍️ Marketplace</h1>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="flex items-center gap-2 h-auto py-2 hover:bg-gray-100">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarFallback className="bg-blue-600 text-white text-sm">
                                                        {getInitials(auth.user.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col items-start">
                                                    <span className="text-sm font-medium text-gray-900">{auth.user.name}</span>
                                                    {auth.user.seller && (
                                                        <span className="text-xs text-gray-500">{auth.user.seller.nama_toko}</span>
                                                    )}
                                                </div>
                                                <ChevronDown className="h-4 w-4 text-gray-500" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuLabel>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{auth.user.name}</span>
                                                    <span className="text-xs text-gray-500 font-normal">{auth.user.email}</span>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {auth.user.seller?.status_verifikasi !== 'rejected' && (
                                                <>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={dashboard()} className="flex items-center cursor-pointer">
                                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                                            Dashboard
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                </>
                                            )}
                                            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Log out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <>
                                        <Link href={login()}>
                                            <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">Login</Button>
                                        </Link>
                                        <Link href="/register-seller">
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Daftar Sebagai Penjual</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Rejection Alert */}
                {auth.user?.seller?.status_verifikasi === 'rejected' && (
                    <div className="bg-red-50 border-b border-red-200">
                        <div className="container mx-auto px-4 py-4">
                            <Alert variant="destructive" className="border-red-300">
                                <XCircle className="h-4 w-4" />
                                <AlertDescription className="flex items-center justify-between">
                                    <span>
                                        Pendaftaran toko Anda ditolak. <Link href="/seller/rejection" className="underline font-semibold">Lihat alasan penolakan</Link>
                                    </span>
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>
                )}

                {/* Hero Section */}
                <section className="container mx-auto px-4 py-20 text-center bg-gradient-to-b from-blue-50 to-white">
                    <h1 className="text-5xl font-bold mb-6 text-gray-900">
                        Selamat Datang di Marketplace
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Platform jual beli online terpercaya untuk berbagai produk dari penjual terverifikasi
                    </p>
                    
                    <div className="flex gap-4 justify-center">
                        <Link href="/products">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Jelajahi Produk
                            </Button>
                        </Link>
                        <Link href="/register-seller">
                            <Button size="lg" className="bg-white hover:bg-blue-50 text-blue-600 border-2 border-blue-600">
                                Mulai Berjualan
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Features Section */}
                <section className="container mx-auto px-4 py-16 bg-white">
                    <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Mengapa Memilih Kami?</h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="bg-white border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-900">
                                    <span className="text-2xl">✅</span>
                                    Penjual Terverifikasi
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    Semua penjual melalui proses verifikasi ketat untuk memastikan keamanan transaksi Anda
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-900">
                                    <span className="text-2xl">📦</span>
                                    Beragam Produk
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    Temukan berbagai kategori produk dari penjual di seluruh Indonesia
                                </CardDescription>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border-gray-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-gray-900">
                                    <span className="text-2xl">⭐</span>
                                    Review & Rating
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600">
                                    Sistem rating transparan untuk membantu Anda memilih produk terbaik
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Call to Action for Sellers */}
                <section className="bg-blue-600 text-white py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold mb-4 text-white">Ingin Bergabung Sebagai Penjual?</h2>
                        <p className="text-lg mb-8 text-blue-50">
                            Daftarkan toko Anda sekarang dan jangkau lebih banyak pelanggan
                        </p>
                        <Link href="/register-seller">
                            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                                Daftar Sekarang
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white py-8">
                    <div className="container mx-auto px-4 text-center text-gray-600">
                        <p>&copy; 2025 Marketplace. Platform Jual Beli Online Terpercaya.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
