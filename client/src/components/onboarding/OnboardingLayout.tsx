'use client';

import { ReactNode } from 'react';
import { useState } from 'react';

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  title: string;
  description?: string;
  onBack?: () => void;
}

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  title,
  description,
  onBack,
}: OnboardingLayoutProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002e34] to-[#00e07f] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <h1 className="text-3xl font-bold text-white">EcoChange</h1>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          {description && (
            <p className="text-white text-opacity-90">{description}</p>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm font-medium">
              Passo {currentStep} de {totalSteps}
            </span>
            <span className="text-white text-sm">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {children}
        </div>

        {/* Back Button */}
        {onBack && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={onBack}
              className="text-white hover:text-white hover:opacity-80 transition-opacity text-sm font-medium"
            >
              ← Voltar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
