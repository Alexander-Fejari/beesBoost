import {NavLink, useLocation} from "react-router-dom";
import {BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,} from "@/components/ui/breadcrumb.tsx";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathName = location.pathname;
    const pathNames = pathName.split("/").filter((x) => x);

    return (
        <BreadcrumbList>
            {pathNames.map((path, index) => {
                const isLast = index === pathNames.length - 1;
                const to = `/${pathNames.slice(0, index + 1).join("/")}`;

                return (
                    <BreadcrumbItem className="text-sm" key={to}>
                        {isLast ? (
                            <BreadcrumbPage>{path}</BreadcrumbPage>
                        ) : (
                            <NavLink to={to}>{path}</NavLink>
                        )}
                        {!isLast && <BreadcrumbSeparator/>}
                    </BreadcrumbItem>
                );
            })}
        </BreadcrumbList>
    );
};

export default Breadcrumbs;
