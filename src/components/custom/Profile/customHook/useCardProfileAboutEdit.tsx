import { useState, useEffect, useCallback } from "react";
import UserDetails from "@/store/UserDetailsStore";
import { useTranslation } from "react-i18next";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MdEdit } from "react-icons/md";

interface CardProfileAboutEditProps {
    userId: string;
    userDetails: UserDetails;
    updateUserDetails: (details: Partial<UserDetails>) => void;
    submitUserDetails: (userId: string, details: Partial<UserDetails>) => Promise<void>;
}

const useCardProfileAboutEdit = ({ userId, userDetails, updateUserDetails, submitUserDetails }: CardProfileAboutEditProps) => {
    const { t } = useTranslation('dashboardProfile');
    const [isModified, setIsModified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [newDescription, setNewDescription] = useState(userDetails.description);

    const checkIfModified = useCallback(() => {
        const modified = (
            newDescription !== userDetails.description
        );
        setIsModified(modified);
    }, [newDescription, userDetails]);

    useEffect(() => {
        checkIfModified();
    }, [checkIfModified]);

    const handleSave = async () => {
        if (!isModified) {
            setErrorMessage('Aucune modification apportée.');
            return;
        }
        const updatedDetails = {
            description: newDescription,
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
                    <div className="grid gap-4 py-4 h-full">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="break-normal w-full ">
                                {t('resume.description')}
                            </Label>
                            <Textarea id="description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="col-span-3" />
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

export default useCardProfileAboutEdit;
