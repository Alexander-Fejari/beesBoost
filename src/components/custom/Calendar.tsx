import React from "react";


import { Calendar } from "@/components/ui/calendar";
import { enGB, fr, nlBE } from "date-fns/locale";

const CustomCalendar = () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <div>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
                locale={fr} 
                
            />
        </div>
    );
};

export default CustomCalendar;