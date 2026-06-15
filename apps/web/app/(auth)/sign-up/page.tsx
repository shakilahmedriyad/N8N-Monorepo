import requireUnauth from "@/lib/auth/require-unauth";
import SignUpForm from "./components/sign-in-form";

export default async function SignUpPage() {
  await requireUnauth();
  return <SignUpForm />;
}
