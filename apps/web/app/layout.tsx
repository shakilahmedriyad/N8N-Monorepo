import type { Metadata } from "next";
import "./globals.css";
import TrpcProvider from "../providers/TrpcProvider";
import { Raleway, Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const montserratHeading = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

const raleway = Raleway({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "N8N",
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
      className={cn("font-sans", raleway.variable, montserratHeading.variable)}
    >
      <body>
        <TrpcProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
