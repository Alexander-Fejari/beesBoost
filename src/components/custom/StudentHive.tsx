import { useTranslation } from "react-i18next";
import HiveSVG from "./HiveSVG";
import { useEffect, useState } from "react";

interface StudentProps {
    className?: string;
    numHives?: number;  // Nouveau paramètre pour contrôler le nombre de hives
}

interface User {
    id: number;
    photoUrl: string;
}

const StudentHive = ({ className, numHives = 3 }: StudentProps) => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<User[]>([]);

    // Récupérer les données des utilisateurs
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('https://api.example.com/users');
            const data = await response.json();
            setUsers(data.slice(0, numHives)); // Limite le nombre d'utilisateurs à `numHives`
        };

        fetchUsers();
    }, [numHives]);

    // Génération des hives avec les utilisateurs
    const hives = users.map((user, index) => (
        <HiveSVG key={index}
                 className={'group-hover:fill-primary'}
                 fillColor={'fill-transparent'}
                 strokeWidth={10}
                 strokeColor={'stroke-primary'}
                 size={'w-35 h-35'}
                
        >
            <img src={user.photoUrl} alt={`User ${index}`} className="w-full h-full" />
        </HiveSVG>
    ));

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <div className="flex justify-center">
                    {hives}
                </div>
                {/* Une deuxième série de hives si nécessaire */}
                <div className="flex justify-center">
                    {hives}
                </div>
            </div>
        </div>
    );
}

export default StudentHive;

