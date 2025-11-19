"use client";

import { ReactNode } from 'react';

interface ResponsiveGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function ResponsiveGrid({
  children,
  columns = 3,
  gap = 'md',
  className = ''
}: ResponsiveGridProps) {
  
  const gridClasses = {
    1: 'grid-responsive-1',
    2: 'grid-responsive-2', 
    3: 'grid-responsive-3',
    4: 'grid-responsive-4'
  };

  const gapClasses = {
    sm: 'gap-2 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8'
  };

  const gridClass = gridClasses[columns];
  const gapClass = gapClasses[gap];

  return (
    <div className={`${gridClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
}