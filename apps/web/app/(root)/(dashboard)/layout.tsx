import NavigationHeader from "@/components/navigation-bar/Navigation-header";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex flex-col w-full">
      <NavigationHeader />
      {children}
    </main>
  );
}
