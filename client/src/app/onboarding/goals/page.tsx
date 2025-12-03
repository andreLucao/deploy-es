'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { SelectInput } from '@/components/onboarding/SelectInput';
import { OnboardingButtons } from '@/components/onboarding/OnboardingButtons';

const revenueRanges = [
  { value: 'under_1m', label: 'Menos de R$ 1 milhão' },
  { value: '1m_10m', label: 'R$ 1 milhão - R$ 10 milhões' },
  { value: '10m_50m', label: 'R$ 10 milhões - R$ 50 milhões' },
  { value: '50m_100m', label: 'R$ 50 milhões - R$ 100 milhões' },
  { value: 'over_100m', label: 'Mais de R$ 100 milhões' },
];

const sustainabilityGoals = [
  { value: 'reduce_emissions', label: 'Reduzir emissões de carbono' },
  { value: 'carbon_neutral', label: 'Atingir neutralidade de carbono' },
  { value: 'renewable_energy', label: 'Transitar para energia renovável' },
  { value: 'waste_reduction', label: 'Reduzir resíduos' },
  { value: 'sustainable_supply', label: 'Cadeia de suprimentos sustentável' },
  { value: 'compliance', label: 'Conformidade com regulamentações' },
  { value: 'all', label: 'Todos os itens acima' },
  { value: 'not_sure', label: 'Ainda não tenho certeza' },
];

export default function GoalsPage() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();
  const [formData, setFormData] = useState({
    annual_revenue_range: '',
    sustainability_goals: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.annual_revenue_range) {
      newErrors.annual_revenue_range = 'Faixa de receita é obrigatória';
    }

    if (!formData.sustainability_goals) {
      newErrors.sustainability_goals = 'Objetivos de sustentabilidade são obrigatórios';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleComplete = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Save goals data
      const saveResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/onboarding/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            annual_revenue_range: formData.annual_revenue_range,
            sustainability_goals: formData.sustainability_goals,
          }),
        }
      );

      if (!saveResponse.ok) {
        const error = await saveResponse.json();
        throw new Error(error.error || 'Erro ao salvar dados');
      }

      // Complete onboarding
      await completeOnboarding();

      // Redirect to marketplace
      router.push('/marketplace');
    } catch (error) {
      console.error('Error:', error);
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : 'Erro ao completar onboarding. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/onboarding/company-type');
  };

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={4}
      title="Objetivos de Sustentabilidade"
      description="Qual é sua visão para o futuro?"
      onBack={handleBack}
    >
      <div className="space-y-6">
        <SelectInput
          label="Faixa de Receita Anual"
          value={formData.annual_revenue_range}
          onChange={(value) =>
            setFormData({ ...formData, annual_revenue_range: value })
          }
          options={revenueRanges}
          placeholder="Selecione a faixa de receita"
          required
          error={errors.annual_revenue_range}
        />

        <SelectInput
          label="Principais Objetivos de Sustentabilidade"
          value={formData.sustainability_goals}
          onChange={(value) =>
            setFormData({ ...formData, sustainability_goals: value })
          }
          options={sustainabilityGoals}
          placeholder="Selecione seus objetivos"
          required
          error={errors.sustainability_goals}
        />

        <div className="bg-[#f0fdf4] rounded-lg p-4 border border-[#00e07f]">
          <p className="text-sm text-gray-700">
            💡 <strong>Dica:</strong> Você poderá ajustar esses objetivos a
            qualquer momento nas configurações da sua conta.
          </p>
        </div>

        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.submit}
          </div>
        )}

        <OnboardingButtons
          onNext={handleComplete}
          onBack={handleBack}
          nextLabel="Completar"
          isLoading={isLoading}
          isLastStep={true}
        />
      </div>
    </OnboardingLayout>
  );
}
