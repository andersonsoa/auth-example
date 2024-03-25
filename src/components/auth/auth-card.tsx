import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

interface Props {
  title?: string;
  children?: React.ReactNode;
  footerHref?: string;
  footerText?: string;
  subtitle?: string;
}

export function AuthCard(props: Props) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <h1 className="text-3xl font-bold text-center">{props.title}</h1>
        <p className="text-center text-zinc-500">{props.subtitle}</p>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
      <CardFooter>
        {props.footerHref ? (
          <Button variant="link" className="w-full">
            <Link href={props.footerHref}>{props.footerText}</Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
