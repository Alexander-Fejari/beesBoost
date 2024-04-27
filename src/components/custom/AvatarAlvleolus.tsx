import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const AvatarAlveolus = () => {
    return (
        <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JL007</AvatarFallback>
        </Avatar>

    )
}

export default AvatarAlveolus
