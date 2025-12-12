import { useSidebar } from '@/components/ui/sidebar';

export default function AppLogo() {
    const { state } = useSidebar();
    const isCollapsed = state === 'collapsed';

    return (
        <div className="flex items-center justify-center w-full">
            <img 
                src={isCollapsed ? '/MainLogoAKD.png' : '/LogoAKD.png'}
                alt="AkadeMarket Logo" 
                className={isCollapsed ? "h-8 w-8 object-contain" : "h-8 w-auto"}
            />
        </div>
    );
}
