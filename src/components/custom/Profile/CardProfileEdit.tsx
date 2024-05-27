import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {MdEdit} from "react-icons/md";
import UserDetails from "@/store/UserDetailsStore";
import {useState} from "react";

interface cardProfileEditProps {
    userId: string;
    userDetails: UserDetails;
    updateUserDetails: (details: Partial<UserDetails>) => void;
    submitUserDetails: (userId: string, details: Partial<UserDetails>) => Promise<void>;

}

const cardProfileEdit = ({ userId, userDetails, updateUserDetails, submitUserDetails }: cardProfileEditProps) => {
    const [newFirstname, setNewFirstname] = useState(userDetails.firstname);
    const [newLastname, setNewLastname] = useState(userDetails.lastname);
    const [newOccupation, setNewOccupation] = useState(userDetails.occupation);

    const handleSave = async () => {
        const updatedDetails = {firstname: newFirstname, lastname: newLastname, occupation: newOccupation};
        updateUserDetails(updatedDetails);
        await submitUserDetails(userId, updatedDetails);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><MdEdit/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <section>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="firstname" className="text-right">
                                {userDetails.firstname}
                            </Label>
                            <Input id="firstname" value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lastname" className="text-right">
                                {userDetails.lastname}
                            </Label>
                            <Input id="lastname" value={newLastname} onChange={(e)=> setNewLastname(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="occupation" className="text-right">
                                {userDetails.occupation}
                            </Label>
                            <Input id="occupation" value={newOccupation} onChange={(e)=> setNewOccupation(e.target.value)} className="col-span-3" />
                        </div>
                    </div>
                </section>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default cardProfileEdit
