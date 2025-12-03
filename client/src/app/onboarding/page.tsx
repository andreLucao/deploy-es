'use client';

import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';

export default function OnboardingWelcome() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/onboarding/company-info');
  };

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={4}
      title="Bem-vindo ao EcoChange"
      description="Vamos conhecer sua empresa e seus objetivos de sustentabilidade"
    >
      <div className="space-y-6">
        <p className="text-lg text-gray-700 leading-relaxed">
          Olá! Nos próximos passos, vamos entender melhor sua empresa para
          personalizar sua experiência com o EcoChange.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Serão apenas 4 passos rápidos para começar a rastrear e reduzir as
          emissões de carbono da sua organização.
        </p>

        <div className="bg-[#f0fdf4] rounded-lg p-6 border border-[#00e07f]">
          <h3 className="font-semibold text-[#002e34] mb-4">
            O que você aprenderá:
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <span className="text-[#00e07f] font-bold">✓</span>
              <span>Como funciona o EcoChange e seus benefícios</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#00e07f] font-bold">✓</span>
              <span>Informações da sua empresa</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#00e07f] font-bold">✓</span>
              <span>Seus objetivos de sustentabilidade</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#00e07f] font-bold">✓</span>
              <span>Como você pode contribuir para um planeta mais sustentável</span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <button
            onClick={handleGetStarted}
            className="w-full px-6 py-4 bg-[#00e07f] text-white font-semibold text-lg rounded-lg hover:bg-[#00c96b] transition-colors"
          >
            Começar →
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm">
          Você pode pular este onboarding a qualquer momento
        </p>
      </div>
    </OnboardingLayout>
  );
}
