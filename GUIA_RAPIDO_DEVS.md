# 🚀 Guia Rápido - Novos Desenvolvedores

Este guia ajuda novos desenvolvedores a entender as mudanças recentes no sistema de cálculo de emissões.

---

## 📦 O que mudou?

### 1. Sistema de Notificações (Toasts)

**ANTES:**
```typescript
alert('Mensagem para o usuário');
```

**AGORA:**
```typescript
import { toast } from 'sonner';

// Sucesso
toast.success('✅ Operação concluída!');

// Erro
toast.error('❌ Algo deu errado');

// Loading
const loadingId = toast.loading('Processando...');
// ... após concluir
toast.dismiss(loadingId);

// Com duração customizada
toast.success('Salvo!', { duration: 3000 });
```

**Por quê?**
- ✅ Não bloqueia a interface
- ✅ Feedback visual melhor
- ✅ Auto-dismiss configurável
- ✅ Múltiplos toasts simultâneos

---

### 2. Dados de Emissão

**ANTES:**
```typescript
import { 
  scope1EmissionTypes 
} from '@/data/emissionData';  // ❌ DEPRECATED
```

**AGORA:**
```typescript
import { 
  scope1EmissionTypes 
} from '@/data/emissionDataNew';  // ✅ RECOMENDADO
```

**Por quê?**
- ✅ Nomes de produtos correspondem ao banco de dados
- ✅ Fatores de emissão reais (não fixos)
- ✅ 87% mais preciso

---

### 3. Formato de API (EmissionSaveInput)

**FORMATO ANTIGO (ainda funciona, mas deprecated):**
```typescript
{
  companyId: "123",
  year: 2025,
  scopes: {
    '1': { emissions: [...] },
    '2': { emissions: [...] },
    '3': { emissions: [...] }
  }
}
```

**FORMATO NOVO (recomendado):**
```typescript
{
  companyId: "123",
  year: 2025,
  scope1: { emissions: [...] },
  scope2: { emissions: [...] },
  scope3: { emissions: [...] }
}
```

**Por quê?**
- ✅ Mais direto e intuitivo
- ✅ Melhor type safety
- ✅ Backend processa mais rápido

---

### 4. TypeScript - Sem `any`

**ANTES:**
```typescript
async function getData(): Promise<any> {  // ❌
  // ...
}

catch (err: any) {  // ❌
  console.error(err.message);
}
```

**AGORA:**
```typescript
async function getData(): Promise<unknown> {  // ✅
  // ...
}
const data = await getData() as MyType;  // Type cast explícito

catch (err: unknown) {  // ✅
  const message = err instanceof Error ? err.message : 'Erro desconhecido';
  console.error(message);
}
```

**Por quê?**
- ✅ Type safety real
- ✅ Erros detectados em tempo de compilação
- ✅ Melhor autocomplete no IDE

---

## 🛠️ Como usar

### Adicionar Toast em um Componente

```typescript
'use client';

import { toast } from 'sonner';

export function MeuComponente() {
  const handleSave = async () => {
    // Loading toast
    const toastId = toast.loading('Salvando...');
    
    try {
      await api.save(data);
      
      // Remover loading e mostrar sucesso
      toast.dismiss(toastId);
      toast.success('✅ Dados salvos com sucesso!');
      
    } catch (error) {
      // Remover loading e mostrar erro
      toast.dismiss(toastId);
      toast.error('❌ Erro ao salvar dados');
    }
  };
  
  return <button onClick={handleSave}>Salvar</button>;
}
```

---

### Buscar Produtos de Emissão

```typescript
import { useEmissionProducts } from '@/hooks/useEmissionProducts';

export function MeuFormulario() {
  const { products, productsByScope, isLoading, error, getFactorValue } = useEmissionProducts();
  
  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  
  // Produtos do escopo 1
  const scope1Products = productsByScope.scope1;
  
  // Obter fator de um produto específico
  const gasolinaFactor = getFactorValue('Gasolina');
  
  return (
    <select>
      {scope1Products.map(product => (
        <option key={product.id} value={product.name}>
          {product.name} - {product.emissionFactors[0]?.factorValue} kg CO₂e
        </option>
      ))}
    </select>
  );
}
```

---

### Salvar Emissão (novo formato)

```typescript
import { calculatorAPI, EmissionSaveInput } from '@/lib/calculatorApi';
import { toast } from 'sonner';

export async function salvarEmissao(data: EmissionSaveInput) {
  const toastId = toast.loading('Calculando emissões...');
  
  try {
    const result = await calculatorAPI.calculateInventory(data);
    
    toast.dismiss(toastId);
    toast.success(`✅ Emissão salva! ${result.totalEmissions.toFixed(2)} tCO2e`);
    
    return result;
  } catch (error) {
    toast.dismiss(toastId);
    toast.error('❌ Erro ao salvar emissão');
    throw error;
  }
}
```

---

## ⚠️ Código Deprecated

Se você ver warnings de deprecated, atualize para o novo formato:

### 1. InventoryInput → EmissionSaveInput

```typescript
// ❌ ANTES (deprecated)
import { InventoryInput } from '@/lib/calculatorApi';

const data: InventoryInput = {
  scopes: { '1': {...}, '2': {...}, '3': {...} }
};

// ✅ DEPOIS
import { EmissionSaveInput } from '@/lib/calculatorApi';

const data: EmissionSaveInput = {
  scope1: {...},
  scope2: {...},
  scope3: {...}
};
```

---

### 2. emissionData → emissionDataNew

```typescript
// ❌ ANTES (deprecated)
import { scope1EmissionTypes } from '@/data/emissionData';

// ✅ DEPOIS
import { scope1EmissionTypes } from '@/data/emissionDataNew';
```

---

## 🧪 Testando

### Verificar Tipos
```bash
cd client
npm run build
# Deve compilar sem erros de tipo
```

### Verificar Lint
```bash
npm run lint
# Não deve mostrar warnings em arquivos da calculadora
```

### Testar Toasts Localmente
1. Inicie o dev server: `npm run dev`
2. Abra a calculadora
3. Teste operações que mostram toasts
4. Verifique se aparecem no canto superior direito

---

## 📚 Recursos

### Documentação
- **Sonner:** https://sonner.emilkowal.ski/
- **Next.js:** https://nextjs.org/docs
- **TypeScript:** https://www.typescriptlang.org/docs

### Arquivos Importantes
- `client/src/lib/calculatorApi.ts` - API client
- `client/src/hooks/useEmissionProducts.ts` - Hook para produtos
- `client/src/data/emissionDataNew.ts` - Dados de emissão
- `client/src/components/calculator/CalculatorForm.tsx` - Formulário principal

---

## 🐛 Problemas Comuns

### "Property X does not exist on type 'unknown'"
**Causa:** Retorno de API tipado como `unknown`  
**Solução:** Use type cast explícito
```typescript
const data = await api.get() as MyType;
```

---

### Toast não aparece
**Causa:** Faltou adicionar `<Toaster />` no layout  
**Solução:** Verifique se está em `client/src/app/layout.tsx`
```typescript
import { Toaster } from 'sonner';

<body>
  <Toaster position="top-right" richColors closeButton />
  {children}
</body>
```

---

### Produtos de emissão não carregam
**Causa:** Backend não está rodando ou sem produtos no banco  
**Solução:**
1. Verifique se o server está rodando: `cd server && npm run dev`
2. Popule os fatores: `node populate_emission_factors.js`

---

## 💡 Dicas

1. **Use toasts para tudo** - Não use mais `alert()` ou `confirm()`
2. **Sempre adicione loading states** - Melhora UX significativamente
3. **Type cast quando necessário** - Mas evite `any`
4. **Use emissionDataNew** - Não use o arquivo antigo
5. **Teste em diferentes cenários** - Sucesso, erro, loading

---

## 🎯 Checklist para Novos Componentes

Ao criar um novo componente da calculadora:

- [ ] Importar `toast` do sonner
- [ ] Usar `emissionDataNew` para dados
- [ ] Tipar corretamente (sem `any`)
- [ ] Adicionar loading states
- [ ] Adicionar error handling com toasts
- [ ] Testar compilação TypeScript
- [ ] Testar lint

---

## 📞 Suporte

Se tiver dúvidas:
1. Leia os arquivos de documentação:
   - `RELATORIO_ANALISE_CALCULADORA.md`
   - `IMPLEMENTACAO_MELHORIAS.md`
   - `RESUMO_IMPLEMENTACAO_FINAL.md`
2. Verifique os exemplos neste arquivo
3. Consulte a equipe ES-UNIFESP

---

**Última atualização:** 10 de Novembro de 2025  
**Versão:** 1.0
