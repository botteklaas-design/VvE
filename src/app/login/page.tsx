import { LoginForm } from "@/components/auth/login-form";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; redirect?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/");

  const params = await searchParams;

  const errorMessages: Record<string, string> = {
    missing_token: "Ongeldige inloglink.",
    invalid_token: "Deze inloglink bestaat niet.",
    token_used: "Deze inloglink is al gebruikt. Vraag een nieuwe aan.",
    token_expired: "Deze inloglink is verlopen. Vraag een nieuwe aan.",
  };

  const errorMessage = params.error ? errorMessages[params.error] : undefined;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">VvE Portaal</h1>
          <p className="text-gray-600 mt-2">Log in met je e-mailadres</p>
        </div>
        <LoginForm errorMessage={errorMessage} redirectTo={params.redirect} />
      </div>
    </div>
  );
}
