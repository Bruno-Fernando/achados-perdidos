import PostCard from "./_components/PostCard";
import { getPosts } from "@/actions/posts";
import PostPagination from "./_components/PostPagination";

async function NewPost({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;

  const data = await getPosts(currentPage);

  return (
    <div className="flex flex-col gap-4">
      {data?.map(({ title, description, id, type, createdAt, imgUrl }) => (
        <PostCard
          key={id}
          title={title}
          description={description}
          lost={type === "LOST"}
          createdAt={createdAt || ""}
          imgUrl={imgUrl}
        />
      ))}

      <PostPagination page={currentPage} />
    </div>
  );
}

export default NewPost;
