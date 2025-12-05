import { Link, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { router } from '@inertiajs/react';

interface GuestLayoutProps {
    children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    const { auth } = usePage<SharedData>().props;

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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <h1 className="text-2xl font-bold text-gray-900">🛍️ Marketplace</h1>
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link href="/catalog">
                                <Button variant="ghost">Katalog</Button>
                            </Link>
                            {auth.user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center gap-2 h-auto py-2 hover:bg-gray-100"
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="bg-blue-600 text-white text-sm">
                                                    {getInitials(auth.user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col items-start">
                                                <span className="text-sm font-medium text-gray-900">
                                                    {auth.user.name}
                                                </span>
                                            </div>
                                            <ChevronDown className="h-4 w-4 text-gray-500" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{auth.user.name}</span>
                                                <span className="text-xs text-gray-500 font-normal">
                                                    {auth.user.email}
                                                </span>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard" className="flex items-center cursor-pointer">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                            className="text-red-600 cursor-pointer"
                                        >
                                            <LogOut className="mr-2 h-4 w-4" />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button
                                            variant="ghost"
                                            className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/register-seller">
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                            Daftar Sebagai Penjual
                                        </Button>
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
            <footer className="border-t bg-white mt-12">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-gray-600">
                        <p>&copy; 2025 Marketplace. Platform jual beli online terpercaya.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
