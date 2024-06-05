import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MdEdit } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useStudentDetailsStore, StudentDetails } from "@/store/StudentDetailsStore";

interface CardProfileExperienceEditProps {
    studentDetails: StudentDetails;
    experienceIndex: number;
    userId: string;
}

const useCardProfileExperienceEdit = ({ studentDetails, experienceIndex }: CardProfileExperienceEditProps) => {
    const { t } = useTranslation('dashboardProfile');
    const [isModified, setIsModified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const updateExperience = useStudentDetailsStore((state) => state.updateExperience);

    const experience = studentDetails.experience[experienceIndex];

    const [newTitle, setNewTitle] = useState(experience.title);
    const [newCompany, setNewCompany] = useState(experience.company);
    const [newLocation, setNewLocation] = useState(experience.location);
    const [selectedDates, setSelectedDates] = useState<{ startDate: Date | undefined, endDate: Date | undefined }>({
        startDate: new Date(experience.start_date),
        endDate: new Date(experience.end_date)
    });

    const checkIfModified = useCallback(() => {
        const modified = (
            newTitle !== experience.title ||
            newCompany !== experience.company ||
            newLocation !== experience.location ||
            selectedDates.startDate?.toISOString() !== new Date(experience.start_date).toISOString() ||
            selectedDates.endDate?.toISOString() !== new Date(experience.end_date).toISOString()
        );
        setIsModified(modified);
    }, [newTitle, newCompany, newLocation, selectedDates, experience]);

    useEffect(() => {
        checkIfModified();
    }, [checkIfModified]);

    const handleSave = async () => {
        if (!isModified) {
            setErrorMessage('Aucune modification apportée.');
            return;
        }

        const updatedExperience = {
            ...experience,
            title: newTitle,
            company: newCompany,
            location: newLocation,
            start_date: selectedDates.startDate?.toISOString(),
            end_date: selectedDates.endDate?.toISOString()
        };

        updateExperience(experience._id, updatedExperience);

        setErrorMessage('');
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><MdEdit /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t('resume.title')}</DialogTitle>
                    <DialogDescription>{t('resume.desc')}</DialogDescription>
                </DialogHeader>
                <section>
                    <div className="grid gap-4 py-4 h-full">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="break-normal w-full ">{t('experience.title')}</Label>
                            <Textarea id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="col-span-3" />

                            <Label htmlFor="company" className="break-normal w-full ">{t('experience.company')}</Label>
                            <Textarea id="company" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} className="col-span-3" />

                            <Label htmlFor="location" className="break-normal w-full ">{t('experience.location')}</Label>
                            <Textarea id="location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} className="col-span-3" />

                            <Label htmlFor="dates" className="break-normal w-full ">{t('experience.dates')}</Label>
                            <Calendar
                                selected={selectedDates}
                                onSelect={(date: Date | undefined, isStartDate: boolean) => {
                                    setSelectedDates(prevDates => ({
                                        ...prevDates,
                                        [isStartDate ? 'startDate' : 'endDate']: date
                                    }));
                                }}
                                className="col-span-3"
                            />
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
