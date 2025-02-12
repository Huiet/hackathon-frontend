import { useQuery } from "@tanstack/react-query";
import { Policy } from "../PolicyGrid";

export function useGetPolicies() {
  return useQuery({
    queryKey: ["policies"],
    queryFn: async (): Promise<Array<Policy>> => {
      const response = await fetch(
        "https://2205if6vs1.execute-api.us-east-1.amazonaws.com/dev/getBene",
      );
      return await response.json();
    },
  });
}

export function useChatBotResponse(userMessage: string) {
  return useQuery({
    queryKey: ["chatbotResponse", userMessage],
    queryFn: async (): Promise<string> => {
      const response = await fetch(
          `https://b0ma0042q3.execute-api.us-east-1.amazonaws.com/Dev/ai?question=${encodeURIComponent(userMessage)}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch response: ${errorText}`);
      }

      const data = await response.json(); // Initial parsing
      console.log("Raw Response:", data);

      // Parse the body field if it exists and is a string
      if (data.body) {
        const parsedBody = JSON.parse(data.body);
        console.log("Parsed Body:", parsedBody);

        return parsedBody.data
            ? JSON.stringify(parsedBody.data, null, 2) // Format the response nicely for display
            : "No response received.";
      }
      else {
        return "No response received.";
      }

    },
    enabled: !!userMessage, // Only fetch when userMessage is provided
  });
}


