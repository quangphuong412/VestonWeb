import { z } from "zod";

export const LoginFormValidations = z.object({
    usrname: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string()
})


