const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Populando fatores de emissão...\n');

  // Fatores de emissão por tipo (valores científicos baseados em IPCC e GHG Protocol)
  const emissionFactors = [
    // ESCOPO 1
    
    // Emissões Fugitivas - Gases de efeito estufa
    {
      productName: 'CH4 Fugitivo',
      category: 'Emissões Fugitivas',
      unit: 'kg',
      factorValue: 25.0, // GWP do CH4
      year: 2025,
      source: 'IPCC AR5'
    },
    {
      productName: 'N2O Fugitivo',
      category: 'Emissões Fugitivas',
      unit: 'kg',
      factorValue: 298.0, // GWP do N2O
      year: 2025,
      source: 'IPCC AR5'
    },
    {
      productName: 'HFC-134a',
      category: 'Emissões Fugitivas',
      unit: 'kg',
      factorValue: 1430.0, // GWP do HFC-134a
      year: 2025,
      source: 'IPCC AR5'
    },
    {
      productName: 'SF6',
      category: 'Emissões Fugitivas',
      unit: 'kg',
      factorValue: 22800.0, // GWP do SF6
      year: 2025,
      source: 'IPCC AR5'
    },
    
    // Processos Industriais
    {
      productName: 'CH4 Industrial',
      category: 'Processos Industriais',
      unit: 'kg',
      factorValue: 25.0,
      year: 2025,
      source: 'IPCC AR5'
    },
    {
      productName: 'N2O Industrial',
      category: 'Processos Industriais',
      unit: 'kg',
      factorValue: 298.0,
      year: 2025,
      source: 'IPCC AR5'
    },
    {
      productName: 'CO2 Industrial',
      category: 'Processos Industriais',
      unit: 'kg',
      factorValue: 1.0,
      year: 2025,
      source: 'IPCC AR5'
    },
    
    // Atividades de Agricultura
    {
      productName: 'CH4 Agricultura',
      category: 'Agricultura',
      unit: 'kg',
      factorValue: 25.0,
      year: 2025,
      source: 'IPCC'
    },
    {
      productName: 'N2O Agricultura',
      category: 'Agricultura',
      unit: 'kg',
      factorValue: 298.0,
      year: 2025,
      source: 'IPCC'
    },
    {
      productName: 'CO2 Agricultura',
      category: 'Agricultura',
      unit: 'kg',
      factorValue: 1.0,
      year: 2025,
      source: 'IPCC'
    },
    
    // Mudanças no Uso do Solo
    {
      productName: 'Mudança Uso Solo',
      category: 'Uso do Solo',
      unit: 'hectare',
      factorValue: 5.0, // tCO2e por hectare (média)
      year: 2025,
      source: 'IPCC LULUCF'
    },
    
    // Resíduos Sólidos - diferentes tratamentos
    {
      productName: 'Resíduos Aterro',
      category: 'Resíduos Sólidos',
      unit: 'kg',
      factorValue: 0.8,
      year: 2025,
      source: 'GHG Protocol'
    },
    {
      productName: 'Resíduos Compostagem',
      category: 'Resíduos Sólidos',
      unit: 'kg',
      factorValue: 0.15,
      year: 2025,
      source: 'GHG Protocol'
    },
    {
      productName: 'Resíduos Incineração',
      category: 'Resíduos Sólidos',
      unit: 'kg',
      factorValue: 0.5,
      year: 2025,
      source: 'GHG Protocol'
    },
    
    // Efluentes
    {
      productName: 'Efluentes',
      category: 'Efluentes',
      unit: 'm³',
      factorValue: 0.25,
      year: 2025,
      source: 'GHG Protocol'
    },
    
    // ESCOPO 2
    
    // Energia Elétrica (Brasil - SIN)
    {
      productName: 'Energia Elétrica Brasil',
      category: 'Energia Elétrica',
      unit: 'kWh',
      factorValue: 0.0817, // Fator médio do SIN 2024
      year: 2025,
      source: 'Ministério de Minas e Energia'
    },
    
    // Perdas de Energia
    {
      productName: 'Perdas Energia',
      category: 'Perdas de Energia',
      unit: 'kWh',
      factorValue: 0.0817,
      year: 2025,
      source: 'Ministério de Minas e Energia'
    },
    
    // Energia Térmica
    {
      productName: 'Energia Térmica Vapor',
      category: 'Energia Térmica',
      unit: 'GJ',
      factorValue: 0.18,
      year: 2025,
      source: 'GHG Protocol'
    },
    {
      productName: 'Energia Térmica Água',
      category: 'Energia Térmica',
      unit: 'GJ',
      factorValue: 0.15,
      year: 2025,
      source: 'GHG Protocol'
    },
    
    // ESCOPO 3
    
    // Transporte e Distribuição
    {
      productName: 'Transporte Distribuição',
      category: 'Transporte',
      unit: 'km',
      factorValue: 0.12,
      year: 2025,
      source: 'GHG Protocol'
    },
    
    // Resíduos Sólidos Gerados
    {
      productName: 'Resíduos Gerados Aterro',
      category: 'Resíduos Gerados',
      unit: 'kg',
      factorValue: 0.8,
      year: 2025,
      source: 'GHG Protocol'
    },
    {
      productName: 'Resíduos Gerados Reciclagem',
      category: 'Resíduos Gerados',
      unit: 'kg',
      factorValue: 0.05,
      year: 2025,
      source: 'GHG Protocol'
    },
    {
      productName: 'Resíduos Gerados Compostagem',
      category: 'Resíduos Gerados',
      unit: 'kg',
      factorValue: 0.15,
      year: 2025,
      source: 'GHG Protocol'
    },
    
    // Efluentes Gerados
    {
      productName: 'Efluentes Gerados',
      category: 'Efluentes Gerados',
      unit: 'm³',
      factorValue: 0.25,
      year: 2025,
      source: 'GHG Protocol'
    },
    
    // Viagens a Negócios - diferentes modais
    {
      productName: 'Viagens Aéreo',
      category: 'Viagens',
      unit: 'km',
      factorValue: 0.25,
      year: 2025,
      source: 'GHG Protocol'
    },
    {
      productName: 'Viagens Rodoviário',
      category: 'Viagens',
      unit: 'km',
      factorValue: 0.12,
      year: 2025,
      source: 'GHG Protocol'
    },
    {
      productName: 'Viagens Ferroviário',
      category: 'Viagens',
      unit: 'km',
      factorValue: 0.04,
      year: 2025,
      source: 'GHG Protocol'
    }
  ];

  let created = 0;
  let skipped = 0;

  for (const factor of emissionFactors) {
    try {
      // Verificar se o produto já existe
      let product = await prisma.emissionProduct.findFirst({
        where: { name: factor.productName }
      });

      // Se não existir, criar o produto
      if (!product) {
        product = await prisma.emissionProduct.create({
          data: {
            name: factor.productName,
            unit: factor.unit,
            scope: factor.category // Usar category como scope
          }
        });
        console.log(`✅ Produto criado: ${factor.productName}`);
      } else {
        console.log(`⏭️  Produto já existe: ${factor.productName}`);
      }

      // Verificar se o fator já existe para este produto
      const existingFactor = await prisma.emissionFactor.findFirst({
        where: {
          emissionProductId: product.id,
          year: factor.year
        }
      });

      if (!existingFactor) {
        await prisma.emissionFactor.create({
          data: {
            emissionProductId: product.id,
            factorValue: factor.factorValue,
            year: factor.year
          }
        });
        console.log(`   📊 Fator criado: ${factor.factorValue} ${factor.unit} (${factor.year}) - Fonte: ${factor.source}`);
        created++;
      } else {
        console.log(`   ⏭️  Fator já existe para ${factor.year}`);
        skipped++;
      }

    } catch (error) {
      console.error(`❌ Erro ao criar ${factor.productName}:`, error.message);
    }
  }

  console.log(`\n✨ Finalizado!`);
  console.log(`   ✅ ${created} fatores criados`);
  console.log(`   ⏭️  ${skipped} fatores já existiam`);
}

main()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
