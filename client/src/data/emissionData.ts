// Dados para os selectboxes de combustíveis e outras opções

export const stationaryCombustionFuels = [
  { value: 'acetileno', label: 'Acetileno', unit: 'kg' },
  { value: 'alcatrao', label: 'Alcatrão', unit: 'm³' },
  { value: 'asfaltos', label: 'Asfaltos', unit: 'm³' },
  { value: 'bagaco_cana', label: 'Bagaço de Cana', unit: 'Toneladas' },
  { value: 'biodiesel', label: 'Biodiesel (B100)', unit: 'Litros' },
  { value: 'biogas_outros', label: 'Biogás (outros)', unit: 'Toneladas' },
  { value: 'biogas_aterro', label: 'Biogás de aterro', unit: 'Toneladas' },
  { value: 'biometano', label: 'Biometano', unit: 'Toneladas' },
  { value: 'caldo_cana', label: 'Caldo de Cana', unit: 'Toneladas' },
  { value: 'carvao_metalurgico_importado', label: 'Carvão Metalúrgico Importado', unit: 'Toneladas' },
  { value: 'carvao_metalurgico_nacional', label: 'Carvão Metalúrgico Nacional', unit: 'Toneladas' },
  { value: 'carvao_vapor_3100', label: 'Carvão Vapor 3100 kcal / kg', unit: 'Toneladas' },
  { value: 'carvao_vapor_3300', label: 'Carvão Vapor 3300 kcal / kg', unit: 'Toneladas' },
  { value: 'carvao_vapor_3700', label: 'Carvão Vapor 3700 kcal / kg', unit: 'Toneladas' },
  { value: 'carvao_vapor_4200', label: 'Carvão Vapor 4200 kcal / kg', unit: 'Toneladas' },
  { value: 'carvao_vapor_4500', label: 'Carvão Vapor 4500 kcal / kg', unit: 'Toneladas' },
  { value: 'carvao_vapor_4700', label: 'Carvão Vapor 4700 kcal / kg', unit: 'Toneladas' },
  { value: 'carvao_vapor_5200', label: 'Carvão Vapor 5200 kcal / kg', unit: 'Toneladas' },
  { value: 'carvao_vapor_5900', label: 'Carvão Vapor 5900 kcal / kg', unit: 'Toneladas' },
  { value: 'carvao_vapor_6000', label: 'Carvão Vapor 6000 kcal / kg', unit: 'Toneladas' },
  { value: 'carvao_vapor_sem_especificacao', label: 'Carvão Vapor sem Especificação', unit: 'Toneladas' },
  { value: 'carvao_vegetal', label: 'Carvão Vegetal', unit: 'Toneladas' },
  { value: 'coque_carvao_mineral', label: 'Coque de Carvão Mineral', unit: 'Toneladas' },
  { value: 'coque_petroleo', label: 'Coque de Petróleo', unit: 'm³' },
  { value: 'etanol_anidro', label: 'Etanol Anidro', unit: 'Litros' },
  { value: 'etanol_hidratado', label: 'Etanol Hidratado', unit: 'Litros' },
  { value: 'etano', label: 'Etano', unit: 'Toneladas' },
  { value: 'gasolina_automotiva', label: 'Gasolina Automotiva (pura)', unit: 'Litros' },
  { value: 'gasolina_aviacao', label: 'Gasolina de Aviação', unit: 'Litros' },
  { value: 'gas_coqueria', label: 'Gás de Coqueria', unit: 'Toneladas' },
  { value: 'gas_refinaria', label: 'Gás de Refinaria', unit: 'Toneladas' },
  { value: 'glp', label: 'Gás Liquefeito de Petróleo (GLP)', unit: 'Toneladas' },
  { value: 'gas_natural_seco', label: 'Gás Natural Seco', unit: 'm³' },
  { value: 'gas_natural_umido', label: 'Gás Natural Úmido', unit: 'm³' },
  { value: 'lenha_comercial', label: 'Lenha Comercial', unit: 'Toneladas' },
  { value: 'licor_negro', label: 'Licor Negro (Lixívia)', unit: 'Toneladas' },
  { value: 'lgn', label: 'Líquidos de Gás Natural (LGN)', unit: 'Toneladas' },
  { value: 'lubrificantes', label: 'Lubrificantes', unit: 'Litros' },
  { value: 'melaco', label: 'Melaço', unit: 'Toneladas' },
  { value: 'nafta', label: 'Nafta', unit: 'm³' },
  { value: 'oleo_combustivel', label: 'Óleo Combustível', unit: 'Litros' },
  { value: 'oleo_xisto', label: 'Óleo de Xisto', unit: 'Toneladas' },
  { value: 'oleo_diesel', label: 'Óleo Diesel (puro)', unit: 'Litros' },
  { value: 'oleos_residuais', label: 'Óleos Residuais', unit: 'Toneladas' },
  { value: 'outros_produtos_petroleo', label: 'Outros Produtos de Petróleo', unit: 'Toneladas' },
  { value: 'parafina', label: 'Parafina', unit: 'Toneladas' },
  { value: 'petroleo_bruto', label: 'Petróleo Bruto', unit: 'm³' },
  { value: 'querosene_aviacao', label: 'Querosene de Aviação', unit: 'Toneladas' },
  { value: 'querosene_iluminante', label: 'Querosene Iluminante', unit: 'Toneladas' },
  { value: 'residuos_industriais', label: 'Resíduos Industriais', unit: 'TJ' },
  { value: 'residuos_municipais_biomassa', label: 'Resíduos Municipais (fração biomassa)', unit: 'Toneladas' },
  { value: 'residuos_municipais_nao_biomassa', label: 'Resíduos Municipais (fração não-biomassa)', unit: 'Toneladas' },
  { value: 'residuos_vegetais', label: 'Resíduos Vegetais', unit: 'Toneladas' },
  { value: 'solventes', label: 'Solventes', unit: 'Litros' },
  { value: 'turfa', label: 'Turfa', unit: 'Toneladas' },
  { value: 'xisto_betuminoso', label: 'Xisto Betuminoso e Areias Betuminosas', unit: 'Toneladas' }
];

export const mobileCombustionVehicles = [
  { value: 'automovel_gasolina', label: 'Automóvel a gasolina', unit: 'Litros' },
  { value: 'automovel_etanol', label: 'Automóvel a etanol', unit: 'Litros' },
  { value: 'automovel_gnv', label: 'Automóvel a GNV', unit: 'm³' },
  { value: 'automovel_biometano', label: 'Automóvel a biometano', unit: 'm³' },
  { value: 'motocicleta_gasolina', label: 'Motocicleta a gasolina', unit: 'Litros' },
  { value: 'motocicleta_etanol', label: 'Motocicleta a etanol', unit: 'Litros' },
  { value: 'veiculo_comercial_leve_gasolina', label: 'Veículo comercial leve a gasolina', unit: 'Litros' },
  { value: 'veiculo_comercial_leve_etanol', label: 'Veículo comercial leve a etanol', unit: 'Litros' },
  { value: 'veiculo_comercial_leve_diesel', label: 'Veículo comercial leve a diesel', unit: 'Litros' },
  { value: 'micro_onibus_diesel', label: 'Micro-ônibus a diesel', unit: 'Litros' },
  { value: 'onibus_diesel', label: 'Ônibus a diesel', unit: 'Litros' },
  { value: 'caminhao_diesel', label: 'Caminhão a diesel', unit: 'Litros' }
];

export const fugitiveEmissionsGases = [
  { value: 'co2', label: 'Dióxido de carbono (CO₂)' },
  { value: 'ch4', label: 'Metano (CH₄)' },
  { value: 'n2o', label: 'Óxido nitroso (N₂O)' },
  { value: 'hfc23', label: 'HFC-23' },
  { value: 'hfc32', label: 'HFC-32' },
  { value: 'hfc41', label: 'HFC-41' },
  { value: 'hfc125', label: 'HFC-125' },
  { value: 'hfc134', label: 'HFC-134' },
  { value: 'hfc134a', label: 'HFC-134a' },
  { value: 'hfc143', label: 'HFC-143' },
  { value: 'hfc143a', label: 'HFC-143a' },
  { value: 'hfc152', label: 'HFC-152' },
  { value: 'hfc152a', label: 'HFC-152a' },
  { value: 'hfc161', label: 'HFC-161' },
  { value: 'hfc227ea', label: 'HFC-227ea' },
  { value: 'hfc236cb', label: 'HFC-236cb' },
  { value: 'hfc236ea', label: 'HFC-236ea' },
  { value: 'hfc236fa', label: 'HFC-236fa' },
  { value: 'hfc245ca', label: 'HFC-245ca' },
  { value: 'hfc245fa', label: 'HFC-245fa' },
  { value: 'hfc365mfc', label: 'HFC-365mfc' },
  { value: 'hfc4310mee', label: 'HFC-43-10mee' },
  { value: 'sf6', label: 'Hexafluoreto de enxofre (SF₆)' },
  { value: 'nf3', label: 'Trifluoreto de nitrogênio (NF₃)' },
  { value: 'pfc14', label: 'PFC-14' },
  { value: 'pfc116', label: 'PFC-116' },
  { value: 'pfc218', label: 'PFC-218' },
  { value: 'pfc318', label: 'PFC-318' },
  { value: 'pfc31110', label: 'PFC-3-1-10' },
  { value: 'pfc41112', label: 'PFC-4-1-12' },
  { value: 'pfc51114', label: 'PFC-5-1-14' },
  { value: 'pfc91118', label: 'PFC-9-1-18' },
  { value: 'trifluorometil_pentafluoreto_enxofre', label: 'Trifluorometil pentafluoreto de enxofre' },
  { value: 'perfluorociclopropano', label: 'Perfluorociclopropano' }
];

export const agricultureGases = [
  { value: 'co2', label: 'Dióxido de carbono (CO2)' },
  { value: 'ch4', label: 'Metano (CH4)' },
  { value: 'n2o', label: 'Óxido Nitroso (N2O)' }
];

export const landUseOptions = [
  { value: 'cultura_anual', label: 'Cultura anual' },
  { value: 'cultura_cana', label: 'Cultura de cana' },
  { value: 'cultura_perene', label: 'Cultura perene' },
  { value: 'pastagem', label: 'Pastagem' },
  { value: 'silvicultura', label: 'Silvicultura' },
  { value: 'vegetacao_natural', label: 'Vegetação natural' }
];

export const wasteTreatmentOptions = [
  { value: 'compostagem', label: 'Compostagem' },
  { value: 'outros', label: 'Outros' }
];

export const effluentTypes = [
  { value: 'refino_alcool', label: 'Efluentes do refino de álcool' },
  { value: 'producao_cerveja_malte', label: 'Efluentes da produção de cerveja e malte' },
  { value: 'processamento_peixes', label: 'Efluentes do processamento de peixes' },
  { value: 'producao_ferro_aco', label: 'Efluentes da produção de ferro e aço' },
  { value: 'producao_fertilizantes', label: 'Efluentes da produção de fertilizantes nitrogenados' },
  { value: 'producao_plasticos_resinas', label: 'Efluentes da produção de plásticos e resinas' },
  { value: 'producao_amido', label: 'Efluentes da produção de amido' }
];

export const transportTypes = [
  { value: 'rodoviario', label: 'Transporte Rodoviário' },
  { value: 'ferroviario', label: 'Transporte Ferroviário' },
  { value: 'aereo', label: 'Transporte Aéreo' }
];

export const railwayConcessions = [
  { value: 'media_nacional', label: 'Média nacional' },
  { value: 'allmn', label: 'ALLMN – América Latina Logística Malha Norte' },
  { value: 'allmo', label: 'ALLMO – América Latina Logística Malha Oeste' },
  { value: 'allmp', label: 'ALLMP – América Latina Logística Malha Paulista' },
  { value: 'allms', label: 'ALLMS – América Latina Logística Malha Sul' },
  { value: 'efc', label: 'EFC – Estrada de Ferro Carajás' },
  { value: 'efvm', label: 'EFVM – Estrada de Ferro Vitória a Minas' },
  { value: 'fca', label: 'FCA – Ferrovia Centro-Atlântica' },
  { value: 'ferroeste', label: 'FERROESTE – Estrada de Ferro Paraná–Oeste' },
  { value: 'ftc', label: 'FTC – Ferrovia Tereza Cristina' },
  { value: 'fns', label: 'FNS – Ferrovia Norte-Sul' },
  { value: 'mrs', label: 'MRS – MRS Logística' },
  { value: 'tnlsa', label: 'TNLSA – Transnordestina Logística' }
];

// Tipos de emissão por escopo
export const scope1EmissionTypes = [
  { value: 'combustao_estacionaria', label: 'Combustão Estacionária' },
  { value: 'combustao_movel', label: 'Combustão Móvel' },
  { value: 'emissoes_fugitivas', label: 'Emissões Fugitivas' },
  { value: 'processos_industriais', label: 'Processos Industriais' },
  { value: 'atividades_agricultura', label: 'Atividades de Agricultura' },
  { value: 'mudancas_uso_solo', label: 'Mudanças no Uso do Solo' },
  { value: 'residuos_solidos', label: 'Resíduos Sólidos' },
  { value: 'efluentes', label: 'Efluentes' }
];

export const scope2EmissionTypes = [
  { value: 'compra_energia_eletrica', label: 'Compra de Energia Elétrica' },
  { value: 'perdas_energia', label: 'Perdas de Energia' },
  { value: 'compra_energia_termica', label: 'Compra de Energia Térmica' }
];

export const scope3EmissionTypes = [
  { value: 'transporte_distribuicao', label: 'Transporte e Distribuição' },
  { value: 'residuos_solidos_gerados', label: 'Resíduos Sólidos Gerados' },
  { value: 'efluentes_gerados', label: 'Efluentes Gerados' },
  { value: 'viagens_negocios', label: 'Viagens a Negócios' }
];
