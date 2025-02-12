import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CardContainer,
  CardContainerStyles,
  LabelText,
  ValueText,
} from "../components";
import {
  Button,
  Group,
  Stack,
  Title,
  useMantineColorScheme,
} from "@mantine/core";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    number: "123456789",
  },
  {
    id: 2,
    name: "Jimmy Johns",
    email: "crazyFastSubs@example.com",
    number: "145624555",
  },
];

function RouteComponent() {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Stack>
      <Title>Select A Policy Owner</Title>
      <Group align={"flex-start"}>
        {users.map((user) => (
          <Button
            key={user.id}
            style={{
              height: "6rem",
            }}
            variant={"outline"}
            radius={"md"}
            color={colorScheme === "light" ? "blue.8" : "blue.6"}
            component={Link}
            to={`/${user.id}`}
          >
            <Stack gap={0}>
              <ValueText label={user.name} />
              <LabelText label={user.email} />
              <LabelText label={user.number} />
            </Stack>
          </Button>
        ))}
      </Group>
    </Stack>
  );
}
