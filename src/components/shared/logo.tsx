import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { LoaderPinwheel } from "lucide-react";

const Logo = () => {
  return (
    <Link href="/" className=" flex items-center gap-2 ">
      <Button size="icon" variant="secondary">
        <LoaderPinwheel />
      </Button>
    </Link>
  );
};

export default Logo;
