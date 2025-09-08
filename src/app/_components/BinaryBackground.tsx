'use client';

import React from 'react';

export const BinaryBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] opacity-40 dark:opacity-20">
            <div
                className="w-full h-full bg-repeat"
                style={{
                    backgroundImage: "url('/binary-pattern.svg')",
                    backgroundSize: '40px 120px'
                }}
            />
        </div>
    );
};
