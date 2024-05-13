import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {useTranslation} from 'react-i18next';
import {redirect} from "react-router-dom";


const LogOut = () => {
    const {t} = useTranslation();

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('username');

        redirect("/")
    };

    return (
        <Popover>
            <PopoverTrigger>
                <Avatar>
                    <AvatarImage
                        className="alveolus"
                        src="https://github.com/shadcn.png"
                    />
                    <AvatarFallback>JL007</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-full mt-2 flex items-center gap-x-4">
                <Button size={"lg"} variant={"primary"}>
                    {t('logOut.settings')}
                </Button>
                <Button size={"lg"} variant={"black"} onClick={handleLogout}>
                    {t('logOut.out')}
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export default LogOut;
