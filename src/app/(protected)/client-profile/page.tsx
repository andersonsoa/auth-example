"use client"

import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

export default function ProfilePage() {
  const session = useCurrentUser();

  const signOut = () => logout()
  return (
    <section className="w-full">
      <div className="mx-auto w-[400px]">
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <Button onClick={signOut}>Logout</Button>
      </div>
    </section>
  );
}
