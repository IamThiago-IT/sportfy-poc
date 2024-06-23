import Image from "next/image";
import { ModeToggle } from "./theme/theme";
import  LogoApp  from "@/app/sportfy.jpg"

export default function Header() {
  return (
    <div className="p-12 bg-slate-950 dark:bg-[#202024] text-slate-50 flex items-center justify-between">
      <h1 className="text-center">Modalidades | POC</h1>
      <Image src={ LogoApp } alt="logo" height="150" width="150"/>
      <ModeToggle />
    </div>
  );
}
