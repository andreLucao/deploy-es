'use client';

interface OnboardingButtonsProps {
  onNext: () => void;
  onBack?: () => void;
  nextLabel?: string;
  backLabel?: string;
  isLoading?: boolean;
  isLastStep?: boolean;
}

export function OnboardingButtons({
  onNext,
  onBack,
  nextLabel = 'Próximo',
  backLabel = 'Voltar',
  isLoading = false,
  isLastStep = false,
}: OnboardingButtonsProps) {
  return (
    <div className="flex gap-4 mt-8">
      {onBack && (
        <button
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 px-6 py-3 border-2 border-gray-300 text-[#002e34] font-semibold rounded-lg hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {backLabel}
        </button>
      )}
      <button
        onClick={onNext}
        disabled={isLoading}
        className="flex-1 px-6 py-3 bg-[#00e07f] text-white font-semibold rounded-lg hover:bg-[#00c96b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Carregando...
          </>
        ) : (
          <>
            {isLastStep ? 'Completar' : nextLabel}
            {!isLastStep && '→'}
          </>
        )}
      </button>
    </div>
  );
}
