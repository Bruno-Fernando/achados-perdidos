import { ClaimPayload } from "@/lib/validators/claim";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

const postClaimObject = async (body: ClaimPayload) => {
  const { data } = await axios.post("/api/claim", body);

  return data;
};

export const useClaimObject = (
  options?: Omit<UseMutationOptions<any, unknown, any, unknown>, "mutationFn">,
) => {
  return useMutation({ mutationFn: postClaimObject, ...options });
};
