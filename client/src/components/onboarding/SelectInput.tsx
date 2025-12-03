'use client';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
  placeholder = 'Selecione uma opção',
  required = false,
  error,
}: SelectInputProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-[#002e34] mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-300 focus:border-[#00e07f]'
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
