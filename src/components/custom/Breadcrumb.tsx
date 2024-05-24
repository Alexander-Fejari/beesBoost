import { NavLink, useLocation } from "react-router-dom";
import {
  BreadcrumbList,
  BreadcrumbItem,

  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <BreadcrumbList>
                {pathnames.map((path, index) => {
                    const isLast = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                    return (
                        <BreadcrumbItem className="text-lg" key={to}>
                            {isLast ? (
                                <BreadcrumbPage>{path}</BreadcrumbPage>
                            ) : (
                                <NavLink to={to}>{path}</NavLink>
                            )}
                            {!isLast && <BreadcrumbSeparator />}
                        </BreadcrumbItem>
                    );
                })}
    </BreadcrumbList>
  );
};

export default Breadcrumbs;