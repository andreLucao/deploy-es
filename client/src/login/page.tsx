"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
//import CataliseBlurredBackground from "@/components/CataliseBlurredBackground";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/magic-link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Falha ao enviar o link de acesso");
      }

      setMessage("Link de acesso enviado! Verifique seu email.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      
      {/* Login card */}
      <Card className="w-full max-w-md mx-4 transition-all duration-300 hover:shadow-lg relative z-10 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Bem-vindo ao CatalisePsi</CardTitle>
          <CardDescription className="text-center">
            Digite seu email para receber um link de acesso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={handleEmailChange}
                required
                className="w-full transition-all duration-300 focus:scale-[1.02]"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-300 hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar link de acesso"
              )}
            </Button>
          </form>

          {message && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center animate-fade-in">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-center animate-fade-in">
              {error}
            </div>
          )}

          <div className="mt-6 text-sm text-gray-600 text-center">
            <p>Você receberá um email com um link para entrar.</p>
            <p className="mt-2">O link expira em 15 minutos.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 