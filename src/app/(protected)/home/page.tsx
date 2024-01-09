import PostCard from "@/components/PostCard";
import { getPosts } from "@/actions/posts";
import PostPagination from "./_components/PostPagination";

async function NewPost({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    search?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const search = searchParams?.search ?? "";

  const { count, posts } = await getPosts({ page: currentPage, search });

  return (
    <div className="flex flex-col gap-4">
      <p>Total de itens: {count}</p>

      {posts.length ? (
        <>
          {posts?.map(({ title, description, id, type, createdAt, imgUrl }) => (
            <PostCard
              key={id}
              id={id}
              title={title}
              description={description}
              lost={type === "LOST"}
              createdAt={createdAt || ""}
              imgUrl={imgUrl}
            />
          ))}
          <PostPagination page={currentPage} count={count} />
        </>
      ) : (
        <h3 className="pt-10 text-center text-xl font-bold">
          Nenhuma postagem encontrada
        </h3>
      )}
    </div>
  );
}

export default NewPost;
