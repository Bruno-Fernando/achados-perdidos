import { Separator } from "@/components/ui/Separator";
import UserInfo from "./_components/UserInfo";
import { getUserPosts } from "@/actions/posts";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import UserPosts from "./_components/UserPosts";

async function Profile() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getUserPosts"],
    queryFn: getUserPosts,
  });

  return (
    <>
      <UserInfo />

      <Separator className="my-4" />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserPosts />
      </HydrationBoundary>
    </>
  );
}

export default Profile;
