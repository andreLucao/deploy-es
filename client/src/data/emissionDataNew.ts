/**
 * NOVO: Dados de emissão baseados nos produtos REAIS do banco de dados
 * Estes dados substituem os antigos valores genéricos
 * Os produtos aqui correspondem exatamente aos nomes na tabela emission_products
 */

// ESCOPO 1 - Emissões Diretas
export const scope1EmissionTypes = [
  // Combustão Móvel
  { value: 'Gasolina', label: 'Gasolina', category: 'Combustão Móvel', unit: 'Litros' },
  { value: 'Diesel', label: 'Diesel', category: 'Combustão Móvel', unit: 'Litros' },
  { value: 'Etanol', label: 'Etanol', category: 'Combustão Móvel', unit: 'Litros' },
  { value: 'GNV', label: 'GNV (Gás Natural Veicular)', category: 'Combustão Móvel', unit: 'm³' },
  { value: 'Biodiesel', label: 'Biodiesel', category: 'Combustão Móvel', unit: 'Litros' },
  
  // Combustão Estacionária
  { value: 'Gás Natural', label: 'Gás Natural', category: 'Combustão Estacionária', unit: 'm³' },
  { value: 'GLP', label: 'GLP (Gás Liquefeito de Petróleo)', category: 'Combustão Estacionária', unit: 'kg' },
  { value: 'Óleo Combustível', label: 'Óleo Combustível', category: 'Combustão Estacionária', unit: 'Litros' },
  { value: 'Carvão Mineral', label: 'Carvão Mineral', category: 'Combustão Estacionária', unit: 'kg' },
  { value: 'Lenha', label: 'Lenha', category: 'Combustão Estacionária', unit: 'kg' },
  
  // Emissões Fugitivas (Refrigeração/Ar Condicionado)
  { value: 'R-22', label: 'R-22 (Refrigeração)', category: 'Emissões Fugitivas', unit: 'kg' },
  { value: 'R-134a', label: 'R-134a (Refrigeração)', category: 'Emissões Fugitivas', unit: 'kg' },
  { value: 'R-404A', label: 'R-404A (Refrigeração)', category: 'Emissões Fugitivas', unit: 'kg' },
  { value: 'R-410A', label: 'R-410A (Ar Condicionado)', category: 'Emissões Fugitivas', unit: 'kg' },
];

// ESCOPO 2 - Emissões Indiretas de Energia
export const scope2EmissionTypes = [
  { value: 'Energia Elétrica', label: 'Energia Elétrica (Nacional)', region: 'BR-Nacional', unit: 'kWh' },
  { value: 'Energia Elétrica', label: 'Energia Elétrica (Sudeste)', region: 'BR-Sudeste', unit: 'kWh' },
  { value: 'Energia Elétrica', label: 'Energia Elétrica (Sul)', region: 'BR-Sul', unit: 'kWh' },
  { value: 'Energia Elétrica', label: 'Energia Elétrica (Nordeste)', region: 'BR-Nordeste', unit: 'kWh' },
  { value: 'Energia Elétrica', label: 'Energia Elétrica (Norte)', region: 'BR-Norte', unit: 'kWh' },
  { value: 'Energia Elétrica', label: 'Energia Elétrica (Centro-Oeste)', region: 'BR-Centro-Oeste', unit: 'kWh' },
];

// ESCOPO 3 - Outras Emissões Indiretas
export const scope3EmissionTypes = [
  // Transporte e Logística
  { value: 'Transporte Rodoviário', label: 'Transporte Rodoviário', category: 'Transporte e Logística', unit: 'km' },
  { value: 'Transporte Aéreo', label: 'Transporte Aéreo', category: 'Transporte e Logística', unit: 'km' },
  { value: 'Transporte Marítimo', label: 'Transporte Marítimo', category: 'Transporte e Logística', unit: 'km' },
  { value: 'Transporte Ferroviário', label: 'Transporte Ferroviário', category: 'Transporte e Logística', unit: 'km' },
  
  // Gestão de Resíduos
  { value: 'Resíduos Orgânicos', label: 'Resíduos Orgânicos', category: 'Gestão de Resíduos', unit: 'kg' },
  { value: 'Resíduos Recicláveis', label: 'Resíduos Recicláveis', category: 'Gestão de Resíduos', unit: 'kg' },
  { value: 'Resíduos Perigosos', label: 'Resíduos Perigosos', category: 'Gestão de Resíduos', unit: 'kg' },
  
  // Água e Efluentes
  { value: 'Água Tratada', label: 'Água Tratada (Consumo)', category: 'Água e Efluentes', unit: 'm³' },
  { value: 'Efluentes', label: 'Efluentes (Tratamento)', category: 'Água e Efluentes', unit: 'm³' },
  
  // Materiais de Escritório
  { value: 'Papel A4', label: 'Papel A4 (Virgem)', category: 'Materiais de Escritório', unit: 'kg' },
  { value: 'Papel Reciclado', label: 'Papel Reciclado', category: 'Materiais de Escritório', unit: 'kg' },
];

/**
 * Retorna todos os tipos de emissão de um escopo específico
 */
export function getEmissionTypesByScope(scope: 1 | 2 | 3) {
  switch (scope) {
    case 1:
      return scope1EmissionTypes;
    case 2:
      return scope2EmissionTypes;
    case 3:
      return scope3EmissionTypes;
    default:
      return [];
  }
}

/**
 * Agrupa tipos de emissão por categoria
 */
export function groupEmissionTypesByCategory(scope: 1 | 2 | 3) {
  const types = getEmissionTypesByScope(scope);
  const grouped = new Map<string, Array<typeof types[number]>>();

  types.forEach(type => {
    const category = 'category' in type ? type.category : 'Energia';
    if (!grouped.has(category!)) {
      grouped.set(category!, []);
    }
    grouped.get(category!)!.push(type);
  });

  return Array.from(grouped.entries()).map(([category, items]) => ({
    category,
    items
  }));
}

/**
 * LEGADO: Mantido para compatibilidade com código antigo
 * @deprecated Use getEmissionTypesByScope() ao invés disso
 */
export const stationaryCombustionFuels = scope1EmissionTypes.filter(t => 
  'category' in t && t.category === 'Combustão Estacionária'
);

/**
 * LEGADO: Mantido para compatibilidade
 * @deprecated Use getEmissionTypesByScope() ao invés disso
 */
export const mobileCombustionVehicles = scope1EmissionTypes.filter(t => 
  'category' in t && t.category === 'Combustão Móvel'
);

/**
 * LEGADO: Mantido para compatibilidade
 * @deprecated Use getEmissionTypesByScope() ao invés disso
 */
export const fugitiveEmissionsGases = scope1EmissionTypes.filter(t => 
  'category' in t && t.category === 'Emissões Fugitivas'
);
