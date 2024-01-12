import { z } from "zod";

const MAX_FILE_SIZE = 100000;

export const UfcgRegistrationCodeValidator = z.object({
  registrationCode: z
    .string()
    .length(9, "Quantidade de caracteres diferente do esperado")
    .regex(/^[0-9]*$/, "Matricula deve conter apenas números"),
  rdmfile: z
    .any()
    .refine((files) => files?.length === 1, "RDM é obrigatório.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Tamanho máximo de 1MB",
    ),
});

export type ValidateRegistrationCodePayload = z.infer<
  typeof UfcgRegistrationCodeValidator
>;
