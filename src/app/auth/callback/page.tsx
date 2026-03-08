"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error: authError } = await supabase.auth.getSession();

        if (authError) {
          throw authError;
        }

        // Whether or not we have a session, send the user home
        router.replace("/");
      } catch (err) {
        console.error("Auth callback error:", err);
        const errorMessage = err instanceof Error ? err.message : "Authentication failed";
        setError(errorMessage);
        setTimeout(() => {
          router.replace("/");
        }, 3000);
      }
    };

    void handleAuthCallback();
  }, [router]);

  if (!error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Completing authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md">
        <div className="text-destructive mb-4">
          <p className="text-lg font-semibold">Authentication Error</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
        <p className="text-muted-foreground text-sm">
          Redirecting to home page...
        </p>
      </div>
    </div>
  );
}

