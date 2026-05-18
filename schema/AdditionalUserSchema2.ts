import { z } from "zod";

export const AdditionalScheam2 = z.object({
    useCase: z.enum(["WORK", "STUDY", "PERSONAL_USE"], {
        error: "You need to  select one option.",
    })
})

export type AdditionalScheam2 = z.infer<typeof AdditionalScheam2>;