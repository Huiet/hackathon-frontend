import { Box, Group, Stack } from "@mantine/core";
import { Calendar, DatePicker } from "@mantine/dates";
import { useState } from "react";
import { IconClock, IconPhone } from "@tabler/icons-react";

export const ContactAdvisor = () => {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <Group>
      <Box flex={1}>
        <Stack>
          <IconClock /> 30 min
          <IconPhone /> Phone Call
        </Stack>

        <Text>
          Select from the time slot to set up some time with your advisor.
        </Text>
        <Text>Alternatively, call 1-888-888-8888</Text>
      </Box>
      <Box flex={1}>
        <DatePicker value={date} onChange={setDate} />
      </Box>
    </Group>
  );
};
