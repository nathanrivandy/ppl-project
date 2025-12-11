import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronDown, LayoutDashboard, LogOut, Search } from 'lucide-react';
import { type ReactNode, useState, useEffect, useRef } from 'react';

interface GuestLayoutProps {
    children: ReactNode;
    categories?: Array<{ id: number; nama: string }>;
    provinces?: Array<{ id: number; name: string }>;
    cities?: Array<{ id: number; name: string }>;
    onFilterChange?: (filters: any) => void;
    filters?: { search?: string | null; category?: string | null; city?: string | null; province?: string | null };
}

export default function GuestLayout({ children, categories = [], provinces = [], cities = [], onFilterChange, filters }: GuestLayoutProps) {
    const { auth } = usePage<SharedData>().props;
    const { url } = usePage();
    const isCatalogPage = url?.includes('/catalog');
    const isProductPage = url?.includes('/products/') || url?.includes('/product/');
    const [searchQuery, setSearchQuery] = useState('');
    const isInitialized = useRef(false);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const handleFilterChange = () => {
        if (onFilterChange) {
            onFilterChange({
                search: searchQuery,
            });
        }
    };

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.get('/catalog', { search: searchQuery });
        }
    };

    useEffect(() => {
        // Initialize dari filters yang diterima dari server (query param)
        if (!isInitialized.current && filters) {
            setSearchQuery(filters.search || '');
            isInitialized.current = true;
        }
    }, []);

    useEffect(() => {
        if (!onFilterChange) return; // Skip auto-search if onFilterChange not provided
        
        const timer = setTimeout(() => {
            handleFilterChange();
        }, 200);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    return (
        <>
            <header className="sticky top-0 z-40 border-b border-blue-200 bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between gap-4">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <img src="/LogoAKD.png" alt="AKD Logo" className="h-10 w-auto" />
                        </Link>

                        {/* Search Bar - Only on Catalog and Product Pages */}
                        {(isCatalogPage || isProductPage) && (
                            <div className="relative group flex-1 max-w-3xl mx-8">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 transition-all group-hover:scale-110">
                                    <Search className="h-5 w-5" />
                                </div>
                                <Input
                                    type="text"
                                    placeholder="Cari produk, toko, kategori, kota, atau provinsi..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={!onFilterChange ? handleSearch : undefined}
                                    className="w-full pl-10 pr-4 py-2 bg-gradient-to-r from-blue-50 to-white text-gray-900 border-2 border-blue-200 rounded-lg text-sm font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md"
                                />
                            </div>
                        )}

                        {/* Auth Section */}
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

                                        {/* Seller/Platform Dashboard Links */}
                                        {auth.user.seller ? (
                                            <DropdownMenuItem asChild>
                                                <Link href="/seller/dashboard" className="flex items-center gap-2 cursor-pointer">
                                                    <LayoutDashboard className="h-4 w-4" />
                                                    Dashboard Toko
                                                </Link>
                                            </DropdownMenuItem>
                                        ) : auth.user.is_platform ? (
                                            <DropdownMenuItem asChild>
                                                <Link href="/platform/dashboard" className="flex items-center gap-2 cursor-pointer">
                                                    <LayoutDashboard className="h-4 w-4" />
                                                    Platform Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                        ) : null}

                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                                            <LogOut className="h-4 w-4" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <>
                                    <Link href="/login">
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

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="border-t border-gray-200 bg-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-gray-600">
                        <p>
                            &copy; 2025 AKD Market. Platform jual barang online
                            terlengkap.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
