# Correções da Calculadora - Sistema de Inventário de Emissões

## Problemas Identificados

1. **Schema Prisma Incorreto**
   - Modelo `EmissionInventory` estava faltando no schema
   - Campo `company_id` duplicado e mal configurado no modelo `Emission`
   - Relações incorretas entre `Emission`, `EmissionInventory` e `Company`

2. **Criação Automática de Empresa**
   - O serviço estava criando empresas automaticamente com IDs aleatórios
   - Não havia integração com o sistema de autenticação

3. **Frontend sem Autenticação**
   - `CalculatorForm` gerava um `companyId` aleatório
   - Não verificava se o usuário estava autenticado
   - Não usava o ID do usuário logado

## Correções Implementadas

### 1. Schema Prisma (`server/prisma/schema.prisma`)

#### Adicionado modelo `EmissionInventory`:
```prisma
model EmissionInventory {
  id        String   @id @default(uuid())
  companyId String   @map("company_id")
  year      Int
  name      String
  status    InventoryStatus @default(DRAFT)
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  company   Company    @relation(fields: [companyId], references: [id])
  emissions Emission[]

  @@unique([companyId, year])
  @@map("emission_inventories")
}
```

#### Corrigido modelo `Emission`:
- Removido campo `company_id` duplicado
- Corrigida relação com `EmissionInventory`
- Mantida apenas a relação através do `inventoryId`

```prisma
model Emission {
  id String @id @default(uuid())

  scope        Int
  emissionType String
  formData     Json?
  deletedAt    DateTime? @map("deleted_at")

  inventoryId       String @map("inventory_id")
  emissionProductId String @map("emission_product_id")

  quantity       Int
  calculatedCo2e Float     @map("calculated_co2e")
  registeredAt   DateTime? @map("registered_at")
  createdAt      DateTime  @default(now()) @map("created_at")
  description    String?

  inventory       EmissionInventory @relation(fields: [inventoryId], references: [id])
  emissionProduct EmissionProduct   @relation(fields: [emissionProductId], references: [id])

  @@unique([inventoryId, emissionProductId])
  @@map("emissions")
}
```

#### Atualizado modelo `Company`:
```prisma
model Company {
  // ... campos existentes
  emissionInventories EmissionInventory[]
  @@map("companies")
}
```

### 2. Serviço da Calculadora (`server/src/services/calculator.service.ts`)

#### Removida criação automática de empresa:
```typescript
// ANTES: Criava empresa automaticamente
if (!company) {
  company = await prisma.company.create({
    data: {
      id: companyId,
      email: `${companyId}@teste.com`,
      balance: 0
    }
  });
}

// DEPOIS: Retorna erro se empresa não existir
const company = await prisma.company.findUnique({
  where: { id: companyId },
});

if (!company) {
  throw new Error(`Empresa com ID ${companyId} não encontrada. Por favor, faça login primeiro.`);
}
```

#### Removido campo `companyId` do objeto de emissão:
```typescript
// ANTES: Incluía companyId redundante
data: {
  inventoryId: inventory.id,
  emissionProductId: productId,
  companyId: companyId,  // ❌ Redundante e incorreto
  year: currentYear,
  // ...
}

// DEPOIS: Apenas inventoryId (que já vincula à empresa)
data: {
  inventoryId: inventory.id,
  emissionProductId: productId,
  scope: scopeNumber,
  emissionType: emission.emissionType,
  // ...
}
```

### 3. Contexto de Autenticação (`client/src/contexts/AuthContext.tsx`)

Criado novo contexto para gerenciar autenticação:

```typescript
interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}
```

Funcionalidades:
- Armazena usuário no `localStorage`
- Verifica autenticação ao carregar app
- Integra com API de autenticação
- Fornece funções `login` e `logout`

### 4. Layout Principal (`client/src/app/layout.tsx`)

Adicionado `AuthProvider` envolvendo o app:

```typescript
<AuthProvider>
  <CalculatorProvider>
    <main className="flex-1 w-full">
      {children}
    </main>
  </CalculatorProvider>
</AuthProvider>
```

### 5. Formulário da Calculadora (`client/src/components/calculator/CalculatorForm.tsx`)

#### Integração com autenticação:
```typescript
const { user, isAuthenticated } = useAuth();

const handleFinishCalculation = async () => {
  // Verificar autenticação
  if (!isAuthenticated || !user) {
    alert('Você precisa estar logado para salvar o inventário...');
    router.push('/login');
    return;
  }

  // Usar ID do usuário autenticado
  const companyId = user.id;  // ✅ ID real do usuário
  const year = new Date().getFullYear();
  
  const result = await saveInventory(companyId, year);
  // ...
}
```

#### Alert visual de autenticação:
```tsx
{!isAuthenticated && (
  <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
    <AlertCircle className="w-5 h-5 text-yellow-600" />
    <div>
      <h3>Atenção: Não autenticado</h3>
      <p>
        Você precisa estar logado para salvar o inventário.
        <button onClick={() => router.push('/login')}>
          Fazer login agora
        </button>
      </p>
    </div>
  </div>
)}
```

### 6. Componente de Login (`client/src/components/login/LoginCard.tsx`)

Integrado com `AuthContext`:

```typescript
const { login } = useAuth();
const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  // ... validação

  const response = await fetch(`${API_URL}/api/auth/magic-link`, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  if (response.ok) {
    setLoginState('success');
    await login(email);  // ✅ Registra usuário no contexto
  }
}
```

## Fluxo Completo Corrigido

### 1. Login do Usuário
1. Usuário acessa `/login`
2. Insere email e clica em "Entrar"
3. Sistema envia magic link para email
4. Usuário clica no link no email
5. Sistema autentica e armazena dados do usuário
6. `AuthContext` salva usuário no `localStorage`

### 2. Uso da Calculadora
1. Usuário acessa `/calculator`
2. Sistema verifica se está autenticado
3. Se não estiver, mostra alert com botão para login
4. Usuário preenche os formulários dos 3 escopos
5. Clica em "Finalizar e Ver Resultados"
6. Sistema verifica autenticação novamente
7. Usa `user.id` como `companyId` (não mais aleatório)
8. Salva inventário vinculado à empresa do usuário

### 3. Salvamento no Banco
1. API recebe `companyId` (ID real do usuário)
2. Verifica se empresa existe
3. Se não existir, retorna erro (não cria mais automaticamente)
4. Cria/atualiza `EmissionInventory` para o ano
5. Salva todas as `Emissions` vinculadas ao inventário
6. Retorna resultado com ID do inventário e totais

## Estrutura de Dados

```
Company (usuário logado)
  └── EmissionInventory (inventário anual)
        ├── year: 2025
        ├── status: PUBLISHED
        └── Emission[] (emissões do inventário)
              ├── scope: 1, 2, ou 3
              ├── emissionType: "combustao_movel", etc
              ├── formData: JSON com dados do formulário
              ├── quantity: número
              └── calculatedCo2e: valor calculado
```

## Comandos Executados

```bash
# Gerar Prisma Client atualizado
cd server
npx prisma generate
```

## Próximos Passos Recomendados

1. **Migração do Banco de Dados**
   - Se necessário, rodar: `npx prisma migrate dev`
   - Verificar se a tabela `emission_inventories` está correta

2. **Testar Autenticação**
   - Configurar variáveis de ambiente do SMTP
   - Testar envio de magic link
   - Verificar armazenamento de token/cookie

3. **Testar Fluxo Completo**
   - Login → Calculadora → Salvamento
   - Verificar se `companyId` está correto no banco
   - Confirmar que emissões estão vinculadas ao inventário

4. **Melhorias Futuras**
   - Adicionar refresh de token
   - Implementar logout em todos os componentes
   - Adicionar loading states melhores
   - Tratamento de erros mais robusto
   - Página de resultados consumindo dados salvos

## Notas Importantes

- ✅ Schema Prisma corrigido e sincronizado
- ✅ Não cria mais empresas automaticamente
- ✅ Usa autenticação real do usuário
- ✅ Vincula emissões ao inventário da empresa
- ✅ Alert visual quando usuário não está logado
- ✅ Redirecionamento para login quando necessário
- ⚠️ Necessário configurar SMTP para magic link funcionar
- ⚠️ Verificar se migration está aplicada no banco
