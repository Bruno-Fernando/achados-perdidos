import { Prisma } from "@prisma/client";
import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import axios from "axios";

const postNewPost = async (body: any) => {
  const { data } = await axios.post("/api/post", body);

  return data;
};

export const useCreatePost = (
  options: Omit<UseMutationOptions<any, unknown, any, unknown>, "mutationFn">,
) => {
  return useMutation({ mutationFn: postNewPost, ...options });
};

export const getPost = async (): Promise<Prisma.PostCreateInput[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/post`,
  );

  return data;
};

export const useGetPosts = (
  options?: Omit<UseQueryOptions<any, unknown, any, QueryKey>, "queryFn">,
) => {
  return useQuery({ queryKey: ["todos"], queryFn: getPost });
};
