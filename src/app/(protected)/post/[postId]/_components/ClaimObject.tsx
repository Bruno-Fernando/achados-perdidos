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
import { PartyPopper } from "lucide-react";

interface Props {
  title: string;
  found: boolean;
  author: string | null;
}

function ClaimObject({ title, found, author }: Props) {
  return (
    <Dialog>
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
            placeholder={`Caso ache necessário, envie uma mensagem para o usuário ${author} com alguma informação ou um contato (Whatsapp, por exemplo).`}
            className="resize-none"
            rows={4}
            maxLength={150}
          />
        </div>
        <DialogFooter>
          <Button type="submit">Reivindicar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ClaimObject;
