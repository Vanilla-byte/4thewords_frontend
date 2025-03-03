import { z } from "zod";

export const envVarsSchema = z.object({
  API_URL: z.string(),
  APP_TITLE: z.string(),
  APP_VERSION: z.string(),
});

export type envVars = z.infer<typeof envVarsSchema>;

const { VITE_API_URL: API_URL, VITE_APP_TITLE: APP_TITLE, VITE_APP_VERSION: APP_VERSION } = import.meta.env;

export const envVars = envVarsSchema.parse({
  API_URL,
  APP_TITLE,
  APP_VERSION,
});

console.log("Configuración de entorno válida", envVars);
