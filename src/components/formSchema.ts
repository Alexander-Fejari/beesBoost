import {z} from "zod";


export type FormValues = {
    lastname: string;
    firstname: string;
    email: string;
    pseudo: string;
    password: string;

};

export const formSchema = z.object({
    lastname: z.string().min(2, {message: "lastname must be at least 2 characters."}),
    firstname: z.string().min(2, {message: "firstname must be at least 2 characters."}),
    email: z.string().email({message: "Invalid email address."}),
    pseudo: z.string().min(3, {message: "Pseudo must be at least 3 characters."}),
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            message: "Password must be at least 8 characters, with at least one uppercase letter, one special character, and one digit."
        })
});