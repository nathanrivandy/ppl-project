import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import seller from '@/routes/seller';
import platform from '@/routes/platform';
import { dashboard } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage<SharedData>();
    const userRole = page.props.auth.user.role;
    const labelText = userRole === 'penjual' ? 'Penjual' : 'Platform';
    
    return (
        <SidebarGroup className="px-2 py-4">
            <SidebarGroupLabel className="font-semibold text-xs uppercase tracking-widest mb-3 text-gray-900">{labelText}</SidebarGroupLabel>
            <SidebarMenu className="gap-2">
                {items.map((item) => {
                    const baseActive = page.url.startsWith(resolveUrl(item.href));
                    const isDashboardItem = item.title === 'Dashboard';
                    const dashboardUrls: string[] = [
                        resolveUrl(dashboard()),
                        seller?.dashboard ? resolveUrl(seller.dashboard().url) : '',
                        platform?.dashboard ? resolveUrl(platform.dashboard().url) : '',
                    ].filter(Boolean);
                    const isActive = isDashboardItem
                        ? dashboardUrls.some((u) => page.url.startsWith(u))
                        : baseActive;
                    
                    return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            tooltip={{ children: item.title }}
                            className={isActive ? "rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 border border-blue-300 transition-all duration-200 group shadow-md" : "rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200 group shadow-sm hover:shadow-md"}
                        >
                            <Link href={item.href} prefetch>
                                {item.icon && <item.icon className={isActive ? "group-hover:scale-110 transition-transform duration-200 text-white" : "group-hover:scale-110 transition-transform duration-200 text-gray-900"} />}
                                <span className={isActive ? "font-medium text-white" : "font-medium text-gray-900"}>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
