import {
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout, dashboard } from '@/routes';
import seller from '@/routes/seller';
import platform from '@/routes/platform';
import { resolveUrl } from '@/lib/utils';
import { type User } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { LogOut, LayoutDashboard } from 'lucide-react';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();
    const page = usePage();
    const dashboardUrls: string[] = [
        resolveUrl(dashboard()),
        seller?.dashboard ? resolveUrl(seller.dashboard().url) : '',
        platform?.dashboard ? resolveUrl(platform.dashboard().url) : '',
    ].filter(Boolean);
    const isDashboardPage = dashboardUrls.some((u) => page.url.startsWith(u));

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 px-2 py-2.5 text-left text-sm bg-slate-50 rounded-md border-b border-slate-200">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            {/* Dashboard item removed per request: only show Logout */}
            <DropdownMenuItem asChild>
                <Link
                    className="flex items-center gap-2 px-2 py-2.5 rounded-md bg-gradient-to-r from-red-500 to-red-600 border border-red-400 text-white shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer w-full"
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-1 size-4 text-white" />
                    <span className="font-medium text-white">Log out</span>
                </Link>
            </DropdownMenuItem>
        </>
    );
}
