import { Button, buttonVariants } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeletePostBtn from "./DeletePostBtn";

interface Props {
  id: string;
  title: string;
  description: string;
  createdAt: string | Date;
  lost?: boolean;
  imgUrl?: string | null;
  enableEditDelete?: boolean;
}

function PostCard({
  id,
  title,
  description,
  lost,
  createdAt,
  imgUrl,
  enableEditDelete,
}: Props) {
  return (
    <div
      className={`rounded-lg border border-l-8 ${
        lost ? "border-l-red-600" : "border-l-green-600"
      }`}
    >
      <Link href={`/post/${id}`}>
        <div className="relative h-72 w-full">
          <Image
            alt="Imagem do post"
            src={imgUrl ?? "/logo.svg"}
            fill
            priority
            className="object-contain"
          />
        </div>

        <p className="pr-3 text-end">
          {new Date(createdAt.toString()).toLocaleDateString()}
        </p>
        <div className="px-3 pb-3">
          <h3 className="text-lg">
            <span className={lost ? "text-red-600" : "text-green-600"}>
              {lost ? "Perdido: " : "Encontrado: "}
            </span>
            {title}
          </h3>
          <p>{description}</p>
        </div>
      </Link>
      {enableEditDelete && (
        <>
          <Separator />
          <div className="my-4 flex justify-center gap-4">
            <Link
              href={`/edit-post/${id}`}
              className={cn(buttonVariants({ variant: "default" }))}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </Link>

            <DeletePostBtn title={title} lost={lost} />
          </div>
        </>
      )}
    </div>
  );
}

export default PostCard;
