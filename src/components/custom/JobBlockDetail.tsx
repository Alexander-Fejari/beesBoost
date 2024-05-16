
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui//card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function JobBlockDetail() {
  return (
    <Card>
      <CardHeader>
          <Avatar>
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <CardTitle>Intitulé du job</CardTitle>
        <CardDescription>
          Description du job
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">

            <div>
              <p className="text-sm font-medium leading-none">Sofia Davis</p>
              <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
          <Popover>
            <PopoverTrigger>
              <Button variant="outline" className="ml-auto">
                Postuler
              </Button>
              </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
             
            </PopoverContent>
            <PopoverTrigger>
              <Button variant="primary" className="ml-auto">
                Envoyer un message
              </Button>
              </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
             
            </PopoverContent>
            </Popover>
        </div>
      </CardContent>
    </Card>
  )
}

export default JobBlockDetail