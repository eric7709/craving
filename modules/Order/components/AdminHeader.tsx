import { useUIStore } from "@/global/store/useUIStore";
import { MenuIcon, X } from "lucide-react";
type Props = {
  children: React.ReactNode;
  title: string;
};
export default function AdminHeader({ children, title }: Props) {
  const { sidebarOpened, toggleSidebar } = useUIStore();
  return (
    <div className="h-14 px-3 border-b sticky top-0 border-gray-300 flex justify-between items-center">
      <div className="flex items-center gap-2">
        {!sidebarOpened ? (
          <MenuIcon size={17} className="lg:hidden shrink-0" onClick={toggleSidebar} />
        ) : (
          <X size={17} onClick={toggleSidebar} className="lg:hidden shrink-0" />
        )}
        <p className="text-base md:text-lg  lg:text-lg  font-semibold">{title}</p>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
