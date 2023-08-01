"use client";

import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

function SignIn() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    setLoading(true);

    try {
      await signIn("google");
    } catch (error) {
      //toast
      toast({
        title: "Houve um problema",
        description:
          "Aconteceu um problema durante o processo de login, tente novamente mais tarde ou entre em contato",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center gap-10 flex-col">
      <p>sigin</p>
      <Button onClick={loginWithGoogle} disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Google
      </Button>
    </div>
  );
}

export default SignIn;
