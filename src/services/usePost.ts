import { DeletePostPayload } from "@/lib/validators/deletePost";
import { Prisma } from "@prisma/client";
import {
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

interface PutPostParams {
  postId: string;
  body: FormData;
}

interface DeletePostParams {
  postId: string;
  body: DeletePostPayload;
}

const postNewPost = async (body: any) => {
  const { data } = await axios.post("/api/post", body);

  return data;
};

export const useCreatePost = (
  options: Omit<UseMutationOptions<any, unknown, any, unknown>, "mutationFn">,
) => {
  return useMutation({ mutationFn: postNewPost, ...options });
};

const getUserPostById = async (
  postId: string,
): Promise<Prisma.PostCreateInput> => {
  const { data } = await axios.get(`api/post/${postId}`);

  return data;
};

export const useGetUserPostById = (postId: string) => {
  return useQuery({
    queryKey: ["getUserPostById", postId],
    queryFn: () => getUserPostById(postId),
  });
};

const putPost = async ({
  postId,
  body,
}: PutPostParams): Promise<Prisma.PostCreateInput> => {
  const { data } = await axios.put(`/api/post/${postId}`, body);

  return data;
};

export const useUpdatePost = (
  options: UseMutationOptions<
    Prisma.PostCreateInput,
    Error,
    PutPostParams,
    unknown
  >,
) => {
  return useMutation({ mutationFn: putPost, ...options });
};

const deletePost = async ({ postId, body }: DeletePostParams) => {
  const { data } = await axios.delete(`/api/post/${postId}`, { data: body });

  return data;
};

export const useDeletePost = (
  options?: UseMutationOptions<any, Error, DeletePostParams, unknown>,
) => {
  return useMutation({ mutationFn: deletePost, ...options });
};
