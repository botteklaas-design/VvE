import { MemberSelector } from "./member-selector";
import { getAllLeden } from "@/lib/queries/leden";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const leden = getAllLeden();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <MobileNav />
        <h2 className="text-lg font-semibold text-gray-900 hidden md:block">
          VvE Transparantieportaal
        </h2>
      </div>
      <MemberSelector leden={leden} />
    </header>
  );
}
