import { z } from "zod";

export const DeletePostValidator = z.object({
  returned: z.enum(["yes", "no"], {
    description: "returned",
    required_error: "*Campo obrigatório",
  }),
  feedback: z
    .string()
    .min(0)
    .max(150, "Feedback deve ter no máximo 150 caracteres"),
});

export type DeletePostPayload = z.infer<typeof DeletePostValidator>;
