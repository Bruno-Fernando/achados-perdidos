import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger className="mt-6 text-sm underline">
        Porque pedimos seus dados de matrícula?
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Porque pedimos seus dados de matrícula?</DialogTitle>
          <DialogDescription>
            <p className="mt-3">
              Esta aplicação é destinada apenas para usuários que estão
              vinculados na UFCG, portanto, como forma de validar o vínculo,
              usamos a matrícula e senha do controle acadêmico.
            </p>
            <p className="mb-2 mt-3 font-bold">Esse dados são salvos?</p>
            <p>
              Não. Os dados são usados apenas uma vez durante esta estapa de
              verificação.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default InfoDialog;
