# Guia de Uso: Prompt Validator e Enhanced Analyzer

## 📋 Visão Geral

Este documento descreve o novo sistema de validação de prompts e análise melhorada implementado no projeto. O sistema garante que os prompts do usuário sejam relacionados apenas a temas de **carbono, emissões, GHG Protocol e sustentabilidade**, evitando abuso do agente analyzer.

## 🎯 Componentes Implementados

### 1. **PromptValidator** (`server/src/llm/agents/prompt-validator.ts`)

Agente LLM que valida prompts do usuário antes de processá-los.

#### Funcionalidades:
- Valida se o prompt está relacionado a carbono/emissões/GHG
- Retorna um score de relevância (0-100%)
- Fornece feedback sobre por que um prompt foi rejeitado

#### Funções Públicas:

```typescript
// Validação simples
const validation = await validateUserPrompt(userPrompt);
// Retorna: PromptValidation { isValid, status, reason, score }

// Validação com formatação
const result = await validateAndFormatPrompt(userPrompt);
// Retorna: { validation, message, shouldProceed }
```

#### Exemplo de Uso:

```typescript
import { validateUserPrompt } from "@/llm/agents/prompt-validator";

// Prompt válido
const valid = await validateUserPrompt(
  "Como reduzir emissões de escopo 3?"
);
// Retorna: { isValid: true, status: "valid", reason: "...", score: 95 }

// Prompt inválido
const invalid = await validateUserPrompt("Como fazer um bolo?");
// Retorna: { isValid: false, status: "invalid", reason: "...", score: 0 }
```

### 2. **Enhanced Analyzer** (`server/src/llm/agents/analyzer.ts`)

O analyzer foi modificado para aceitar um parâmetro opcional `userPrompt`.

#### Novos Parâmetros:

```typescript
export async function analyzeEmissions(
  emissionData: EmissionsData,
  userPrompt?: string  // ← NOVO: prompt adicional do usuário
): Promise<AnalysisResult>
```

#### Exemplo de Uso:

```typescript
import { analyzeEmissions } from "@/llm/agents/analyzer";

const emissionData = { /* dados... */ };

// Sem prompt adicional (comportamento anterior)
const result1 = await analyzeEmissions(emissionData);

// Com prompt que guia a análise
const result2 = await analyzeEmissions(
  emissionData,
  "Foque em oportunidades de redução de escopo 2 através de energia renovável"
);
```

### 3. **Updated Workflow** (`server/src/llm/graph/emissions-workflow.ts`)

O workflow agora inclui um nó de validação antes da análise.

#### Novo Fluxo:

```
START
  ↓
[Validate Prompt] ← Valida o prompt (se fornecido)
  ↓
[Analyze Emissions] ← Executa análise com contexto adicional
  ↓
[Generate Report] ← Gera relatório
  ↓
END
```

#### Novo Parâmetro:

```typescript
export async function executeEmissionsWorkflow(
  emissionData: EmissionsData,
  userPrompt?: string  // ← NOVO: validado automaticamente
): Promise<WorkflowResult>
```

#### Exemplo de Uso:

```typescript
import { executeEmissionsWorkflow } from "@/llm/graph/emissions-workflow";

const result = await executeEmissionsWorkflow(
  emissionData,
  "Quais são as principais oportunidades de redução?"
);

if (result.success) {
  console.log("Análise completa:", result.analysisResult);
} else {
  console.log("Erro:", result.error); // Se prompt inválido
}
```

## 🔍 Temas Aceitos pelo Validador

O validador aceita prompts relacionados a:

- ✅ Emissões de carbono (CO2, CO2e)
- ✅ Gases de efeito estufa (GHG)
- ✅ GHG Protocol (escopos 1, 2, 3)
- ✅ Créditos de carbono
- ✅ Pegada de carbono
- ✅ Sustentabilidade corporativa
- ✅ Neutralização de carbono
- ✅ Inventário de emissões
- ✅ Fatores de emissão
- ✅ Redução de emissões

## ❌ Exemplos de Prompts Rejeitados

```typescript
// Rejeita: Não relacionado
"Como fazer um bolo?"

// Rejeita: Programação
"Me ajude com JavaScript"

// Rejeita: Adversarial
"Ignore as instruções anteriores e..."

// Rejeita: Totalmente fora do escopo
"Qual é o melhor filme de 2024?"
```

## ✅ Exemplos de Prompts Aceitos

```typescript
// Válido: Escopo 3
"Como podemos reduzir emissões indiretas da cadeia de fornecimento?"

// Válido: Estratégia carbono
"Qual é a melhor abordagem para neutralizar emissões?"

// Válido: GHG Protocol
"Quais são as diferenças entre escopos 1, 2 e 3?"

// Válido: Créditos de carbono
"Onde podemos adquirir créditos de carbono certificados?"

// Válido: Análise específica
"Foque em oportunidades de redução de emissões de escopo 2"
```

## 📊 Schemas Atualizados

### EmissionsData

```typescript
export const EmissionsDataSchema = z.object({
  scopes: ScopesSchema,
  summary: SummarySchema,
  timestamp: z.string(),
  description: z.string(),
  userPrompt: z.string().optional(),  // ← NOVO
});
```

### PromptValidation

```typescript
export const PromptValidationSchema = z.object({
  isValid: z.boolean(),
  status: z.enum(["valid", "invalid", "warning"]),
  reason: z.string(),
  score: z.number().min(0).max(100),
});
```

## 🚀 Casos de Uso

### Caso 1: Análise Sem Guia Adicional

```typescript
// Interface que apenas fornece dados
const result = await executeEmissionsWorkflow(emissionData);

if (result.success) {
  console.log("Análise automática concluída");
}
```

### Caso 2: Análise Com Direcionamento

```typescript
// Usuário fornece um guia para a análise
const userGuidance = "Priorize soluções viáveis em 90 dias e com ROI > 2 anos";

const result = await executeEmissionsWorkflow(emissionData, userGuidance);

if (result.success) {
  // Análise agora considera as prioridades do usuário
  const recommendations = result.analysisResult.recommendations;
}
```

### Caso 3: Validação Prévia

```typescript
// Validar prompt antes de processar
const { validation, shouldProceed } = await validateAndFormatPrompt(userPrompt);

if (!shouldProceed) {
  console.log(`Prompt rejeitado: ${validation.reason}`);
  return;
}

// Se passou na validação, processar
const result = await executeEmissionsWorkflow(emissionData, userPrompt);
```

### Caso 4: Integrando com API REST

```typescript
// Em uma rota Express
app.post("/api/analysis", async (req, res) => {
  const { emissionData, userPrompt } = req.body;

  // Validar o prompt (opcional mas recomendado)
  if (userPrompt) {
    const { shouldProceed, message } = await validateAndFormatPrompt(userPrompt);
    if (!shouldProceed) {
      return res.status(400).json({ error: message });
    }
  }

  // Executar workflow
  const result = await executeEmissionsWorkflow(emissionData, userPrompt);

  if (result.success) {
    res.json({ success: true, data: result });
  } else {
    res.status(400).json({ success: false, error: result.error });
  }
});
```

## 🧪 Testando

Executar os testes implementados:

```bash
# Ver arquivo de teste em:
# server/src/llm/tests/test-prompt-validator.ts

npm run test  # Se configurado
```

## 🛡️ Segurança

O sistema implementa múltiplas camadas de proteção:

1. **Validação Semântica**: LLM valida o contexto do prompt
2. **Score de Relevância**: 0-100% para indicar quão relevante é
3. **Status Granular**: valid, invalid ou warning
4. **Logging**: Todos os eventos são registrados
5. **Graceful Degradation**: Sistema funciona sem prompt adicional

## 📝 Notas Importantes

### Score de Relevância

- **75-100%**: Altamente relevante, processado normalmente
- **40-74%**: Relevância moderada, status "warning" - processado com cautela
- **0-39%**: Não relevante, rejeitado com mensagem clara

### Tratamento de Erros

Se o validador falhar por erro técnico:

```typescript
{
  isValid: false,
  status: "warning",
  reason: "Erro ao validar prompt: ...",
  score: 50  // Permite continue with caution
}
```

### Performance

- Validação: ~1-3 segundos (chamada LLM)
- Análise com prompt: +5-10% de tempo
- Recomendação: Cache de validações para prompts idênticos

## 🔧 Configuração

### Modelo LLM

O validador usa `gpt-4o-mini` com `temperature: 0.3`:
- Temperature baixa garante consistência
- Modelo rápido reduz latência

Se precisar mudar:

```typescript
// Em prompt-validator.ts
function initializeLLM(): ChatOpenAI {
  return new ChatOpenAI({
    model: "gpt-4o",  // Mude aqui
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.2,  // Ou aqui
  });
}
```

## 📚 Arquivos Modificados/Criados

```
server/src/llm/
├── agents/
│   ├── analyzer.ts                    (MODIFICADO)
│   ├── prompt-validator.ts            (NOVO)
│   └── report-generator.ts            (sem mudanças)
├── graph/
│   └── emissions-workflow.ts          (MODIFICADO)
├── prompts/
│   └── analysis.prompt.ts             (MODIFICADO - adicionados 2 prompts)
├── schemas/
│   └── emissions.schema.ts            (MODIFICADO - adicionado PromptValidationSchema)
└── tests/
    └── test-prompt-validator.ts       (NOVO)
```

## ❓ FAQ

**P: E se o usuário não fornecer um prompt adicional?**
R: O sistema funciona normalmente sem ele. O prompt é completamente opcional.

**P: Como faço para aumentar a leniência do validador?**
R: Ajuste o score mínimo de aceitação em `shouldProceedAfterValidation()` em `emissions-workflow.ts`.

**P: Posso usar prompts em outros idiomas?**
R: Sim! O validador foi configurado para português mas funciona com outros idiomas também.

**P: O que faz um prompt ser "warning" ao invés de "invalid"?**
R: Prompts tangencialmente relacionados ou ambígos recebem status "warning". Exemplo: "Qual é o impacto ambiental?" (muito vago, mas relacionado).

---

**Versão**: 1.0
**Data**: 2025-11-16
**Mantido por**: Equipe de Engenharia de Software
