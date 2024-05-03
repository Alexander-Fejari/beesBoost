import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

export function LegalSelector() {

    return (

        <Select defaultValue={'rgpd'}>
            <SelectTrigger className="w-max bg-primary text-accent-foreground text-xs font-bold">
                <SelectValue placeholder="Politique de confidentialité" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="rgpd">Politique de confidentialité</SelectItem>
                <SelectItem value="legal">Mentions Légales</SelectItem>
            </SelectContent>
        </Select>
    )
}
