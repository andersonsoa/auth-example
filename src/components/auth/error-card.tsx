import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export function ErrorCard() {
  return (
    <section className="flex justify-center pt-20">
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <h1 className="text-center font-bold text-lg text-destructive">
            Error
          </h1>
        </CardHeader>
        <CardContent>
          <p className="text-center text-zinc-500">Something went wrong</p>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="w-full">
            <Link href="/auth/login">Back to login page.</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
