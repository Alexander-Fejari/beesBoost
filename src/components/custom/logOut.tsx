import {  Popover,  PopoverContent,  PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

interface LogOut {
  className?: string;
}

const LogOut = ({ className }: LogOut) => {

    const { t } = useTranslation();

    const handleLogout = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('username');


        window.location.href = '/';
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
      <PopoverContent className="mt-2">
        <Button size={"lg"} variant={"primary"}>
          Settings
        </Button>
        <Button size={"lg"} variant={"black"} onClick={handleLogout}>
          Log Out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default LogOut;
