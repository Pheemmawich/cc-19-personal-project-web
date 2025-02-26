import { z } from "zod"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9]{10,15}$/;

export const registerSchema = z.object({
    identity: z.string().refine(
        (value) => emailRegex.test(value) || phoneRegex.test(value),
        { message: "ต้องเป็น Email หรือหมายเลขโทรศัพท์เท่านั้น" }
    ),
    firstname: z.string().min(3, "Firstname ต้องมากกว่า 3 อักขระ"),
    lastname: z.string().min(3, "Lastname ต้องมากกว่า3อักขระ"),
    password: z.string().min(6, "Password ต้องมากกว่า 6 อักขระ"),
    confirmPassword: z.string().min(6, "Confirm Password ต้องมากกว่า 6 อักขระ")
    }).refine((data) => data.password === data.confirmPassword,{
        message: "Confirm Password ไม่ตรงกัน",
        path:["confirmPassword"]
    })

    export const loginSchema = z.object({
        identity: z.string().refine(
            (value) => emailRegex.test(value) || phoneRegex.test(value),
            { message: "Email or Phone Number invalid" }
        ),
        password: z.string().min(6, "Password ต้องมากกว่า 6 อักขระ"),
    })