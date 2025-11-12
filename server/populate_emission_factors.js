/**
 * Script para popular tabela emission_factors com dados básicos
 * Execute com: node populate_emission_factors.js
 */

const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

// Fatores de emissão baseados no GHG Protocol e IPCC
const emissionFactorsData = [
  // ESCOPO 1 - Combustão Móvel
  { productName: 'Gasolina', unit: 'Litros', scope: '1', factorValue: 2.27, region: 'BR', year: 2024 },
  { productName: 'Diesel', unit: 'Litros', scope: '1', factorValue: 2.68, region: 'BR', year: 2024 },
  { productName: 'Etanol', unit: 'Litros', scope: '1', factorValue: 1.52, region: 'BR', year: 2024 },
  { productName: 'GNV', unit: 'm³', scope: '1', factorValue: 2.10, region: 'BR', year: 2024 },
  { productName: 'Biodiesel', unit: 'Litros', scope: '1', factorValue: 2.54, region: 'BR', year: 2024 },
  
  // ESCOPO 1 - Combustão Estacionária
  { productName: 'Gás Natural', unit: 'm³', scope: '1', factorValue: 2.34, region: 'BR', year: 2024 },
  { productName: 'GLP', unit: 'kg', scope: '1', factorValue: 2.99, region: 'BR', year: 2024 },
  { productName: 'Óleo Combustível', unit: 'Litros', scope: '1', factorValue: 3.14, region: 'BR', year: 2024 },
  { productName: 'Carvão Mineral', unit: 'kg', scope: '1', factorValue: 2.42, region: 'BR', year: 2024 },
  { productName: 'Lenha', unit: 'kg', scope: '1', factorValue: 1.83, region: 'BR', year: 2024 },
  
  // ESCOPO 1 - Emissões Fugitivas
  { productName: 'R-22', unit: 'kg', scope: '1', factorValue: 1810, region: 'Global', year: 2024 },
  { productName: 'R-134a', unit: 'kg', scope: '1', factorValue: 1430, region: 'Global', year: 2024 },
  { productName: 'R-404A', unit: 'kg', scope: '1', factorValue: 3922, region: 'Global', year: 2024 },
  { productName: 'R-410A', unit: 'kg', scope: '1', factorValue: 2088, region: 'Global', year: 2024 },
  
  // ESCOPO 2 - Energia Elétrica (por região do Brasil)
  { productName: 'Energia Elétrica', unit: 'kWh', scope: '2', factorValue: 0.0817, region: 'BR-Nacional', year: 2024 },
  { productName: 'Energia Elétrica', unit: 'kWh', scope: '2', factorValue: 0.0654, region: 'BR-Sudeste', year: 2024 },
  { productName: 'Energia Elétrica', unit: 'kWh', scope: '2', factorValue: 0.0712, region: 'BR-Sul', year: 2024 },
  { productName: 'Energia Elétrica', unit: 'kWh', scope: '2', factorValue: 0.0932, region: 'BR-Nordeste', year: 2024 },
  { productName: 'Energia Elétrica', unit: 'kWh', scope: '2', factorValue: 0.0458, region: 'BR-Norte', year: 2024 },
  { productName: 'Energia Elétrica', unit: 'kWh', scope: '2', factorValue: 0.0843, region: 'BR-Centro-Oeste', year: 2024 },
  
  // ESCOPO 3 - Transporte e Logística
  { productName: 'Transporte Rodoviário', unit: 'km', scope: '3', factorValue: 0.12, region: 'BR', year: 2024 },
  { productName: 'Transporte Aéreo', unit: 'km', scope: '3', factorValue: 0.25, region: 'Global', year: 2024 },
  { productName: 'Transporte Marítimo', unit: 'km', scope: '3', factorValue: 0.011, region: 'Global', year: 2024 },
  { productName: 'Transporte Ferroviário', unit: 'km', scope: '3', factorValue: 0.028, region: 'BR', year: 2024 },
  
  // ESCOPO 3 - Resíduos
  { productName: 'Resíduos Orgânicos', unit: 'kg', scope: '3', factorValue: 0.42, region: 'BR', year: 2024 },
  { productName: 'Resíduos Recicláveis', unit: 'kg', scope: '3', factorValue: 0.015, region: 'BR', year: 2024 },
  { productName: 'Resíduos Perigosos', unit: 'kg', scope: '3', factorValue: 0.98, region: 'BR', year: 2024 },
  
  // ESCOPO 3 - Água e Efluentes
  { productName: 'Água Tratada', unit: 'm³', scope: '3', factorValue: 0.21, region: 'BR', year: 2024 },
  { productName: 'Efluentes', unit: 'm³', scope: '3', factorValue: 0.35, region: 'BR', year: 2024 },
  
  // ESCOPO 3 - Papel
  { productName: 'Papel A4', unit: 'kg', scope: '3', factorValue: 1.29, region: 'Global', year: 2024 },
  { productName: 'Papel Reciclado', unit: 'kg', scope: '3', factorValue: 0.67, region: 'Global', year: 2024 }
];

async function populateEmissionFactors() {
  console.log('🚀 Iniciando população de fatores de emissão...\n');

  let created = 0;
  let errors = 0;

  for (const data of emissionFactorsData) {
    try {
      // Buscar ou criar produto
      let product = await prisma.emissionProduct.findUnique({
        where: { name: data.productName }
      });

      if (!product) {
        product = await prisma.emissionProduct.create({
          data: {
            name: data.productName,
            unit: data.unit,
            scope: data.scope
          }
        });
        console.log(`  ✓ Produto criado: ${data.productName}`);
      }

      // Verificar se já existe fator para este produto/região/ano
      const existingFactor = await prisma.emissionFactor.findFirst({
        where: {
          emissionProductId: product.id,
          region: data.region,
          year: data.year
        }
      });

      if (!existingFactor) {
        await prisma.emissionFactor.create({
          data: {
            emissionProductId: product.id,
            region: data.region,
            year: data.year,
            factorValue: data.factorValue
          }
        });
        console.log(`  ✓ Fator criado: ${data.productName} (${data.region}) = ${data.factorValue} kg CO2e/${data.unit}`);
        created++;
      } else {
        console.log(`  ⊘ Fator já existe: ${data.productName} (${data.region})`);
      }

    } catch (error) {
      console.error(`  ✗ Erro ao processar ${data.productName}:`, error.message);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`✅ População concluída!`);
  console.log(`   - Fatores criados: ${created}`);
  console.log(`   - Erros: ${errors}`);
  console.log(`   - Total processado: ${emissionFactorsData.length}`);
  console.log('='.repeat(80) + '\n');
}

populateEmissionFactors()
  .catch(e => {
    console.error('❌ Erro fatal:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
