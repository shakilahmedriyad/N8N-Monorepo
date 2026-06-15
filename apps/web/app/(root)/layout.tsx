import NavigationBar from "@/components/navigation-bar/NavigationBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import requireAuth from "@/lib/auth/require-auth";
import { PropsWithChildren } from "react";

export default async function RootLayout({ children }: PropsWithChildren) {
  // await requireAuth();
  return (
    <SidebarProvider>
      <NavigationBar />
      {children}
    </SidebarProvider>
  );
}
