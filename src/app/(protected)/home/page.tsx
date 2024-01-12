import PostCard from "@/components/PostCard";
import { getPosts } from "@/actions/posts";
import PostPagination from "./_components/PostPagination";
import { Separator } from "@/components/ui/Separator";
import FilterPost from "./_components/FilterPost";
import { $Enums } from "@prisma/client";
import RemoveFilters from "./_components/RemoveFilters";
import SortPosts from "./_components/SortPosts";

async function NewPost({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    search?: string;
    status?: string;
    date?: string;
    order?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const search = searchParams?.search ?? "";
  const status =
    searchParams?.status &&
    Object.values($Enums.PostType).includes(
      searchParams?.status as $Enums.PostType,
    )
      ? (searchParams?.status as $Enums.PostType)
      : undefined;
  const date = searchParams?.date ?? "";
  const order = searchParams?.order ?? "";

  const { count, posts } = await getPosts({
    page: currentPage,
    search,
    type: status,
    date,
    order,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <p>Total de itens: {count}</p>

        <FilterPost />
        <SortPosts />
      </div>
      <RemoveFilters />

      <Separator />

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
