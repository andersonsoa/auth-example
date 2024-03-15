import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <section className="w-full">
      <div className="mx-auto w-[400px]">
        <pre>{JSON.stringify(session, null, 2)}</pre>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </section>
  );
}
