import { z } from "zod";

export const UfcgRegistrationCodeValidator = z.object({
  registrationCode: z
    .string()
    .length(9, "Quantidade de caracteres diferente do esperado")
    .regex(/^[0-9]*$/, "Matricula deve conter apenas números"),
  password: z.string().nonempty("Senha não pode ser vazia"),
});

export type ValidateRegistrationCodePayload = z.infer<
  typeof UfcgRegistrationCodeValidator
>;
