"use client";

import { getUserPosts } from "@/actions/posts";
import PostCard from "@/components/PostCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useQuery } from "@tanstack/react-query";

interface Props {
  userId: string;
}

function UserPosts({ userId }: Props) {
  const { data } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: () => getUserPosts(),
  });

  return (
    <Tabs defaultValue="posts" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="posts">Postagens em aberto</TabsTrigger>
        <TabsTrigger value="claimed">Postagens reivindicadas</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <div className="mt-4 flex flex-col gap-4">
          {data?.userPosts.length ? (
            data.userPosts.map(
              ({ id, title, description, type, createdAt, imgUrl }) => (
                <PostCard
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  lost={type === "LOST"}
                  createdAt={createdAt || ""}
                  imgUrl={imgUrl}
                  enableActions
                  enableEditDelete
                />
              ),
            )
          ) : (
            <h3 className="pt-10 text-center text-xl font-bold">
              Você não possui postagens ainda
            </h3>
          )}
        </div>
      </TabsContent>
      <TabsContent value="claimed">
        <div className="mt-4 flex flex-col gap-4">
          {data?.claimedPosts.length ? (
            data.claimedPosts.map(
              ({
                id,
                title,
                description,
                type,
                createdAt,
                imgUrl,
                authorId,
                claimUser,
              }) => (
                <PostCard
                  key={id}
                  id={id}
                  title={title}
                  description={description}
                  lost={type === "LOST"}
                  createdAt={createdAt || ""}
                  imgUrl={imgUrl}
                  enableActions
                  enableEditDelete={authorId === userId}
                  enableUnclaim
                  claimUserName={
                    authorId !== userId ? "" : claimUser?.name || ""
                  }
                  showClaimUser={authorId === userId}
                  claimUserEmail={claimUser?.email || ""}
                />
              ),
            )
          ) : (
            <h3 className="pt-10 text-center text-xl font-bold">
              Você não possui postagens reivindicadas
            </h3>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default UserPosts;
