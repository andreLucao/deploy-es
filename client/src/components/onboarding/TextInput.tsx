'use client';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'tel';
  error?: string;
  hint?: string;
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  error,
  hint,
}: TextInputProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-[#002e34] mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-300 focus:border-[#00e07f]'
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {hint && !error && <p className="text-gray-500 text-sm mt-1">{hint}</p>}
    </div>
  );
}
