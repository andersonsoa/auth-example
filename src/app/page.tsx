import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="p-4">
        <CardTitle>
          <h1 className="text-2xl text-center">Hello Again</h1>
        </CardTitle>
        <CardContent>
          <Button variant="link" className="w-full">
            <Link href="/auth/login">Login</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
