import NavigationHeader from "@/components/navigation-bar/Navigation-header";
import NavigationBar from "@/components/navigation-bar/NavigationBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import getUser from "@/lib/auth/get-user";
import requireAuth from "@/lib/auth/require-auth";
import { PropsWithChildren } from "react";

export default async function RootLayout({ children }: PropsWithChildren) {
  await requireAuth();
  const user = await getUser();
  return (
    <SidebarProvider>
      <NavigationBar user={user} />
      <div className="w-full flex flex-col">
        <NavigationHeader />
        {children}
      </div>
    </SidebarProvider>
  );
}
