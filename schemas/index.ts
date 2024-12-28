import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export const RegisterSchema = z.object({
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
})

export const ProfileSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    image: z.any()
        .refine((file) => !file || file instanceof File || typeof file === "string", "Must be a file or URL")
        .refine(
            (file) => !file || typeof file === "string" || file.size <= MAX_FILE_SIZE,
            "Max file size is 5MB"
        )
        .refine(
            (file) => !file || typeof file === "string" || SUPPORTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported"
        )
        .nullable(),
    isTwoFactorEnabled: z.boolean(),
})