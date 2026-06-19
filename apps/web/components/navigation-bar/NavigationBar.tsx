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
import { BlocksIcon, DatabaseIcon, RocketIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserMenu } from "../user/user-menu";
import Image from "next/image";

export default function NavigationBar({ user }: { user: any }) {
  const pathname = usePathname();
  const NavItems = [
    {
      pathname: "/workflows",
      label: "Workflows",
      isActive: pathname === "/workflows",
      icon: <BlocksIcon />,
    },
    {
      pathname: "/credentials",
      label: "Credentials",
      isActive: pathname === "/credentials",
      icon: <DatabaseIcon />,
    },
    {
      pathname: "/executions",
      label: "Executions",
      isActive: pathname === "/executions",
      icon: <RocketIcon />,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/">
                <SidebarMenuButton asChild>
                  <div className="flex items-center gap-x-2">
                    <Image
                      src={"/logo/logo.svg"}
                      alt="Automation studio"
                      width={34}
                      height={34}
                      loading="eager"
                    />
                    <span className=" font-semibold font-heading">
                      Automation Studio
                    </span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between">
        <SidebarGroup className="flex flex-col gap-y-2.5">
          <SidebarMenu>
            {NavItems.map((item) => (
              <SidebarMenuItem key={item.pathname}>
                <SidebarMenuButton asChild isActive={item.isActive}>
                  <Link href={item.pathname} className="">
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
