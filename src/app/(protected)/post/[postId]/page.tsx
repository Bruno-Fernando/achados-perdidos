import { getPostById } from "@/actions/posts";
import { Icons } from "@/components/ExternalIcons";
import { buttonVariants } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";
import { Facebook } from "lucide-react";
import Image from "next/image";
import CopyToClipboard from "./_components/CopyToClipboard";
import ClaimObject from "./_components/ClaimObject";

async function Post({ params }: { params: { postId: string } }) {
  const data = await getPostById(params.postId);

  return (
    <div>
      <p className="text-xl">
        <span
          className={`${
            data?.type === "FOUND" ? "text-green-600" : "text-red-600"
          } font-bold`}
        >
          {data?.type === "FOUND" ? "Encontrado: " : "Perdido: "}
        </span>
        {data?.title}
      </p>

      <p className="mb-4 text-sm">
        Publicado em {data?.createdAt.toLocaleDateString()} às{" "}
        {data?.createdAt.toLocaleTimeString()} pelo usuário: {data?.author.name}
      </p>

      {data?.imgUrl && (
        <div className="relative mb-4 h-72 w-full">
          <Image
            src={data?.imgUrl || ""}
            alt="Imagem do post"
            fill
            priority
            className="object-contain"
          />
        </div>
      )}

      <Separator className="mb-2" />

      <p>{data?.description}</p>

      {data && !data.claimUserId && (
        <>
          <Separator className="my-8" />

          <div>
            <p className="text-lg font-bold">
              {data?.type === "FOUND"
                ? "Esse objeto é seu?"
                : "Você encontrou esse objeto?"}
            </p>
            <p>
              Entre em contato através do e-mail:{" "}
              <a href={`mailto:${data.author.email}`} className="underline">
                {data.author.email}
              </a>
            </p>
            <div>
              Ou avise:
              <ClaimObject
                found={data?.type === "FOUND"}
                title={data?.title}
                author={data?.author.name ?? ""}
                postId={params.postId}
              />
            </div>
          </div>
        </>
      )}

      <Separator className="my-8" />

      <p className="mb-4">Compartilhar:</p>

      <div className="flex gap-2">
        <a
          href="https://www.facebook.com/sharer/sharer.php?u=http%3A//localhost%3A3000/post/clqr09fbz00015w787ifkbizd"
          target="_blank"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Facebook />
        </a>

        <a
          href="https://twitter.com/intent/tweet?text=http%3A//localhost%3A3000/post/clqr09fbz00015w787ifkbizd"
          target="_blank"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Icons.x className="h-6 w-6 fill-current" />
        </a>

        <CopyToClipboard />
      </div>
    </div>
  );
}

export default Post;
