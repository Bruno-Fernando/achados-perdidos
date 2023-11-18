import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import axios from "axios";

const postValidateUser = async (body: any) => {
  const { data } = await axios.post("/api/post", body);

  return data;
};

export const useCreatePost = (
  options: Omit<UseMutationOptions<any, unknown, any, unknown>, "mutationFn">,
) => {
  return useMutation({ mutationFn: postValidateUser, ...options });
};
