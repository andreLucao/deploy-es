'use client';

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  rows?: number;
  maxLength?: number;
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  rows = 4,
  maxLength,
}: TextAreaProps) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start mb-2">
        <label className="block text-sm font-semibold text-[#002e34]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {maxLength && (
          <span className="text-gray-500 text-sm">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none ${
          error
            ? 'border-red-500 focus:border-red-600'
            : 'border-gray-300 focus:border-[#00e07f]'
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
