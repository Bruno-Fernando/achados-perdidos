import { Separator } from "@/components/ui/Separator";
import PostCard from "@/components/PostCard";
import UserInfo from "./_components/UserInfo";
import { getUserPosts } from "@/actions/posts";

async function Profile() {
  const userPosts = await getUserPosts();

  return (
    <>
      <UserInfo />

      <Separator className="my-4" />

      <h3 className="text-xl font-bold">Minhas postagens:</h3>

      <div className="mt-4 flex flex-col gap-4">
        {userPosts.map(
          ({ id, title, description, type, createdAt, imgUrl }) => (
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
          ),
        )}
      </div>
    </>
  );
}

export default Profile;
