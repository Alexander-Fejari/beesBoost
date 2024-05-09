import { useTranslation } from "react-i18next";
import HiveSVG from "./HiveSVG";

interface StudentProps {
    className?: string;
}

const StudentHive = ({ className }: StudentProps) => {
    const { t } = useTranslation();

    // Créer un tableau de 5 hives
    const hives = Array.from({ length: 5 }, (_, index) => (
        <HiveSVG key={index}
                 className={' group-hover:fill-primary'}
                 fillColor={'fill-transparent'}
                 strokeWidth={10}
                 strokeColor={'stroke-primary'}
                 size={'w-35 h-35'}
        />
    ));

    return (
        <div className="w-10 justify-center items-center">
            {hives}
        </div>
    );
}

export default StudentHive;
