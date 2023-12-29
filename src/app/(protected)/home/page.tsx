import PostCard from "./_components/PostCard";
import { getPosts } from "@/actions/posts";

async function page() {
  const data = await getPosts();

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
    </div>
  );
}

export default page;
