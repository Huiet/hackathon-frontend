import { CardContainer } from "./CardContainer";
import { Stack, Text, Title } from "@mantine/core";

export const DailyInsight = () => {
  return (
    <CardContainer style={{ height: "11.5rem" }}>
      <Stack>
        <Title order={3} c={"blue.5"}>
          Did you know?
        </Title>
        <Text>
          Over 90% of retirees say guaranteed lifetime income from annuities
          gives them greater financial confidence in retirement.
        </Text>
      </Stack>
    </CardContainer>
  );
};
