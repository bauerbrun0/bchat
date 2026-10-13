import { z } from "zod";

export const timestamps = {
  updatedAt: z.date(),
  createdAt: z.date(),
};
