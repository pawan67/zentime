import { Settings } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import Logo from "./logo";
import Link from "next/link";
import { ThemeToggle } from "../theme/theme-toggle";

const Header = () => {
  return (
    <header className=" my-3 flex items-center justify-between">
      <Logo />

      <div className=" flex gap-2 items-center">
        <ThemeToggle />
        <Link
          className={buttonVariants({
            size: "icon",
            variant: "secondary",
          })}
          href="/settings"
        >
          <Settings />
        </Link>
      </div>
    </header>
  );
};

export default Header;
