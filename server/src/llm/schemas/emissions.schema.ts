import { z } from "zod";

/**
 * Schema para validação e tipagem de dados de emissões
 */

export const EmissionSchema = z.object({
  type: z.string(),
  formData: z.record(z.string(), z.any()),
  quantity: z.number(),
  description: z.string(),
  factorValue: z.number(),
  calculatedCo2e: z.number(),
});

export const ScopeEmissionsSchema = z.object({
  emissions: z.array(EmissionSchema),
  totalCo2e: z.number(),
  emissionsCount: z.number(),
});

export const ScopesSchema = z.object({
  scope1: ScopeEmissionsSchema.optional(),
  scope2: ScopeEmissionsSchema.optional(),
  scope3: ScopeEmissionsSchema.optional(),
});

export const SummarySchema = z.object({
  scope1Total: z.number(),
  scope2Total: z.number(),
  scope3Total: z.number(),
  totalEmissions: z.number(),
  totalEmissionsCount: z.number(),
});

export const EmissionsDataSchema = z.object({
  scopes: ScopesSchema,
  summary: SummarySchema,
  timestamp: z.string(),
  description: z.string(),
  userPrompt: z.string().optional(),
});

/**
 * Schema para os insights gerados pela IA
 */
export const InsightSchema = z.object({
  category: z.enum([
    "priority",
    "opportunity",
    "trend",
    "benchmark",
    "risk",
  ]),
  title: z.string(),
  description: z.string(),
  scope: z.enum(["scope1", "scope2", "scope3", "overall"]),
  impact: z.enum(["high", "medium", "low"]),
  actionable: z.boolean(),
  recommendation: z.string().optional(),
});

export const AnalysisResultSchema = z.object({
  rawAnalysis: z.string(),
  insights: z.array(InsightSchema),
  keyFindings: z.array(z.string()),
  recommendations: z.array(z.string()),
  nextSteps: z.array(z.string()),
});

/**
 * Schema para validação de prompts do usuário
 */
export const PromptValidationSchema = z.object({
  isValid: z.boolean(),
  status: z.enum(["valid", "invalid", "warning"]),
  reason: z.string(),
  score: z.number().min(0).max(100),
});

export type Emission = z.infer<typeof EmissionSchema>;
export type ScopeEmissions = z.infer<typeof ScopeEmissionsSchema>;
export type EmissionsData = z.infer<typeof EmissionsDataSchema>;
export type Insight = z.infer<typeof InsightSchema>;
export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
export type PromptValidation = z.infer<typeof PromptValidationSchema>;
