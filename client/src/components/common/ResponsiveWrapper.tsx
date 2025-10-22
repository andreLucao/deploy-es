"use client";

import { ReactNode } from 'react';

interface ResponsiveWrapperProps {
  children: ReactNode;
  className?: string;
  container?: boolean;
  spacing?: 'sm' | 'md' | 'lg';
}

export default function ResponsiveWrapper({
  children,
  className = '',
  container = false,
  spacing = 'md'
}: ResponsiveWrapperProps) {
  
  const spacingClasses = {
    sm: 'spacing-responsive-sm',
    md: 'spacing-responsive-md',
    lg: 'spacing-responsive-lg'
  };

  const containerClass = container ? 'container-responsive' : 'w-full';
  const spacingClass = spacingClasses[spacing];

  return (
    <div className={`${containerClass} ${spacingClass} ${className}`}>
      {children}
    </div>
  );
}