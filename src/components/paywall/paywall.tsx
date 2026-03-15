"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface PaywallProps {
  lidId: number;
  onSubscribe: () => void;
  hasActiveRequest?: boolean;
}

export function Paywall({ lidId, onSubscribe, hasActiveRequest }: PaywallProps) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("lidId", String(lidId));
      formData.append("bericht", message);

      const response = await fetch("/api/subscription-requests", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setSuccess(true);
        setMessage("");
        onSubscribe();
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-700">
            ✅ Verzoek ontvangen!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Bedankt voor je interesse in een abonnement. We nemen binnenkort contact met je op.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto mt-8 border-2 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
        <CardTitle className="text-2xl font-bold text-gray-900 text-center">
          🔒 Premium Inhoud
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-2">Abonneer nu voor toegang tot alle functies</h3>
          <p className="text-gray-700 text-sm">
            Word lid van onze exclusieve community en ontvang toegang tot premium content, expert advies en meer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Laat een bericht achter:</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Waar ben je geïnteresseerd in? We nemen zo snel mogelijk contact met je op."
              className="min-h-[100px]"
              required
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg"
            disabled={isSubmitting || !message.trim()}
          >
            {isSubmitting ? "Verzenden..." : "📩 Verzoek indienen"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function SubscriptionRequestForm({ lidId }: { lidId: number }) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("lidId", lidId.toString());
      formData.append("bericht", message);

      const response = await fetch("/api/subscription-requests", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setSuccess(true);
        setMessage("");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8 border-2 border-blue-200 shadow-xl">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
        <CardTitle className="text-2xl font-bold text-gray-900 text-center">
          🔒 Premium Inhoud
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-gray-900 mb-2">Abonneer nu voor toegang tot alle functies</h3>
          <p className="text-gray-700 text-sm">
            Word lid van onze exclusieve community en ontvang toegang tot premium content, expert advies en meer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Laat een bericht achter:</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Waar ben je geïnteresseerd in? We nemen zo snel mogelijk contact met je op."
              className="min-h-[100px]"
              required
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-lg"
            disabled={isSubmitting || !message.trim()}
          >
            {isSubmitting ? "Verzenden..." : "📩 Verzoek indienen"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}