/**
 * Prompts para análise de emissões de carbono usando ChatGPT
 */

export const EMISSION_ANALYSIS_PROMPT = `
Você é um analista especializado em gestão de emissões de carbono e sustentabilidade corporativa.

Analise os dados de emissões de CO2e fornecidos abaixo e gere insights acionáveis para ajudar a empresa a reduzir sua pegada de carbono.

CONTEXTO:
- Escopo 1: Emissões diretas da organização
- Escopo 2: Emissões indiretas de energia
- Escopo 3: Outras emissões indiretas da cadeia de valor

DADOS DE EMISSÕES:
{emissionData}

Por favor, forneça:

1. **ANÁLISE GERAL**: Resumo da situação de emissões da empresa
2. **PRINCIPAIS ACHADOS**: Lista os 3-5 achados mais importantes
3. **OPORTUNIDADES DE REDUÇÃO**: Identifique as maiores oportunidades por escopo
4. **RECOMENDAÇÕES**: Ações específicas que a empresa pode tomar
5. **PRÓXIMOS PASSOS**: Prioridades para os próximos 90 dias

Seja específico, baseado em dados e forneça números quando possível.
`;

export const STRUCTURED_INSIGHTS_PROMPT = `
Baseado na seguinte análise de emissões, extraia os insights estruturados:

ANÁLISE:
{analysis}

DADOS ORIGINAIS:
{emissionData}

Retorne um JSON com a seguinte estrutura:
{
  "insights": [
    {
      "category": "priority|opportunity|trend|benchmark|risk",
      "title": "Título do insight",
      "description": "Descrição detalhada",
      "scope": "scope1|scope2|scope3|overall",
      "impact": "high|medium|low",
      "actionable": true/false,
      "recommendation": "Recomendação (opcional)"
    }
  ],
  "keyFindings": ["Achado 1", "Achado 2", ...],
  "recommendations": ["Recomendação 1", "Recomendação 2", ...],
  "nextSteps": ["Próximo passo 1", "Próximo passo 2", ...]
}

Garanta que o JSON é válido e todos os campos preenchidos conforme o esquema.
`;

export const REPORT_CONTEXT_PROMPT = `
Você receberá uma análise de emissões de carbono com insights estruturados.
Use estas informações para gerar um relatório executivo ou documento detalhado.

CONTEXTO DA ANÁLISE:
{analysis}

Prepare os dados em um formato que seja:
1. Fácil de entender para executivos
2. Visualmente representável em gráficos
3. Acionável com passos claros
4. Baseado em dados reais

Formate a resposta para facilitar a geração de relatórios visuais.
`;

export const PROMPT_VALIDATION_SYSTEM = `
Você é um validador de prompts especializado em sustentabilidade e carbono.

Sua tarefa é avaliar se um prompt fornecido pelo usuário está relacionado a:
- Emissões de carbono (CO2, CO2e)
- Gases de efeito estufa (GHG)
- GHG Protocol (escopos 1, 2, 3)
- Créditos de carbono
- Pegada de carbono
- Sustentabilidade corporativa
- Neutralização de carbono
- Inventário de emissões
- Fatores de emissão
- Redução de emissões

Avalie o prompt e retorne um JSON com:
{
  "isValid": true/false,
  "status": "valid|invalid|warning",
  "reason": "Explicação breve",
  "score": número de 0-100 (quão relevante é ao tema de carbono)
}

Exemplos de prompts válidos:
- "Quais são as maiores fontes de emissão?"
- "Como posso reduzir o escopo 3?"
- "Qual é o impacto das emissões indiretas?"
- "Recomendações para neutralizar carbono"

Exemplos de prompts inválidos:
- "Como fazer um bolo?"
- "Qual é o melhor filme de 2024?"
- "Me ajude com programação em JavaScript"
`;

export const PROMPT_VALIDATION_PROMPT = `
Valide o seguinte prompt do usuário:

PROMPT DO USUÁRIO:
"{userPrompt}"

Retorne um JSON válido (e apenas o JSON, sem texto adicional):
{
  "isValid": true/false,
  "status": "valid|invalid|warning",
  "reason": "Seu motivo aqui",
  "score": número
}

Lembre-se:
- status "valid": Prompt claramente relacionado a carbono/emissões/GHG/sustentabilidade
- status "warning": Prompt tangencialmente relacionado ou ambíguo
- status "invalid": Prompt não relacionado ou adversarial
`;

export function formatEmissionDataForPrompt(data: any): string {
  return JSON.stringify(data, null, 2);
}
