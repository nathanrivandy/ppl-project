import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, UserCheck, Package } from 'lucide-react';
import AppLogo from './app-logo';
import platform from '@/routes/platform';

const footerNavItems: NavItem[] = [
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    // Menu items berdasarkan role
    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        // Menu produk hanya untuk seller
        ...(user.role === 'penjual' ? [{
            title: 'Produk',
            href: '/seller/products',
            icon: Package,
        }] : []),
        // Menu verifikasi hanya untuk platform admin
        ...(user.role === 'platform' ? [{
            title: 'Verifikasi Penjual',
            href: platform.sellers.verification(),
            icon: UserCheck,
        }] : []),
    ];

    return (
        <Sidebar collapsible="icon" variant="inset" className="shadow-lg border-r border-white/20 bg-white/10 backdrop-blur-md">
            <SidebarHeader className="border-b border-white/10 py-2 px-2 bg-white/5">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="sm" asChild className="rounded-lg h-auto p-0 w-fit hover:bg-white/10 transition-colors duration-200">
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-white/10 bg-white/5 py-2">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
