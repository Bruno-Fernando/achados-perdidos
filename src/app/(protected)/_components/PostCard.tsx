import Image from "next/image";

interface Props {
  lost?: boolean;
}

function PostCard({ lost }: Props) {
  return (
    <div
      className={`rounded-lg border border-l-8 ${
        lost ? "border-l-red-600" : "border-l-green-600"
      } hover:cursor-pointer`}
    >
      <Image
        alt="post image"
        src="https://picsum.photos/600/300"
        width={600}
        height={300}
      />

      <p className="pr-3 text-end">18/09/2023</p>
      <div className="px-3 pb-3">
        <h3 className="text-lg">
          <span className={lost ? "text-red-600" : "text-green-600"}>
            {lost ? "Perdido: " : "Encontrado: "}
          </span>
          Título do post
        </h3>
        <p>Descrição do post</p>
      </div>
    </div>
  );
}

export default PostCard;
