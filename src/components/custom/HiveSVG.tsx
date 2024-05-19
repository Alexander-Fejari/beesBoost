import {ReactNode} from "react";

interface HiveSVGProps {
    size: string
    strokeColor: string
    strokeWidth: number
    fillColor: string
    className?: string
    children?: ReactNode
    showClipPath?: boolean
}

const HiveSVG = ({
                     size,
                     strokeColor,
                     strokeWidth,
                     fillColor,
                     className,
                     children,
                     showClipPath
                 }: HiveSVGProps) => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
         className={`${size}`}
         viewBox="0 0 200 173.20508075688772">
        {showClipPath ? (
            <defs>
                <clipPath id="hive-clip">
                    <path
                        className={`${strokeColor} ${fillColor} ${className}`}
                        strokeWidth={strokeWidth}
                        d="M0 86.60254037844386L50 0L150 0L200 86.60254037844386L150 173.20508075688772L50 173.20508075688772Z"
                        id="hive-path"/>
                </clipPath>
            </defs>
        ) : <path
            className={`${strokeColor} ${fillColor} ${className}`}
            strokeWidth={strokeWidth}
            d="M0 86.60254037844386L50 0L150 0L200 86.60254037844386L150 173.20508075688772L50 173.20508075688772Z"
        />}
        <g clipPath={showClipPath ? "url(#hive-clip)" : undefined}>
            {children}
        </g>
    </svg>
);

export default HiveSVG;
