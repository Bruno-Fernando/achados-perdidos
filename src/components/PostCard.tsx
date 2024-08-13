import { buttonVariants } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeletePostBtn from "./DeletePostBtn";
import CancelClaimBtn from "./CancelClaimBtn";
import { Badge } from "./ui/Badge";

interface Props {
  id: string;
  title: string;
  description: string;
  createdAt: string | Date;
  lost?: boolean;
  imgUrl?: string | null;
  enableEditDelete?: boolean;
  enableActions?: boolean;
  enableUnclaim?: boolean;
  claimUserName?: string;
  claimUserEmail?: string;
  showClaimUser?: boolean;
}

function PostCard({
  id,
  title,
  description,
  lost,
  createdAt,
  imgUrl,
  enableEditDelete,
  enableActions,
  enableUnclaim,
  claimUserName,
  claimUserEmail,
  showClaimUser,
}: Props) {
  return (
    <div
      className={`relative rounded-lg border border-l-8 ${
        lost ? "border-l-red-600" : "border-l-green-600"
      }`}
    >
      {showClaimUser && (
        <Badge className="absolute left-1 top-1 z-10">
          Reivindicado por: {claimUserName}
        </Badge>
      )}

      <Link href={`/post/${id}`}>
        <div className="relative h-72 w-full">
          <Image
            alt="Imagem do post"
            src={imgUrl ?? "/logo.svg"}
            fill
            priority
            className="bg-black object-contain"
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

      {showClaimUser && (
        <div className="my-2">
          <Separator className="mb-2" />
          <p className="ml-2">Reivindicado por: {claimUserName}</p>
          <p className="ml-2">
            Email:{" "}
            <a href={`mailto:${claimUserEmail}`} className="underline">
              {claimUserEmail}
            </a>
          </p>
        </div>
      )}

      {enableActions && (
        <>
          <Separator />
          <div className="my-4 flex justify-center gap-4">
            {enableEditDelete && (
              <>
                <Link
                  href={`/edit-post/${id}`}
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Editar
                </Link>

                <DeletePostBtn id={id} title={title} lost={lost} />
              </>
            )}
            {enableUnclaim && (
              <CancelClaimBtn
                id={id}
                userName={claimUserName}
                showClaimUser={showClaimUser}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PostCard;
