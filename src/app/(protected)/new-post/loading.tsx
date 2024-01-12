import { Loader2 } from "lucide-react";

function loading() {
  return (
    <>
      <h3 className="mb-4 text-xl font-bold">Nova postagem</h3>

      <Loader2 className="mx-auto h-12 w-12 animate-spin" />
    </>
  );
}

export default loading;
