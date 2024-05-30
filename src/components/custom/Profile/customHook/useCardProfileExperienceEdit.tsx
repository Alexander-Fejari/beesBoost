import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useStudentDetailsStore, StudentDetails } from "@/store/StudentDetailsStore"; // Assurez-vous d'importer correctement le store
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

interface CardProfileExperienceEditProps {
    userId: string;
    studentDetails: StudentDetails;
}

const useCardProfileExperienceEdit = ({ userId, studentDetails }: CardProfileExperienceEditProps) => {
    const { t } = useTranslation('dashboardProfile');
    const [isModified, setIsModified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [newTitle, setNewTitle] = useState(
        studentDetails.experience && studentDetails.experience.length > 0
            ? studentDetails.experience[0].title
            : ''
    );

    const updateExperience = useStudentDetailsStore((state) => state.updateExperience);
    const submitStudentDetails = useStudentDetailsStore((state) => state.submitStudentDetails);

    const checkIfModified = useCallback(() => {
        const modified = (
            newTitle !== (studentDetails.experience && studentDetails.experience.length > 0 ? studentDetails.experience[0].title : '')
        );
        setIsModified(modified);
    }, [newTitle, studentDetails]);

    useEffect(() => {
        checkIfModified();
    }, [checkIfModified]);

    const handleSave = async () => {
        if (!isModified) {
            setErrorMessage('Aucune modification apportée.');
            return;
        }
        const updatedDetails = {
            experience: [{ ...studentDetails.experience[0], title: newTitle }]
        };
        updateExperience(studentDetails.experience[0]._id, { title: newTitle });
        await submitStudentDetails(userId, updatedDetails);
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
                            <Label htmlFor="title" className="break-normal w-full ">
                                {t('resume.title')}
                            </Label>
                            <Textarea id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="col-span-3" />
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

export default useCardProfileExperienceEdit;
