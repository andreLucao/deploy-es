import { Search, Building2, Calendar, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface Emission {
  id: string;
  year: number;
  description: string;
  totalCo2e: number;
  scope1_total: number;
  scope2_total: number;
  scope3_total: number;
}

interface EmissionSelectorProps {
  emissions: Emission[];
  selectedEmissions: string[];
  onToggleEmission: (emissionId: string) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
}

export default function EmissionSelector({
  emissions,
  selectedEmissions,
  onToggleEmission,
  onSelectAll,
  onClearSelection
}: EmissionSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEmissions = emissions.filter(emission =>
    emission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emission.year.toString().includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5 text-[#008F70]" />
          <h2 className="text-xl font-semibold text-gray-800">Selecione as Emissões</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onSelectAll} 
            className="text-xs px-3 py-1 bg-[#008F70] text-white rounded-md hover:bg-[#007a5e] transition-colors"
          >
            Todas
          </button>
          <button 
            onClick={onClearSelection} 
            className="text-xs px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por ano ou descrição..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008F70] focus:border-transparent"
        />
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {filteredEmissions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Nenhuma emissão encontrada</div>
        ) : (
          filteredEmissions.map((emission) => (
            <button
              key={emission.id}
              onClick={() => onToggleEmission(emission.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedEmissions.includes(emission.id)
                  ? "border-[#008F70] bg-green-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold text-gray-800">{emission.year}</span>
                    {selectedEmissions.includes(emission.id) && (
                      <CheckCircle2 className="w-4 h-4 text-[#008F70]" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{emission.description}</p>
                  <div className="flex gap-3 text-xs">
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                      S1: {emission.scope1_total.toFixed(1)}
                    </span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                      S2: {emission.scope2_total.toFixed(1)}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                      S3: {emission.scope3_total.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-bold text-gray-800">
                    {emission.totalCo2e.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">tCO2e</div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
