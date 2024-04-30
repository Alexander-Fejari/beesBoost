import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

export function LegalSelector() {

    return (

        <Select>
            <SelectTrigger className="w-auto border-none text-xs">
                <SelectValue placeholder="Politique de confidentialité" />
            </SelectTrigger>
            <SelectContent className="text-xs">
                <SelectItem value="rgpd">Politique de confidentialité</SelectItem>
                <SelectItem value="legal">Mentions Légales</SelectItem>
            </SelectContent>
        </Select>
    )
}