import {ReactNode} from "react";

interface BentoGridProps {
    children?: ReactNode
}

const BentoGrid = ({children}: BentoGridProps) => {
    return (
        <section className="grid grid-rows-subgrid-sm">
            {children}
        </section>
    )
}

export default BentoGrid
