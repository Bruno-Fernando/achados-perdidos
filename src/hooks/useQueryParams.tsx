import { useSearchParams } from "next/navigation";

function useQueryParams() {
  const searchParams = useSearchParams();

  const createQueryString = (name: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value.toString());

    return params.toString();
  };

  return { createQueryString };
}

export default useQueryParams;
