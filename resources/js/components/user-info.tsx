import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { type User } from '@/types';

export function UserInfo({
    user,
    showEmail = false,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();
    
    // Untuk platform role, gunakan MainLogoAKD.png
    // Untuk penjual, gunakan foto_pic dari seller profile
    let avatarSrc: string | undefined;
    
    if (user.role === 'platform') {
        avatarSrc = '/MainLogoAKD.png';
    } else if (user.role === 'penjual' && user.seller?.foto_pic) {
        avatarSrc = `/storage/${user.seller.foto_pic}`;
    }

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={avatarSrc} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-blue-500 text-white font-semibold">
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && (
                    <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
