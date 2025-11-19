/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

interface SelectBoxProps {
  options: { value: string; label: string; unit?: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SelectBox = ({ options, value, onChange, placeholder, className = "" }: SelectBoxProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F70] focus:border-transparent transition-all duration-200 bg-white hover:border-[#008F70] cursor-pointer ${className} ${value ? 'text-gray-900' : 'text-gray-500'}`}
    >
      <option value="" disabled>{placeholder || "Selecione uma opção"}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-gray-900">
          {option.label}
        </option>
      ))}
    </select>
  );
};

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  unit?: string;
  required?: boolean;
  className?: string;
}

export const InputField = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder, 
  unit, 
  required = false,
  className = ""
}: InputFieldProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        <input
          type={type}
          value={value}
          onChange={(e) => {
            if (type === 'number') {
              let val = e.target.value;
              // Substitui vírgula por ponto
              val = val.replace(',', '.');
              
              // Permite string vazia, valores parciais como "0.", "0,", ou números válidos
              if (val === '' || val === '0' || val === '0.' || !isNaN(Number(val))) {
                onChange(val === '' ? 0 : val);
              }
            } else {
              onChange(e.target.value);
            }
          }}
          placeholder={placeholder}
          required={required}
          step={type === 'number' ? '0.01' : undefined}
          min={type === 'number' ? '0' : undefined}
          className={`w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F70] focus:border-transparent transition-all duration-200 hover:border-[#008F70] ${unit ? 'pr-28' : 'pr-3'}`}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium bg-gray-50 px-2 py-1 rounded border border-gray-200">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

interface EmissionFormProps {
  emissionId: string;
  emissionType: string;
  onUpdate: (data: any) => void;
  onRemove: () => void;
  initialData?: any;
}

export const EmissionForm = ({ emissionType, onUpdate, onRemove, initialData }: EmissionFormProps) => {
  const [formData, setFormData] = useState(initialData || {});

  const updateField = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onUpdate(newData);
  };

  const renderFormFields = () => {
    if (!emissionType) {
      return <div>Erro: Tipo de emissão não encontrado</div>;
    }
    
    switch (emissionType) {
      case 'combustao_estacionaria':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Descrição"
              value={formData.description || ''}
              onChange={(value) => updateField('description', value)}
              placeholder="Descreva a atividade"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Combustível <span className="text-red-500">*</span>
              </label>
              <SelectBox
                options={stationaryCombustionFuels}
                value={formData.fuel || ''}
                onChange={(value) => updateField('fuel', value)}
                placeholder="Selecione o combustível"
              />
            </div>
            <InputField
              label="Quantidade consumida"
              value={formData.quantity || ''}
              onChange={(value) => updateField('quantity', value)}
              type="number"
              placeholder="0"
              unit={stationaryCombustionFuels.find(f => f.value === formData.fuel)?.unit || 'Selecione o combustível'}
              required
            />
          </div>
        );

      case 'combustao_movel':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Descrição"
              value={formData.description || ''}
              onChange={(value) => updateField('description', value)}
              placeholder="Descreva a atividade"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Veículo <span className="text-red-500">*</span>
              </label>
              <SelectBox
                options={mobileCombustionVehicles}
                value={formData.vehicle || ''}
                onChange={(value) => updateField('vehicle', value)}
                placeholder="Selecione o tipo de veículo"
              />
            </div>
            <InputField
              label="Quantidade consumida"
              value={formData.quantity || ''}
              onChange={(value) => updateField('quantity', value)}
              type="number"
              placeholder="0"
              unit={mobileCombustionVehicles.find(v => v.value === formData.vehicle)?.unit || 'Selecione o veículo'}
              required
            />
          </div>
        );

      case 'emissoes_fugitivas':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Descrição"
              value={formData.description || ''}
              onChange={(value) => updateField('description', value)}
              placeholder="Descreva a atividade"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gás ou Composto <span className="text-red-500">*</span>
              </label>
              <SelectBox
                options={fugitiveEmissionsGases}
                value={formData.gas || ''}
                onChange={(value) => updateField('gas', value)}
                placeholder="Selecione o gás"
              />
            </div>
            <InputField
              label="Carga (unidades novas)"
              value={formData.newUnitsLoad || ''}
              onChange={(value) => updateField('newUnitsLoad', value)}
              type="number"
              placeholder="0"
              unit="Kg"
            />
            <InputField
              label="Capacidade (unidades novas)"
              value={formData.newUnitsCapacity || ''}
              onChange={(value) => updateField('newUnitsCapacity', value)}
              type="number"
              placeholder="0"
              unit="Kg"
            />
            <InputField
              label="Recarga (unidades existentes)"
              value={formData.existingUnitsRecharge || ''}
              onChange={(value) => updateField('existingUnitsRecharge', value)}
              type="number"
              placeholder="0"
              unit="Kg"
            />
            <InputField
              label="Capacidade (unidades dispensadas)"
              value={formData.discardedUnitsCapacity || ''}
              onChange={(value) => updateField('discardedUnitsCapacity', value)}
              type="number"
              placeholder="0"
              unit="Kg"
            />
            <InputField
              label="Recuperada (unidades dispensadas)"
              value={formData.discardedUnitsRecovered || ''}
              onChange={(value) => updateField('discardedUnitsRecovered', value)}
              type="number"
              placeholder="0"
              unit="Kg"
            />
          </div>
        );

      case 'processos_industriais':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Descrição"
              value={formData.description || ''}
              onChange={(value) => updateField('description', value)}
              placeholder="Descreva o processo"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gás Emitido <span className="text-red-500">*</span>
              </label>
              <SelectBox
                options={fugitiveEmissionsGases}
                value={formData.gas || ''}
                onChange={(value) => updateField('gas', value)}
                placeholder="Selecione o gás"
              />
            </div>
            <InputField
              label="Quantidade emitida"
              value={formData.quantity || ''}
              onChange={(value) => updateField('quantity', value)}
              type="number"
              placeholder="0"
              unit="Toneladas"
              required
            />
          </div>
        );

      case 'atividades_agricultura':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Descrição"
              value={formData.description || ''}
              onChange={(value) => updateField('description', value)}
              placeholder="Descreva a atividade"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gás Emitido <span className="text-red-500">*</span>
              </label>
              <SelectBox
                options={agricultureGases}
                value={formData.gas || ''}
                onChange={(value) => updateField('gas', value)}
                placeholder="Selecione o gás"
              />
            </div>
            <InputField
              label="Quantidade emitida"
              value={formData.quantity || ''}
              onChange={(value) => updateField('quantity', value)}
              type="number"
              placeholder="0"
              unit="Toneladas"
              required
            />
          </div>
        );

      case 'mudancas_uso_solo':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Descrição"
              value={formData.description || ''}
              onChange={(value) => updateField('description', value)}
              placeholder="Descreva a mudança"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uso Anterior do Solo <span className="text-red-500">*</span>
              </label>
              <SelectBox
                options={landUseOptions}
                value={formData.previousUse || ''}
                onChange={(value) => updateField('previousUse', value)}
                placeholder="Selecione o uso anterior"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Uso Posterior do Solo <span className="text-red-500">*</span>
              </label>
              <SelectBox
                options={landUseOptions}
                value={formData.posteriorUse || ''}
                onChange={(value) => updateField('posteriorUse', value)}
                placeholder="Selecione o uso posterior"
              />
            </div>
            <InputField
              label="Área Convertida"
              value={formData.area || ''}
              onChange={(value) => updateField('area', value)}
              type="number"
              placeholder="0"
              unit="Hectares"
              required
            />
          </div>
        );

      case 'residuos_solidos':
      case 'residuos_solidos_gerados':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Descrição"
              value={formData.description || ''}
              onChange={(value) => updateField('description', value)}
              placeholder="Descreva o tratamento"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Tratamento <span className="text-red-500">*</span>
              </label>
              <SelectBox
                options={wasteTreatmentOptions}
                value={formData.treatment || ''}
                onChange={(value) => updateField('treatment', value)}
                placeholder="Selecione o tratamento"
              />
            </div>
            {formData.treatment === 'compostagem' && (
              <InputField
                label="Massa destinada ao tratamento"
                value={formData.mass || ''}
                onChange={(value) => updateField('mass', value)}
                type="number"
                placeholder="0"
                unit="Toneladas/ano"
                required
              />
            )}
            {formData.treatment === 'outros' && (
              <InputField
                label="Emissão CO2"
                value={formData.co2Emission || ''}
                onChange={(value) => updateField('co2Emission', value)}
                type="number"
                placeholder="0"
                unit="Toneladas"
                required
              />
            )}
          </div>
        );

      case 'efluentes':
      case 'efluentes_gerados':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Descrição"
              value={formData.description || ''}
              onChange={(value) => updateField('description', value)}
              placeholder="Descreva o efluente"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Efluente <span className="text-red-500">*</span>
              </label>
              <SelectBox
                options={effluentTypes}
                value={formData.effluentType || ''}
                onChange={(value) => updateField('effluentType', value)}
                placeholder="Selecione o tipo de efluente"
              />
            </div>
            <InputField
              label="Quantidade lançada ao ambiente"
              value={formData.quantity || ''}
              onChange={(value) => updateField('quantity', value)}
              type="number"
              placeholder="0"
              unit="m³/ano"
              required
            />
          </div>
        );

      case 'compra_energia_eletrica':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Descrição"
              value={formData.description || ''}
              onChange={(value) => updateField('description', value)}
              placeholder="Descreva a compra"
              required
            />
            <InputField
              label="Compra anual de eletricidade"
              value={formData.annualPurchase || ''}
              onChange={(value) => updateField('annualPurchase', value)}
              type="number"
              placeholder="0"
              unit="MWh"
              required
            />
          </div>
        );

      case 'perdas_energia':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Descrição"
              value={formData.description || ''}
              onChange={(value) => updateField('description', value)}
              placeholder="Descreva as perdas"
              required
            />
            <InputField
              label="Perda anual de eletricidade"
              value={formData.annualLoss || ''}
              onChange={(value) => updateField('annualLoss', value)}
              type="number"
              placeholder="0"
              unit="MWh"
              required
            />
          </div>
        );

      case 'compra_energia_termica':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Descrição"
              value={formData.description || ''}
              onChange={(value) => updateField('description', value)}
              placeholder="Descreva a compra"
              required
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Combustível <span className="text-red-500">*</span>
              </label>
              <SelectBox
                options={stationaryCombustionFuels}
                value={formData.fuel || ''}
                onChange={(value) => updateField('fuel', value)}
                placeholder="Selecione o combustível"
              />
            </div>
            <InputField
              label="Eficiência do fervedor"
              value={formData.efficiency || ''}
              onChange={(value) => updateField('efficiency', value)}
              type="number"
              placeholder="0"
              unit="%"
              required
            />
            <InputField
              label="Valor Comprado"
              value={formData.valuePurchased || ''}
              onChange={(value) => updateField('valuePurchased', value)}
              type="number"
              placeholder="0"
              unit="GJ"
              required
            />
          </div>
        );

      case 'transporte_distribuicao':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Descrição"
                value={formData.description || ''}
                onChange={(value) => updateField('description', value)}
                placeholder="Descreva o transporte"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Transporte <span className="text-red-500">*</span>
                </label>
                <SelectBox
                  options={transportTypes}
                  value={formData.transportType || ''}
                  onChange={(value) => updateField('transportType', value)}
                  placeholder="Selecione o tipo"
                />
              </div>
            </div>

            {formData.transportType === 'rodoviario' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Veículo <span className="text-red-500">*</span>
                  </label>
                  <SelectBox
                    options={mobileCombustionVehicles}
                    value={formData.vehicle || ''}
                    onChange={(value) => updateField('vehicle', value)}
                    placeholder="Selecione o veículo"
                  />
                </div>
                <InputField
                  label="Consumo anual"
                  value={formData.annualConsumption || ''}
                  onChange={(value) => updateField('annualConsumption', value)}
                  type="number"
                  placeholder="0"
                  unit={mobileCombustionVehicles.find(v => v.value === formData.vehicle)?.unit || 'Unidade'}
                  required
                />
              </div>
            )}

            {formData.transportType === 'ferroviario' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Concessionária <span className="text-red-500">*</span>
                  </label>
                  <SelectBox
                    options={railwayConcessions}
                    value={formData.concession || ''}
                    onChange={(value) => updateField('concession', value)}
                    placeholder="Selecione a concessionária"
                  />
                </div>
                <InputField
                  label="Distância percorrida"
                  value={formData.distance || ''}
                  onChange={(value) => updateField('distance', value)}
                  type="number"
                  placeholder="0"
                  unit="Km"
                  required
                />
                <InputField
                  label="Carga transportada"
                  value={formData.cargo || ''}
                  onChange={(value) => updateField('cargo', value)}
                  type="number"
                  placeholder="0"
                  unit="Tonelada"
                  required
                />
              </div>
            )}

            {formData.transportType === 'aereo' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Distância percorrida"
                  value={formData.distance || ''}
                  onChange={(value) => updateField('distance', value)}
                  type="number"
                  placeholder="0"
                  unit="Km"
                  required
                />
                <InputField
                  label="Carga transportada"
                  value={formData.cargo || ''}
                  onChange={(value) => updateField('cargo', value)}
                  type="number"
                  placeholder="0"
                  unit="Tonelada"
                  required
                />
              </div>
            )}
          </div>
        );

      case 'viagens_negocios':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Descrição"
                value={formData.description || ''}
                onChange={(value) => updateField('description', value)}
                placeholder="Descreva as viagens"
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Transporte <span className="text-red-500">*</span>
                </label>
                <SelectBox
                  options={transportTypes.filter(t => t.value !== 'ferroviario')}
                  value={formData.transportType || ''}
                  onChange={(value) => updateField('transportType', value)}
                  placeholder="Selecione o tipo"
                />
              </div>
            </div>

            {formData.transportType === 'rodoviario' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Veículo <span className="text-red-500">*</span>
                  </label>
                  <SelectBox
                    options={mobileCombustionVehicles}
                    value={formData.vehicle || ''}
                    onChange={(value) => updateField('vehicle', value)}
                    placeholder="Selecione o veículo"
                  />
                </div>
                <InputField
                  label="Consumo anual"
                  value={formData.annualConsumption || ''}
                  onChange={(value) => updateField('annualConsumption', value)}
                  type="number"
                  placeholder="0"
                  unit={mobileCombustionVehicles.find(v => v.value === formData.vehicle)?.unit || 'Unidade'}
                  required
                />
              </div>
            )}

            {formData.transportType === 'aereo' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Distância percorrida"
                  value={formData.distance || ''}
                  onChange={(value) => updateField('distance', value)}
                  type="number"
                  placeholder="0"
                  unit="Km"
                  required
                />
                <InputField
                  label="Carga transportada"
                  value={formData.cargo || ''}
                  onChange={(value) => updateField('cargo', value)}
                  type="number"
                  placeholder="0"
                  unit="Tonelada"
                  required
                />
              </div>
            )}
          </div>
        );

      default:
        return <div>Tipo de emissão não reconhecido</div>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 space-y-4">
      <div className="flex justify-between items-center pb-3 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#008F70]"></span>
          {emissionType ? emissionType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Tipo de Emissão'}
        </h3>
        <button
          onClick={onRemove}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
          title="Remover emissão"
        >
          <Trash2 size={20} />
        </button>
      </div>
      {renderFormFields()}
    </div>
  );
};

// Importar dados necessários
import {
  stationaryCombustionFuels,
  mobileCombustionVehicles,
  fugitiveEmissionsGases,
  agricultureGases,
  landUseOptions,
  wasteTreatmentOptions,
  effluentTypes,
  transportTypes,
  railwayConcessions
} from '@/data/emissionData';
