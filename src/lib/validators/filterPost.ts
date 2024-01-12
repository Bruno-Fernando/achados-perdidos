import { z } from "zod";

export const FilterValidator = z.object({
  status: z.enum(["LOST", "FOUND"]).optional(),
  date: z.date().optional(),
});

export type FilterPayload = z.infer<typeof FilterValidator>;
