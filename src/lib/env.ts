import * as z from "zod";

// Define a Zod schema for environment variables
const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
  CLERK_SIGN_IN_FORCE_REDIRECT_URL: z.string(),
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
  NEXT_PUBLIC_SANITY_DATASET: z.string(),
  SANITY_API_TOKEN: z.string(),
  SANITY_API_READ_TOKEN: z.string(),
  STRIPE_PUBLISHABLE_KEY: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
});

// Parse environment variables to validate them
envSchema.parse(process.env);

// Augment NodeJS ProcessEnv type with the validated environment variables
declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
