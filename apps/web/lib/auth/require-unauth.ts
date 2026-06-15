import { auth } from "@repo/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function requireUnauth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) redirect("/");
}
