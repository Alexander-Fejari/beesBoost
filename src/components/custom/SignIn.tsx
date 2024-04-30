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

    const onSubmit = (values: FormValues) => {
        console.log(values);
    };

    const onReset = () => {
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                    {...register("email")}
                    error={formState.errors.email?.message}
                />
            </section>
            <section className="flex flex-col  items-start space-y-2">
                <Label htmlFor={'pseudo'}>{t('signIn.pseudo')}</Label>
                <Input
                    id={'pseudo'}
                    type="text"
                    placeholder="pseudo"
                    {...register("pseudo")}
                    error={formState.errors.pseudo?.message}
                />
            </section>
            <section className="flex flex-col items-start space-y-2">
                <Label htmlFor={'password'}>{t('signIn.password')}</Label>
                <Input
                    id={'password'}
                    type="password"
                    placeholder="password"
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