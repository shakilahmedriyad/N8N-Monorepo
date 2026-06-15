import requireUnauth from "@/lib/auth/require-unauth";
import SignInForm from "./components/sign-in-form";

export default async function SignInPage() {
  await requireUnauth();
  return <SignInForm />;
}
