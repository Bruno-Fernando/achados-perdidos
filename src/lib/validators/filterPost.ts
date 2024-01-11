import { z } from "zod";

export const FilterValidator = z.object({
  status: z.enum(["LOST", "FOUND"], {
    description: "description",
    required_error: "Escolha o tipo do post",
  }),
});

export type FilterPayload = z.infer<typeof FilterValidator>;
