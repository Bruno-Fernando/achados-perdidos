import { z } from "zod";

export const ClaimValidator = z.object({
  message: z.string().optional(),
});

export type ClaimPayload = z.infer<typeof ClaimValidator>;
