'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { SelectInput } from '@/components/onboarding/SelectInput';
import { OnboardingButtons } from '@/components/onboarding/OnboardingButtons';

const companyTypes = [
  { value: 'startup', label: 'Startup' },
  { value: 'pme', label: 'Pequena e Média Empresa (PME)' },
  { value: 'large', label: 'Grande Empresa' },
  { value: 'nonprofit', label: 'Organização sem fins lucrativos' },
  { value: 'government', label: 'Governo' },
  { value: 'other', label: 'Outro' },
];

const industries = [
  { value: 'technology', label: 'Tecnologia' },
  { value: 'finance', label: 'Finanças' },
  { value: 'retail', label: 'Varejo' },
  { value: 'manufacturing', label: 'Manufatura' },
  { value: 'energy', label: 'Energia' },
  { value: 'agriculture', label: 'Agricultura' },
  { value: 'transportation', label: 'Transporte' },
  { value: 'healthcare', label: 'Saúde' },
  { value: 'education', label: 'Educação' },
  { value: 'construction', label: 'Construção' },
  { value: 'other', label: 'Outro' },
];

export default function CompanyTypePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company_type: '',
    industry: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.company_type) {
      newErrors.company_type = 'Tipo de empresa é obrigatório';
    }

    if (!formData.industry) {
      newErrors.industry = 'Indústria é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/onboarding/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            company_type: formData.company_type,
            industry: formData.industry,
          }),
        }
      );

      if (response.ok) {
        router.push('/onboarding/goals');
      } else {
        const error = await response.json();
        setErrors({ submit: error.error || 'Erro ao salvar dados' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ submit: 'Erro ao salvar dados. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/onboarding/company-info');
  };

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={4}
      title="Tipo de Empresa e Indústria"
      description="Ajude-nos a entender melhor seu negócio"
      onBack={handleBack}
    >
      <div className="space-y-6">
        <SelectInput
          label="Tipo de Empresa"
          value={formData.company_type}
          onChange={(value) => setFormData({ ...formData, company_type: value })}
          options={companyTypes}
          placeholder="Selecione o tipo de empresa"
          required
          error={errors.company_type}
        />

        <SelectInput
          label="Indústria"
          value={formData.industry}
          onChange={(value) => setFormData({ ...formData, industry: value })}
          options={industries}
          placeholder="Selecione a indústria"
          required
          error={errors.industry}
        />

        {errors.submit && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {errors.submit}
          </div>
        )}

        <OnboardingButtons
          onNext={handleNext}
          onBack={handleBack}
          isLoading={isLoading}
        />
      </div>
    </OnboardingLayout>
  );
}
