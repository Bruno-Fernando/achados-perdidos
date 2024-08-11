import { ClaimPayload } from "@/lib/validators/claim";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

interface ClaimParams {
  body: ClaimPayload;
  postId: string;
}

interface CancelClaimParams {
  postId: string;
}

const patchClaimObject = async ({ body, postId }: ClaimParams) => {
  const { data } = await axios.patch(`/api/claim/${postId}`, body);

  return data;
};

export const useClaimObject = (
  options?: Omit<UseMutationOptions<any, unknown, any, unknown>, "mutationFn">,
) => {
  return useMutation({ mutationFn: patchClaimObject, ...options });
};

const cancelClaimObject = async ({ postId }: CancelClaimParams) => {
  const { data } = await axios.delete(`/api/claim/${postId}`);

  return data;
};

export const useCancelClaimObject = (
  options?: Omit<UseMutationOptions<any, unknown, any, unknown>, "mutationFn">,
) => {
  return useMutation({ mutationFn: cancelClaimObject, ...options });
};
