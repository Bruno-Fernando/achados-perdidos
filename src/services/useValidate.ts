import { ValidateRegistrationCodePayload } from "@/lib/validators/validate";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const postValidateUser = async (body: any) => {
  const { data } = await axios.post(
    process.env.NEXT_PUBLIC_VALIDATE_USER_URL!,
    body,
  );

  return data;
};

export const useValidate = ({
  onSuccess,
  onError,
}: {
  onSuccess: OnSuccess<any>;
  onError: OnError<any>;
}) => {
  return useMutation({ mutationFn: postValidateUser, onSuccess, onError });
};

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
