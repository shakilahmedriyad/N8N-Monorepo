import { auth } from "@repo/auth/auth";
import { headers } from "next/headers";
import "server-only";

export default async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
