"use client";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/hooks/use-toast";
import { useClaimObject } from "@/services/useClaim";
import { Loader2, PartyPopper } from "lucide-react";
import { useState } from "react";

interface Props {
  title: string;
  found: boolean;
  author: string;
  authorEmail: string;
  postId: string;
}

function ClaimObject({ title, found, author, authorEmail, postId }: Props) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { mutate, isPending } = useClaimObject({
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description:
          "O objeto foi reivindicado e o usuário recebeu uma notificação por e-mail.",
      });
      toggleOpen();
    },
  });

  const sendEmail = () => {
    mutate({
      message,
      authorEmail,
      found,
      authorName: author,
      postId,
    });
  };

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <Button className="ml-2">
          <PartyPopper className="mr-2 h-4 w-4" />
          {found ? "É meu!" : "Achei!"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reivindicar pertence</DialogTitle>
          <DialogDescription>
            Ao reivindicar <span className="font-bold">"{title}"</span>, o
            usuário <span className="font-bold">{author}</span> será notificado
            por e-mail e a postagem ficará oculta da lista de postagems da Home.
            Deseja continuar?
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Caso ache necessário, envie uma mensagem para o usuário ${author} com alguma informação ou um contato (Whatsapp, por exemplo).`}
            className="resize-none"
            rows={4}
            maxLength={150}
            disabled={isPending}
          />
        </div>
        <DialogFooter>
          <Button onClick={sendEmail} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-full w-4 animate-spin" />}
            Reivindicar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ClaimObject;
