import requireAuth from "@/lib/auth/require-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/workflows");
  return <div></div>;
}
