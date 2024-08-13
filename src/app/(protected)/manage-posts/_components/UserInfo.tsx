import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { getAuthSession } from "@/lib/auth";

async function UserInfo() {
  const session = await getAuthSession();

  const avatarFallback = session?.user.name?.charAt(0);

  return (
    <div className="text-center">
      <Avatar className="mx-auto mb-3 h-24 w-24">
        <AvatarImage src={session?.user.image || ""} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <p className="capitalize">Nome: {session?.user.name}</p>
      <p>E-mail: {session?.user.email}</p>
    </div>
  );
}

export default UserInfo;
