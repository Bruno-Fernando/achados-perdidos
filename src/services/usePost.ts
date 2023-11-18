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

const getPost = async () => {
  const { data } = await axios.get<Prisma.PostCreateInput[]>("/api/post");

  return data;
};

export const useGetPosts = (
  options?: Omit<UseQueryOptions<any, unknown, any, QueryKey>, "queryFn">,
) => {
  return useQuery<Prisma.PostCreateInput[]>({ queryFn: getPost, ...options });
};
