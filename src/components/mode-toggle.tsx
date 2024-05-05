
import { CiLight, CiDark } from "react-icons/ci";
import {Button} from "@/components/ui/button"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {useTheme} from "@/components/theme-provider"

export function ModeToggle() {
    const {setTheme} = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="primary" size="icon">
                    <CiLight
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                    <CiDark
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                   <CiLight className={'h-[1.2rem] w-[1.2rem]'}/>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                   <CiDark className={'h-[1.2rem] w-[1.2rem]'}/>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
