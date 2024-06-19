import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { useStudentDetailsStore, StudentDetails } from "@/store/StudentDetailsStore";
import useFormatDate from "@/components/useHook/FormateDate";

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
    const [selectedDates, setSelectedDates] = useState<{ startDate: string, endDate: string | undefined }>({
        startDate: experience.start_date,
        endDate: experience.end_date
    });
    const [currentlyWorking, setCurrentlyWorking] = useState(experience.end_date === null);

    const formattedStartDate = useFormatDate(selectedDates.startDate);
    const formattedEndDate = useFormatDate(selectedDates.endDate);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedDates((prevDates) => ({
            ...prevDates,
            [name]: value
        }));
        setIsModified(true);
    };

    const handleCheckboxChange = () => {
        setCurrentlyWorking((prev) => !prev);
        setSelectedDates((prevDates) => ({
            ...prevDates,
            endDate: currentlyWorking ? undefined : new Date().toISOString().split('T')[0]
        }));
        setIsModified(true);
    };

    const checkIfModified = useCallback(() => {
        const modified = (
            newTitle !== experience.title ||
            newCompany !== experience.company ||
            newLocation !== experience.location ||
            selectedDates.startDate !== experience.start_date ||
            selectedDates.endDate !== experience.end_date ||
            currentlyWorking !== (experience.end_date === null)
        );
        setIsModified(modified);
    }, [newTitle, newCompany, newLocation, selectedDates, currentlyWorking, experience]);

    useEffect(() => {
        checkIfModified();
    }, [checkIfModified]);

    const handleSave = () => {
        if (isModified) {
            const updatedExperience = {
                ...experience,
                title: newTitle,
                company: newCompany,
                location: newLocation,
                start_date: selectedDates.startDate,
                end_date: currentlyWorking ? null : selectedDates.endDate
            };

            updateExperience(experienceIndex, updatedExperience);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><MdEdit /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('edit_experience')}</DialogTitle>
                    <DialogDescription>{t('edit_experience_description')}</DialogDescription>
                </DialogHeader>
                <div>
                    <Label htmlFor="title">{t('title')}</Label>
                    <Input id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <Label htmlFor="company">{t('company')}</Label>
                    <Input id="company" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} />
                    <Label htmlFor="location">{t('location')}</Label>
                    <Input id="location" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
                    <Label htmlFor="startDate">{t('start_date')}</Label>
                    <Input type="date" id="startDate" name="startDate" value={selectedDates.startDate} onChange={handleDateChange} />
                    <Label htmlFor="endDate">{t('end_date')}</Label>
                    {!currentlyWorking && (
                        <Input type="date" id="endDate" name="endDate" value={selectedDates.endDate} onChange={handleDateChange} />
                    )}
                    <div>
                        <input type="checkbox" id="currentlyWorking" checked={currentlyWorking} onChange={handleCheckboxChange} />
                        <Label htmlFor="currentlyWorking">{t('currently_working')}</Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSave} disabled={!isModified}>{t('save')}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default useCardProfileExperienceEdit;
