"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Activity, BlocksIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "../user/user-menu";

export default function NavigationBar({ user }: { user: any }) {
  const pathname = usePathname();
  const NavItem = [
    {
      label: "Workflow",
      url: "/workflow",
      isActive: pathname.includes("/workflow"),
      icon: <BlocksIcon size={18} />,
    },
    {
      label: "Execution",
      url: "/execution",
      isActive: pathname.includes("/execution"),
      icon: <Activity size={18} />,
    },
    {
      label: "Editor",
      url: "/editor",
      isActive: pathname.includes("/editor"),
      icon: <PencilIcon size={18} />,
    },
  ];

  return (
    <Sidebar variant="floating">
      <SidebarHeader />
      <SidebarContent className="flex flex-col justify-between">
        <SidebarGroup className="flex flex-col gap-y-2.5">
          <SidebarMenu>
            {NavItem.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <Link key={item.url} href={item.url} className="">
                    <p className="flex text-sm gap-x-3.5">
                      {item.icon} {item.label}
                    </p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <UserMenu user={user} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
