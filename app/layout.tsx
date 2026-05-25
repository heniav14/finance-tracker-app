import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Button } from "../components/ui/button";
import UserDropdown from "../components/ui/user-dropdown"
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";
import Link from "next/link";
import { ChartColumnBigIcon } from "lucide-react";


const poppins = Poppins({
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "600",
    "700",
    "800",
    "900",
  ],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "This is it!",
  description: "About ot be changed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${poppins.variable} h-full antialiased`}>
        <body className="min-h-full flex flex-col">
          <nav className="bg-primary p-4 text-white h-20 flex items-center justify-between">
            <Link
              href="/"
              className="font-bold text-xl flex gap-1 items-center"
            >
              <ChartColumnBigIcon className="text-lime-500" />
              Next Cash
            </Link>
            <div>
              <Show when="signed-out">
                <div className="flex items-center">
                  <Button asChild variant="link" className="text-white">
                    <SignInButton />
                  </Button>
                  <Button asChild variant="link" className="text-white">
                    <SignUpButton />
                  </Button>
                </div>
              </Show>
              <Show when="signed-in">
                <UserDropdown />
              </Show>
            </div>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
