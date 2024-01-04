import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Separator } from "@/components/ui/Separator";
import { getAuthSession } from "@/lib/auth";
import PostCard from "@/components/PostCard";

async function Profile() {
  const session = await getAuthSession();

  const avatarFallback = session?.user.name?.charAt(0);

  return (
    <>
      <div className="text-center">
        <Avatar className="mx-auto mb-3 h-24 w-24">
          <AvatarImage src={session?.user.image || ""} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <p className="capitalize">Nome: {session?.user.name}</p>
        <p>E-mail: {session?.user.email}</p>
      </div>

      <Separator className="my-4" />

      <p>Minhas postagens:</p>

      <div className="mt-4 flex flex-col gap-4">
        <PostCard
          id="clqr09fbz00015w787ifkbizd"
          title="Test"
          description="Description"
          lost={false}
          createdAt={new Date()}
          enableEditDelete
        />
      </div>
    </>
  );
}

export default Profile;
