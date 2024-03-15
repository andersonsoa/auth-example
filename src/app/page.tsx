import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello Again</h1>
      <Button variant="link">
        <Link href="/auth/login">Login</Link>
      </Button>
    </main>
  );
}
