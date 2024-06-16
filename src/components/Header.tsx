import { ModeToggle } from "./theme/theme";

export default function Header() {
  return (
    <div className="p-12 bg-slate-950 dark:bg-slate-800 text-slate-50 flex items-center justify-between">
      <h1 className="text-center">Modalidades | POC</h1>
      <ModeToggle />
    </div>
  );
}
