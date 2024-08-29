import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const patchValidatedUser = async () => {
  const { data } = await axios.patch("/api/validate");

  return data;
};

export const useUpdateValidatedUser = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  return useMutation({ mutationFn: patchValidatedUser, onSuccess, onError });
};
