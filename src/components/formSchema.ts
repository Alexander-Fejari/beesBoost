import {z} from "zod";


export type FormValues = {
    lastname: string;
    firstname: string;
    email: string;
    username: string;
    role: 'student' | 'worker';
    password: string;
   
};

export const formSchema = z.object({
    lastname: z.string().min(2, {message: "lastname must be at least 2 characters."}),
    firstname: z.string().min(2, {message: "firstname must be at least 2 characters."}),
    email: z.string().email({message: "Invalid email address."}),
    username: z.string().min(3, {message: "username must be at least 3 characters."}).max(23, {message: "username cannot exceed 23 characters."}),
    password: z.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
            message: "Password must be at least 8 characters, with at least one uppercase letter, one special character, and one digit."
        }),
    role: z.enum(['student', 'worker']),
});


export type LoginValues = {

    email: string;

    password: string;

};


export const loginSchema = z.object({

    email: z.string().email({message: "Invalid email address."}),

    password: z.string().min(8, {message: "Password must be at least 8 characters."}),

});