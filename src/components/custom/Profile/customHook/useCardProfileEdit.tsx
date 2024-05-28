import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MdEdit } from "react-icons/md";
import UserDetails from "@/store/UserDetailsStore";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

interface CardProfileEditProps {
    userId: string;
    userDetails: UserDetails;
    updateUserDetails: (details: Partial<UserDetails>) => void;
    submitUserDetails: (userId: string, details: Partial<UserDetails>) => Promise<void>;
}

const useCardProfileEdit = ({ userId, userDetails, updateUserDetails, submitUserDetails }: CardProfileEditProps) => {
    const { t } = useTranslation('dashboardProfile');

    const [newFirstname, setNewFirstname] = useState(userDetails.firstname);
    const [newLastname, setNewLastname] = useState(userDetails.lastname);
    const [newOccupation, setNewOccupation] = useState(userDetails.occupation);
    const [newPickUpLine, setNewPickUpLine] = useState(userDetails.pick_up_line);
    const [isModified, setIsModified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const checkIfModified = useCallback(() => {
        const modified = (
            newFirstname !== userDetails.firstname ||
            newLastname !== userDetails.lastname ||
            newOccupation !== userDetails.occupation ||
            newPickUpLine !== userDetails.pick_up_line
        );
        setIsModified(modified);
    }, [newFirstname, newLastname, newOccupation, newPickUpLine, userDetails]);

    useEffect(() => {
        checkIfModified();
    }, [checkIfModified]);

    const handleSave = async () => {
        if (!isModified) {
            setErrorMessage('Aucune modification apportée.');
            return;
        }

        const updatedDetails = {
            firstname: newFirstname,
            lastname: newLastname,
            occupation: newOccupation,
            pick_up_line: newPickUpLine
        };
        updateUserDetails(updatedDetails);
        await submitUserDetails(userId, updatedDetails);
        setErrorMessage(''); // Clear error message on successful save
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><MdEdit /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t('resume.title')}</DialogTitle>
                    <DialogDescription>
                        {t('resume.desc')}
                    </DialogDescription>
                </DialogHeader>
                <section>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="firstname">
                                {t('resume.firstname')}
                            </Label>
                            <Input id="firstname" value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lastname">
                                {t('resume.lastname')}
                            </Label>
                            <Input id="lastname" value={newLastname} onChange={(e) => setNewLastname(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="occupation">
                                {t('resume.occupation')}
                            </Label>
                            <Input id="occupation" value={newOccupation} onChange={(e) => setNewOccupation(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="pickUpLine" className="break-normal w-full ">
                                {t('resume.pickUpLine')}
                            </Label>
                            <Textarea id="pickUpLine" value={newPickUpLine} onChange={(e) => setNewPickUpLine(e.target.value)} className="col-span-3" />
                        </div>
                    </div>
                </section>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave} disabled={!isModified}>
                        {t('edit.cta')}
                    </Button>
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default useCardProfileEdit;
