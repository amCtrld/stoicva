'use client';

import { Bot } from 'lucide-react';

interface TypingIndicatorProps {
    isVisible: boolean;
}

export function TypingIndicator({ isVisible }: TypingIndicatorProps) {
    if (!isVisible) return null;

    return (
        <div className={`
            flex items-start gap-3 transition-all duration-300 ease-in-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}>
            <div className="w-8 h-8 rounded-full bg-[#800020]/10 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-[#800020]" />
            </div>
            <div className="bg-white text-maroon border border-gold/20 p-3 rounded-lg shadow-sm">
                <div className="flex items-center gap-1">
                    <div 
                        className="w-2 h-2 bg-[#800020] rounded-full animate-bounce"
                        style={{ animationDelay: '0s', animationDuration: '1.4s' }}
                    />
                    <div 
                        className="w-2 h-2 bg-[#800020] rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s', animationDuration: '1.4s' }}
                    />
                    <div 
                        className="w-2 h-2 bg-[#800020] rounded-full animate-bounce"
                        style={{ animationDelay: '0.4s', animationDuration: '1.4s' }}
                    />
                </div>
            </div>
        </div>
    );
}