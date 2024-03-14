import { auth } from "@/lib/auth";

export default auth((req) => {
  console.log({ x: "executing middleware" });
});

export const config = {
  matcher: "/protected/:path*",
};
