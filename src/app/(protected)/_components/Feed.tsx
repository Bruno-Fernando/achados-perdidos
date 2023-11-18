"use client";
import { useGetPosts } from "@/services/usePost";
import PostCard from "./PostCard";

function Feed() {
  const { data } = useGetPosts();

  return (
    <>
      <div className="flex flex-col gap-4">
        {data?.map(({ title, description, id, type, createdAt }) => (
          <PostCard
            key={id}
            title={title}
            description={description}
            lost={type === "LOST"}
            createdAt={createdAt || ""}
          />
        ))}
      </div>
    </>
  );
}

export default Feed;
