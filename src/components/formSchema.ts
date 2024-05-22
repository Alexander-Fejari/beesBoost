import * as z from 'zod';

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

export const postFormSchema = z.object({
    field: z.string().min(2, { message: "Give more details about the field, please." }),
    function: z.string().min(2, { message: "Give the complete title of the function, please." }),
    start_date: z.string().refine((value) => new Date(value) > new Date(), {
      message: "Start date must be after the current date.",
    }),
    duration: z.number().int().positive({ message: "Duration must be positive." }),
    title: z.string().min(2, { message: "Give the complete title of the function, please." }),
    location: z.string().min(2, { message: "Give the location, please." }),
    body: z.object({
      description: z.string().min(10, { message: "Description must be at least 10 characters long." }),
      requirements: z.string().refine(value => value.split(',').every(item => item.trim().length > 0), {
        message: "Requirements must have at least one item."
      }),
      nice_to_have: z.string().optional().refine(value => !value || value.split(',').every(item => item.trim().length > 0), {
        message: "Nice to have must have valid items."
      }),
      benefits: z.string().refine(value => value.split(',').every(item => item.trim().length > 0), {
        message: "Benefits must have at least one item."
      }),
    }),
  });
  
  export type PostValues = z.infer<typeof postFormSchema>;