import { Paywall } from "@/components/paywall";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DemoPaywallPage() {
  const session = await getSession();
  if (!session) redirect("/login?redirect=/demo-paywall");

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Paywall Demo</h1>
      <Paywall lidId={session.id} onSubscribe={() => console.log("Subscription requested!")} />
    </div>
  );
}
