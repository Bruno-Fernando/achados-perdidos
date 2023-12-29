import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
  postImg: z
    .any()
    .refine((file) => {
      if (file?.[0]) {
        return file?.[0].size <= 4000000;
      }
      return true;
    }, "Tamaho máximo de 4MB")
    .refine((file) => {
      if (file?.[0]) {
        return ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type);
      }
      return true;
    }, "Apenas formatos .jpeg, .jpg, .png e .webp são suportados"),
});

export type PostPayload = z.infer<typeof PostValidator>;
