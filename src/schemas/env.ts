import { z } from "zod";

export const serverEnvSchema = z.object({
  DATABASE_URL: z.url(),
});
