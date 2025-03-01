import { Schema } from "effect";

export const envVarsSchema = Schema.Struct({
  VITE_API_URL: Schema.String,
  VITE_APP_TITLE: Schema.String,
  VITE_APP_VERSION: Schema.String,
  VITE_COGNITO_CLIENT_ID: Schema.String,
  VITE_COGNITO_REGION: Schema.String,
}).pipe(
  Schema.rename({
    VITE_API_URL: "API_URL",
    VITE_APP_TITLE: "APP_TITLE",
    VITE_APP_VERSION: "APP_VERSION",
    VITE_COGNITO_CLIENT_ID: "COGNITO_CLIENT_ID",
    VITE_COGNITO_REGION: "COGNITO_REGION",
  }),
);

export type envVars = Schema.Schema.Type<typeof envVars>;

const { VITE_API_URL, VITE_APP_TITLE, VITE_APP_VERSION, VITE_COGNITO_CLIENT_ID, VITE_COGNITO_REGION } = import.meta.env;

export const envVars = Schema.decodeSync(envVarsSchema)({
  VITE_API_URL,
  VITE_APP_TITLE,
  VITE_APP_VERSION,
  VITE_COGNITO_CLIENT_ID,
  VITE_COGNITO_REGION,
});
console.log("Configuración de entorno válida");
