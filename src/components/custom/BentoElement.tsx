import {ReactNode} from "react";

interface BentoElementProps {
    size: string
    children: ReactNode
}

const BentoElement = ({size, children}: BentoElementProps) => {
    return (
        <section className={`${size} bg-muted/10 p-4 rounded-xl border-[0.25px] border-muted shadow-lg dark:shadow-inverse-lg`}>
            {children}
        </section>
    )
}

export default BentoElement