"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ValidateRegistrationCodePayload } from "@/lib/validators/validate";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

function Validate() {
  const { toast } = useToast();
  const { update } = useSession();
  const router = useRouter();

  const [registrationCode, setRegistrationCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsloading] = useState(false);

  const { mutate: validateUfcgUser } = useMutation({
    mutationFn: () => {
      const payload: ValidateRegistrationCodePayload = {
        registrationCode,
        password,
      };

      return axios.post("/api/validate", {
        payload,
      });
    },
    onSuccess: async () => {
      await update();
      router.replace("/home");
    },
    onError: () => {
      toast({
        title: "Houve um problema",
        description:
          "Aconteceu um problema durante o processo de verificação da matricula, tente novamente mais tarde ou entre em contato",
        variant: "destructive",
      });
      setIsloading(false);
    },
  });

  const handleSubmit = () => {
    validateUfcgUser();
    setIsloading(true);
  };

  return (
    <form className="flex flex-col items-center min-h-screen justify-center gap-3">
      <div>
        <Label htmlFor="registration">Matrícula</Label>
        <Input
          id="registration"
          placeholder="Digite sua matrícula"
          value={registrationCode}
          onChange={(e) => setRegistrationCode(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          placeholder="Digite sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        Validar
      </Button>
    </form>
  );
}

export default Validate;
