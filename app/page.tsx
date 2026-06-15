import { ChartColumnBigIcon } from "lucide-react";
import Image from "next/image";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-100 h-[calc(100vh-80px)] flex items-center justify-center bg-white relative">
      <Image src="/cover.webp" fill className="opacity-50" alt="Cover Image" />
      <div className="relative z-10 flex flex-col gap-4">
        <h1 className="text-5xl font-bold flex gap-1 items-center justify-center">
          <ChartColumnBigIcon className="text-lime-500" size={60} /> NextCash
        </h1>
        <Show when="signed-in">
          <Button asChild size="lg">
            <Link href="/dashboard">Got to Dashboard</Link>
          </Button>
          <p className="text-2xl">Track your finances with ease</p>
        </Show>
        <Show when="signed-out">
          <div className="flex gap-2 items-center justify-center">
            <Button asChild size="lg" className="bg-lime-600 hover:bg-lime-500">
              <SignInButton />
            </Button>
            <Button asChild size="lg">
              <SignUpButton />
            </Button>
          </div>
        </Show>
      </div>
    </main>
  );
}
