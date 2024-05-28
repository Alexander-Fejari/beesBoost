import {ReactNode} from "react";

interface BentoElementProps {
    size: string
    children: ReactNode,
    className?: string
}

const BentoElement = ({size, children, className}: BentoElementProps) => {

    return (
        <section className={`${size} ${className} bg-muted/10 rounded-xl border-[0.25px] border-muted shadow-lg dark:shadow-inverse-lg`}>
            {children}
        </section>
    )
}

export default BentoElement
