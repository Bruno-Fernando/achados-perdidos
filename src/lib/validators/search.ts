import { z } from "zod";

export const SearchValidator = z.object({
  search: z.string().max(50, "Máximo de 50 caracteres"),
});

export type SearchPayload = z.infer<typeof SearchValidator>;
