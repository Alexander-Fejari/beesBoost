import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label.tsx";
import { formSchema, FormValues } from "@/components/formSchema";
import { useTranslation } from 'react-i18next';

const SignIn = () => {
    const { t } = useTranslation();
    const { register, handleSubmit, formState, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: FormValues) => {
        try {
            const response = await fetch('http://localhost:5000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            if (!response.ok) {
                throw new Error('Failed to register');
            }

            const data = await response.json();
            if (data.message) {
                console.log(data.message); 
                window.location.href = '/'; 
            } else {
                console.log('Registration failed: No success message received');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const onReset = () => {
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <section className="flex flex-col items-start space-y-2">
                <Label htmlFor={'role'}>{t('signIn.role')}</Label>
                <select
                    id="role"
                    {...register("role")}
                    
                >
                    <option value="worker">{t('signIn.worker')}</option>
                    <option value="student">{t('signIn.student')}</option>
                </select>
                {formState.errors.role && <p className="error-message">{formState.errors.role.message}</p>}
            </section>
            <section className="flex flex-col items-start space-y-2">
                <Label htmlFor={'lastname'}>{t('signIn.lastname')}</Label>
                <Input
                    id={'lastname'}
                    type="text"
                    placeholder="Lastname"
                    {...register("lastname")}
                    error={formState.errors.lastname?.message}
                />
            </section>
            <section className="flex flex-col  items-start space-y-2">
                <Label htmlFor={'firstname'}>{t('signIn.firstname')}</Label>
                <Input
                    id={'firstname'}
                    type="text"
                    placeholder="firstname"
                    {...register("firstname")}
                    error={formState.errors.firstname?.message}
                />
            </section>
            <section className="flex flex-col  items-start space-y-2">
                <Label htmlFor={'email'}>{t('signIn.email')}</Label>
                <Input
                    id={'email'}
                    type="email"
                    placeholder="e-mail"
                    autoComplete="username"
                    {...register("email")}
                    error={formState.errors.email?.message}
                />
            </section>
            <section className="flex flex-col  items-start space-y-2">
                <Label htmlFor={'username'}>{t('signIn.username')}</Label>
                <Input
                    id={'username'}
                    type="text"
                    placeholder="username"
                    {...register("username")}
                    error={formState.errors.username?.message}
                />
            </section>
            <section className="flex flex-col items-start space-y-2">
                <Label htmlFor={'password'}>{t('signIn.password')}</Label>
                <Input
                    id={'password'}
                    type="password"
                    placeholder="password"
                    autoComplete="current-password"
                    {...register("password")}
                    error={formState.errors.password?.message}
                />
            </section>
            <section className="flex justify-center items-center space-x-8">
                <Button type="submit" disabled={formState.isSubmitting}>
                    {t('signIn.submit')}
                </Button>
                <Button type="reset" variant={'destructive'} onClick={onReset}>
                    {t('signIn.reset')}
                </Button>
            </section>
        </form>
    );
};

export default SignIn;
