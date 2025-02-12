import { useQuery } from "@tanstack/react-query";
import { Policy } from "../PolicyGrid";

export function useGetPolicies(userId: string | number) {
  return useQuery({
    queryKey: ["policies" + userId],
    queryFn: async (): Promise<Array<Policy>> => {
      const response = await fetch(
        `https://2205if6vs1.execute-api.us-east-1.amazonaws.com/dev/getBene?customerId=00${userId}`,
      );
      return await response.json();
    },
  });
}
