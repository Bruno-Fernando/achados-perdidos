"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { Button } from "./ui/Button";
import { Ban, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCancelClaimObject } from "@/services/useClaim";

interface Props {
  id: string;
  userName?: string;
  showClaimUser?: boolean;
}

function CancelClaimBtn({ id, userName, showClaimUser }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);

  const { mutate: cancelClaim, isPending } = useCancelClaimObject({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });

      toast({
        title: "Sucesso",
        description: "Você cancelou a reivindicação do post",
      });

      toggleOpen();
    },
    onError: () => {
      toast({
        title: "Erro",
        variant: "destructive",
        description: "Ops, aconteceu um problema, tente novamente mais tarde",
      });
    },
  });

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleCancelClaim = () => {
    cancelClaim({ postId: id });
  };

  return (
    <AlertDialog open={open} onOpenChange={toggleOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">
          <Ban className="mr-2 h-4 w-4" />
          Cancelar reivindicação
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancelar Reivindicação</AlertDialogTitle>
          <AlertDialogDescription>
            {showClaimUser ? (
              <>
                Você deseja cancelar a reivindicação feita por{" "}
                <strong>{userName}</strong>?
              </>
            ) : (
              "Você deseja cancelar a reivindicação?"
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel type="button" disabled={isPending}>
            Fechar
          </AlertDialogCancel>
          <Button disabled={isPending} onClick={handleCancelClaim}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirmar Cancelamento
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CancelClaimBtn;
