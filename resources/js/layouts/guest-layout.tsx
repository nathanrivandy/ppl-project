import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
import { ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';
import { type ReactNode } from 'react';

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
            <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <img
                                src="/LogoAkade.png"
                                alt="Akade Marketplace"
                                className="h-16 w-auto"
                            />
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
                                            className="flex h-auto items-center gap-2 py-2 hover:bg-gray-100"
                                        >
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback className="bg-blue-600 text-sm text-white">
                                                    {getInitials(
                                                        auth.user.name,
                                                    )}
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
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-56"
                                    >
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {auth.user.name}
                                                </span>
                                                <span className="text-xs font-normal text-gray-500">
                                                    {auth.user.email}
                                                </span>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/dashboard"
                                                className="flex cursor-pointer items-center"
                                            >
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                            className="cursor-pointer text-red-600"
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
                                            className="text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        >
                                            Login
                                        </Button>
                                    </Link>
                                    <Link href="/register-seller">
                                        <Button className="bg-blue-600 text-white hover:bg-blue-700">
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
            <footer className="mt-12 border-t bg-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-gray-600">
                        <p>
                            &copy; 2025 Marketplace. Platform jual beli online
                            terpercaya.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
