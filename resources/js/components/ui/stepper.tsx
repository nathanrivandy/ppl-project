import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
    id: number;
    title: string;
    description?: string;
}

interface StepperProps {
    steps: Step[];
    currentStep: number;
    className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
    return (
        <div className={cn('w-full', className)}>
            <div className="flex items-center justify-center">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        <div className="flex flex-col items-center relative">
                            {/* Step Circle */}
                            <div
                                className={cn(
                                    'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors',
                                    currentStep > step.id
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : currentStep === step.id
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : 'bg-white border-gray-300 text-gray-400'
                                )}
                            >
                                {currentStep > step.id ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <span className="font-semibold">{step.id}</span>
                                )}
                            </div>

                            {/* Step Label */}
                            <div className="absolute top-12 text-center w-32">
                                <p
                                    className={cn(
                                        'text-sm font-medium',
                                        currentStep >= step.id
                                            ? 'text-gray-900'
                                            : 'text-gray-400'
                                    )}
                                >
                                    {step.title}
                                </p>
                                {step.description && (
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Connecting Line */}
                        {index < steps.length - 1 && (
                            <div
                                className={cn(
                                    'w-16 h-0.5 mx-2 transition-colors',
                                    currentStep > step.id
                                        ? 'bg-blue-600'
                                        : 'bg-gray-300'
                                )}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
