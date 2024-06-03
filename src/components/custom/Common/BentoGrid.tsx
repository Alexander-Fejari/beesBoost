import {ReactNode} from "react";

interface BentoGridProps {
    children?: ReactNode
}

const BentoGrid = ({children}: BentoGridProps) => {
    return (
        <section className="grid grid-rows-subgrid-sm gap-4">
            {children}
        </section>
    )
}

export default BentoGrid
