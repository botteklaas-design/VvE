"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LoginFormProps {
  errorMessage?: string;
  redirectTo?: string;
}

export function LoginForm({ errorMessage, redirectTo }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [devLink, setDevLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/request-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();
      setSubmitted(true);

      // Dev-only: show the link directly so we can test without email
      if (data.devLink) {
        setDevLink(data.devLink + (redirectTo ? `&redirect=${encodeURIComponent(redirectTo)}` : ""));
      }
    } catch (error) {
      console.error("Error requesting token:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-green-700">Controleer je e-mail</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-700">
            Als dit e-mailadres bekend is, ontvang je een inloglink.
            De link is 15 minuten geldig.
          </p>
          {devLink && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-left">
              <p className="text-xs font-semibold text-yellow-800 mb-1">Development — directe inloglink:</p>
              <a
                href={devLink}
                className="text-xs text-blue-600 underline break-all"
              >
                {devLink}
              </a>
            </div>
          )}
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={() => { setSubmitted(false); setDevLink(null); }}
          >
            Opnieuw proberen
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Inloggen</CardTitle>
      </CardHeader>
      <CardContent>
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-mailadres
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouw@email.nl"
              required
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
            />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting || !email.trim()}>
            {isSubmitting ? "Verzenden..." : "Stuur inloglink"}
          </Button>
        </form>
        <p className="mt-4 text-xs text-gray-500 text-center">
          Je ontvangt een e-mail met een inloglink. Geen wachtwoord nodig.
        </p>
      </CardContent>
    </Card>
  );
}
