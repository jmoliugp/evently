import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { assets } from "@/lib/constants";
import Image from "next/image";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <Image
            src={assets.menu}
            alt="menu"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white md:hidden">
          <Image src={assets.logo} alt="logo" width={128} height={38} />
          <NavItems />
          <Separator className="border border-gray-50" />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
