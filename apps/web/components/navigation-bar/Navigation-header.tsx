import { SidebarTrigger } from "../ui/sidebar";

export default function NavigationHeader() {
  return (
    <div className="bg-sidebar-accent border-b py-3 px-3">
      <SidebarTrigger />
    </div>
  );
}
