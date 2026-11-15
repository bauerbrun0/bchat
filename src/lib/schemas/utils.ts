import { z } from "zod";

export const dateRange = z
  .object({
    from: z.date().optional(),
    to: z.date().optional(),
  })
  .refine(({ from, to }) => !from || !to || from <= to, {
    error: "Start date must be before or equal to end date",
    path: ["end"],
  });
