import NavigationBar from "@/components/navigation-bar/NavigationBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <NavigationBar />
      {children}
    </SidebarProvider>
  );
}
