import { getPost } from "@/actions/posts";
import { Separator } from "@/components/ui/Separator";
import Image from "next/image";

async function Post({ params }: { params: { postId: string } }) {
  const data = await getPost(params.postId);

  return (
    <div>
      <p className="mb-4 text-xl">
        <span
          className={data?.type === "FOUND" ? "text-green-600" : "text-red-600"}
        >
          {data?.type === "FOUND" ? "Encontrado: " : "Perdido: "}
        </span>
        {data?.title}
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

      <Separator className="my-8" />

      <p className="text-sm">
        Publicado em {data?.createdAt.toLocaleDateString()} às{" "}
        {data?.createdAt.toLocaleTimeString()} pelo usuário: {data?.author.name}
      </p>
    </div>
  );
}

export default Post;
