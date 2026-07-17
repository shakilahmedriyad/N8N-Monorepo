import type { Metadata } from "next";
import "./globals.css";
import { Raleway, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TRPCReactProvider } from "@/lib/trpc/trpc";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactFlowProvider } from "@xyflow/react";

const montserratHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const raleway = Raleway({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Automation Studio",
  description: "Your automation companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans bg-accent-foreground",
        raleway.variable,
        montserratHeading.variable,
      )}
    >
      <NuqsAdapter>
        <TRPCReactProvider>
          <ReactFlowProvider>
            <body>
              <TooltipProvider>
                {children}
                <Toaster />
              </TooltipProvider>
            </body>
          </ReactFlowProvider>
        </TRPCReactProvider>
      </NuqsAdapter>
    </html>
  );
}
