function Post({ params }: { params: { postId: string } }) {
  return <div>pagina do post {params.postId}</div>;
}

export default Post;
