import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label.tsx";
import { loginSchema, LoginValues } from "@/components/formSchema";
import { useTranslation } from 'react-i18next';

const LogIn = () => {
    const { t } = useTranslation();

    const { register, handleSubmit, formState } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
    });
    
const onSubmit = async (values: LoginValues): Promise<void> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/signIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });
            
            if (!response.ok) {
                throw new Error('Échec de la connexion au serveur');
            }
            
            console.log("Succès")

            const data = await response.json();
            if (data.accessToken) {
                localStorage.setItem('token', data.accessToken);
                localStorage.setItem('username', data.username);

                window.location.href = '/dashboard';
            } else {
                console.log('Échec de la connexion: Token non reçu');
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }
    };

    // const onSubmit = async (values: LoginValues): Promise<void> => {
    //     try {
    //       const response = await fetch('http://localhost:5000/user/login', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(values),
    //       });
      
    //       if (!response.ok) {
    //         throw new Error('Échec de la connexion au serveur');
    //       }
      
    //       console.log('Succès');
      
    //       const data = await response.json();
    //       if (data.token) {
    //         localStorage.setItem('token', data.token);
    //         localStorage.setItem('username', data.username); 
    //         console.log('Token reçu:', data.token);
    //         console.log('Username reçu:', data.username);     
    //         // Update the isConnected field in the user collection
    //         await fetch('http://localhost:5000/user/update-isconnected', {
    //           method: 'PUT',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({ username: values.username, isConnected: true }),
    //         });
      
    //         // Redirection vers la page sécurisée
    //         window.location.href = '/dashboard';
    //       } else {
    //         console.log('Échec de la connexion: Token non reçu');
    //       }
    //     } catch (error) {
    //       console.error('Erreur de connexion:', error);
    //     }
    //   };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-8">
            <section className="flex flex-col items-start space-y-2">
                <Label htmlFor={'email'}>{t('logIn.email')}</Label>
                <Input
                    id={'email'}
                    type="email"
                    placeholder="e-mail"
                    autoComplete="username"
                    {...register("email")}
                    error={formState.errors.email?.message}
                />
            </section>
            <section className="flex flex-col items-start space-y-2">
                <Label htmlFor={'password'}>{t('logIn.password')}</Label>
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
                    {t('logIn.connect')}
                </Button>
            </section>
        </form>
    );
};

export default LogIn;
