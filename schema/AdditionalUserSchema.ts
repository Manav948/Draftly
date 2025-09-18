import { z } from "zod";

export const AdditionalScheam = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, { message: "Name must contain only letters and numbers" })
    .optional(),
  surname: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, { message: "Surname must contain only letters and numbers" })
    .optional(),
});

export type AdditionalScheam = z.infer<typeof AdditionalScheam>;
