import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

const floatingAnimations: Record<number, Record<string, string>> = {
    0: { animation: 'float_0 4s ease-in-out infinite' },
    1: { animation: 'float_1 5s ease-in-out infinite 0.5s' },
    2: { animation: 'float_2 6s ease-in-out infinite 1s' },
    3: { animation: 'float_3 5.5s ease-in-out infinite 0.2s' },
    4: { animation: 'float_4 4.5s ease-in-out infinite 0.8s' },
    5: { animation: 'float_5 5.5s ease-in-out infinite 0.3s' },
    6: { animation: 'float_6 6s ease-in-out infinite 1.2s' },
    7: { animation: 'float_7 4.8s ease-in-out infinite 0.6s' },
    8: { animation: 'float_8 5.2s ease-in-out infinite 0.9s' },
    9: { animation: 'float_9 5.8s ease-in-out infinite 0.4s' },
};

const dotConfig = [
    { top: 'top-10', left: 'left-16', size: 'w-8 h-8', delay: 'delay-0' },
    { top: 'top-32', right: 'right-24', size: 'w-6 h-6', delay: 'delay-100' },
    { top: 'top-1/4', left: 'left-1/3', size: 'w-5 h-5', delay: 'delay-200' },
    { top: 'top-1/3', right: 'right-20', size: 'w-7 h-7', delay: 'delay-300' },
    { bottom: 'bottom-40', left: 'left-1/4', size: 'w-6 h-6', delay: 'delay-100' },
    { bottom: 'bottom-20', right: 'right-1/4', size: 'w-7 h-7', delay: 'delay-200' },
    { bottom: 'bottom-32', left: 'left-20', size: 'w-5 h-5', delay: 'delay-300' },
    { top: 'top-2/3', right: 'right-1/3', size: 'w-6 h-6', delay: 'delay-0' },
    { top: 'top-1/2', left: 'left-1/2', size: 'w-4 h-4', delay: 'delay-200' },
    { bottom: 'bottom-10', right: 'right-32', size: 'w-5 h-5', delay: 'delay-100' },
];

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-6 md:p-10 relative overflow-hidden">
            <style>{`
                @keyframes float_0 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-30px) translateX(10px); } }
                @keyframes float_1 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-40px) translateX(-15px); } }
                @keyframes float_2 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-35px) translateX(20px); } }
                @keyframes float_3 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-45px) translateX(-10px); } }
                @keyframes float_4 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-25px) translateX(15px); } }
                @keyframes float_5 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-38px) translateX(-20px); } }
                @keyframes float_6 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-32px) translateX(12px); } }
                @keyframes float_7 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-42px) translateX(-8px); } }
                @keyframes float_8 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-28px) translateX(18px); } }
                @keyframes float_9 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-36px) translateX(-12px); } }
                
                .bubble {
                    background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
                    box-shadow: 
                        0 8px 32px 0 rgba(31, 38, 135, 0.37),
                        inset -1px -1px 3px 0 rgba(0, 0, 0, 0.2),
                        inset 1px 1px 3px 0 rgba(255, 255, 255, 0.5);
                }
            `}</style>
            {/* Decorative blur shapes */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
            
            {/* Floating dots pattern - animated */}
            {dotConfig.map((config, index) => (
                <div
                    key={index}
                    className={`absolute ${config.top || ''} ${config.bottom || ''} ${config.left || ''} ${config.right || ''} ${config.size} rounded-full bubble`}
                    style={floatingAnimations[index]}
                ></div>
            ))}
            <div className="w-full max-w-sm relative z-10">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium text-white">{title}</h1>
                            <p className="text-center text-sm text-white/80">
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg border border-white/20 p-6">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
