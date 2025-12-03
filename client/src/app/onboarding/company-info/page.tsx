'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { TextInput } from '@/components/onboarding/TextInput';
import { SelectInput } from '@/components/onboarding/SelectInput';
import { OnboardingButtons } from '@/components/onboarding/OnboardingButtons';

const countries = [
  { value: 'BR', label: 'Brasil' },
  { value: 'US', label: 'Estados Unidos' },
  { value: 'MX', label: 'México' },
  { value: 'AR', label: 'Argentina' },
  { value: 'CL', label: 'Chile' },
  { value: 'ES', label: 'Espanha' },
  { value: 'PT', label: 'Portugal' },
  { value: 'OTHER', label: 'Outro' },
];

export default function CompanyInfoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company_name: '',
    country: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.company_name.trim()) {
      newErrors.company_name = 'Nome da empresa é obrigatório';
    }

    if (!formData.country) {
      newErrors.country = 'País é obrigatório';
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
            company_name: formData.company_name,
            country: formData.country,
          }),
        }
      );

      if (response.ok) {
        router.push('/onboarding/company-type');
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
    router.push('/onboarding');
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={4}
      title="Informações da Empresa"
      description="Conte-nos sobre sua organização"
      onBack={handleBack}
    >
      <div className="space-y-6">
        <TextInput
          label="Nome da Empresa"
          value={formData.company_name}
          onChange={(value) => setFormData({ ...formData, company_name: value })}
          placeholder="Ex: Tech Solutions Ltda"
          required
          error={errors.company_name}
        />

        <SelectInput
          label="País"
          value={formData.country}
          onChange={(value) => setFormData({ ...formData, country: value })}
          options={countries}
          required
          error={errors.country}
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
