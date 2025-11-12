const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();

async function fixScopes() {
  console.log('🔧 Corrigindo campos scope no banco...\n');

  // Buscar todos os produtos
  const allProducts = await prisma.emissionProduct.findMany();
  
  console.log(`📦 Total de produtos no banco: ${allProducts.length}\n`);

  // Mapeamento: padrões de nome → scope correto
  const scopePatterns = {
    '1': [
      'CH4 Fugitivo', 'N2O Fugitivo', 'HFC-134a', 'SF6',
      'CH4 Industrial', 'N2O Industrial', 'CO2 Industrial',
      'CH4 Agricultura', 'N2O Agricultura', 'CO2 Agricultura',
      'Mudança Uso Solo', 'Mudanca Uso Solo', 'Area',
      'Resíduos Aterro', 'Residuos Aterro',
      'Resíduos Compostagem', 'Residuos Compostagem',
      'Resíduos Incineração', 'Residuos Incineracao',
      'Efluentes',
      // Combustíveis do escopo 1
      'Gasolina', 'Diesel', 'Etanol', 'GLP', 'Gás Natural', 'Gas Natural',
      'Carvão', 'Carvao', 'Óleo', 'Oleo', 'Lenha', 'Biodiesel', 'Biogás', 'Biogas'
    ],
    '2': [
      'Energia Elétrica', 'Energia Eletrica',
      'Perdas Energia',
      'Energia Térmica', 'Energia Termica'
    ],
    '3': [
      'Transporte Distribuição', 'Transporte Distribuicao',
      'Resíduos Gerados', 'Residuos Gerados',
      'Efluentes Gerados',
      'Viagens'
    ]
  };

  let fixed = 0;
  let alreadyCorrect = 0;

  for (const product of allProducts) {
    let correctScope = null;

    // Determinar o scope correto baseado no nome do produto
    for (const [scope, patterns] of Object.entries(scopePatterns)) {
      for (const pattern of patterns) {
        if (product.name.includes(pattern)) {
          correctScope = scope;
          break;
        }
      }
      if (correctScope) break;
    }

    if (!correctScope) {
      console.log(`⚠️  Scope não determinado para: ${product.name} (atual: ${product.scope})`);
      continue;
    }

    if (product.scope !== correctScope) {
      await prisma.emissionProduct.update({
        where: { id: product.id },
        data: { scope: correctScope }
      });
      console.log(`✅ ${product.name.padEnd(40)} | ${product.scope || 'null'} → ${correctScope}`);
      fixed++;
    } else {
      console.log(`✓  ${product.name.padEnd(40)} | scope: ${correctScope}`);
      alreadyCorrect++;
    }
  }

  console.log(`\n📊 Resumo:`);
  console.log(`   ✅ Corrigidos: ${fixed}`);
  console.log(`   ✓  Já corretos: ${alreadyCorrect}`);
  console.log(`   📦 Total: ${allProducts.length}`);
}

fixScopes()
  .catch((e) => {
    console.error('❌ Erro:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
