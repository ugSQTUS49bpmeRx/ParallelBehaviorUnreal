import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { pageData } from "@/data/pageData";

interface MainNavigationProps {
  className?: string;
}

const MainNavigation: React.FC<MainNavigationProps> = ({ className }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Group pages by category for dropdown menus
  const featurePages = pageData.filter(
    (page) =>
      page.id !== "home" &&
      !page.id.includes("compliance") &&
      !page.id.includes("agreement"),
  );

  const compliancePages = pageData.filter(
    (page) => page.id.includes("compliance") || page.id.includes("agreement"),
  );

  return (
    <NavigationMenu className={cn("z-10", className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              active={currentPath === "/"}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {featurePages.map((page) => (
                <li key={page.id}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={`/${page.id}`}
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        currentPath === `/${page.id}` &&
                          "bg-accent text-accent-foreground",
                      )}
                    >
                      <div className="text-sm font-medium leading-none">
                        {page.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {page.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Compliance</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              {compliancePages.map((page) => (
                <li key={page.id}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={`/${page.id}`}
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        currentPath === `/${page.id}` &&
                          "bg-accent text-accent-foreground",
                      )}
                    >
                      <div className="text-sm font-medium leading-none">
                        {page.title}
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {page.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/admin-preview">
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              active={currentPath === "/admin-preview"}
            >
              Admin Demo
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" asChild>
          <Link to="/auth/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/auth/register">Sign Up</Link>
        </Button>
      </div>
    </NavigationMenu>
  );
};

export default MainNavigation;
