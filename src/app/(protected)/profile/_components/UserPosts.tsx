"use client";

import { getUserPosts } from "@/actions/posts";
import PostCard from "@/components/PostCard";
import { useQuery } from "@tanstack/react-query";

function UserPosts() {
  const { data } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: () => getUserPosts(),
  });

  if (data?.length) {
    return (
      <>
        <h3 className="text-xl font-bold">Minhas postagens:</h3>

        <div className="mt-4 flex flex-col gap-4">
          {data.map(({ id, title, description, type, createdAt, imgUrl }) => (
            <PostCard
              key={id}
              id={id}
              title={title}
              description={description}
              lost={type === "LOST"}
              createdAt={createdAt || ""}
              imgUrl={imgUrl}
              enableEditDelete
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <h3 className="pt-10 text-center text-xl font-bold">
      Você não possui postagens ainda
    </h3>
  );
}

export default UserPosts;
