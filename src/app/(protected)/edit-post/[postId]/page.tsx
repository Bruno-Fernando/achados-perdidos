import { getUserPostById } from "@/actions/posts";
import EditPostForm from "./_components/EditPostForm";

// Desabilita cache
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function EditPost({ params }: { params: { postId: string } }) {
  const post = await getUserPostById(params.postId);

  return (
    <>
      <h3 className="mb-4 text-xl font-bold">Editar postagem</h3>

      <EditPostForm post={post} />
    </>
  );
}

export default EditPost;
