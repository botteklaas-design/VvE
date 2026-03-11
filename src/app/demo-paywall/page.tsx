import { Paywall } from "@/components/paywall";

export default function DemoPaywallPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Paywall Demo</h1>
      <Paywall onSubscribe={() => console.log("Subscription requested!")} />
    </div>
  );
}