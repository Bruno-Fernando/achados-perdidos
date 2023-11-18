import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(5, "Título deve ter no mínimo 5 caracteres")
    .max(50, "Título deve ter no máximo 50 caracteres"),
  description: z
    .string()
    .min(5, "Descrição deve ter no mínimo 5 caracteres")
    .max(150, "Descrição deve ter no máximo 150 caracteres"),
  status: z.enum(["LOST", "FOUND"], {
    description: "description",
    required_error: "Escolha o tipo do post",
  }),
});

export type PostPayload = z.infer<typeof PostValidator>;
