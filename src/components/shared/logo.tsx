import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { LoaderPinwheel } from "lucide-react";

const Logo = () => {
  return (
    <Link href="/" className=" flex items-center gap-2 ">
      <Image
        src="/logo.png"
        width={36}
        height={36}
        alt="Logo"
        className="h-8 w-8"
      />
    </Link>
  );
};

export default Logo;
