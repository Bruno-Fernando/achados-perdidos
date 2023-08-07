"use client";

import { Icons } from "@/components/ExternalIcons";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

function GoogleLogin() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    setLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Houve um problema",
        description:
          "Aconteceu um problema durante o processo de login, tente novamente mais tarde ou entre em contato",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={loginWithGoogle}
      disabled={loading}
      className="w-1/2 min-w-[140px] max-w-xs space-x-5"
    >
      {loading ? (
        <Loader2 className="mr-2 h-full w-4 animate-spin" />
      ) : (
        <Icons.google className="h-full" />
      )}

      <span className="font-bold">Google</span>
    </Button>
  );
}

export default GoogleLogin;
