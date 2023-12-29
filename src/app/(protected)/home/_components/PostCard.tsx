import Image from "next/image";

interface Props {
  title: string;
  description: string;
  createdAt: string | Date;
  lost?: boolean;
  imgUrl?: string | null;
}

function PostCard({ title, description, lost, createdAt, imgUrl }: Props) {
  return (
    <div
      className={`rounded-lg border border-l-8 ${
        lost ? "border-l-red-600" : "border-l-green-600"
      } hover:cursor-pointer`}
    >
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
    </div>
  );
}

export default PostCard;
