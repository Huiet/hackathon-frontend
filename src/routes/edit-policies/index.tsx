import { createFileRoute } from "@tanstack/react-router";
import { JSX, ReactNode, useState } from "react";
import { Policy, PolicyGrid } from "../../PolicyGrid";
import {
  Button,
  Group,
  MantineColorScheme,
  Stack,
  Title,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  CardContainer,
  CardContainerStyles,
} from "../../components/CardContainer";
import { IconUsers } from "@tabler/icons-react";
import { ValueText } from "../../components/ValueText";
import { LabelText } from "../../components";

export const Route = createFileRoute("/edit-policies/")({
  component: EditPolicies,
});

type EditCardProps = {
  label: string;
  icon: any;
  detailLabel?: string;
  colorScheme: MantineColorScheme;
};
const EditCard = ({
  label,
  icon: Icon,
  detailLabel,
  colorScheme,
}: EditCardProps) => {
  return (
    <Button
      variant={"outline"}
      color={colorScheme === "light" ? "blue.8" : "blue.6"}
      styles={{
        inner: {
          justifyContent: "flex-start",
        },
      }}
      style={{
        ...CardContainerStyles(colorScheme),
        width: "20rem",
        height: "6rem",
      }}
    >
      <Group
        align={"flex-start"}
        gap={"lg"}
        justify={"flex-start"}
        style={{
          textAlign: "left",
        }}
      >
        <Icon size={30} />
        <Stack gap={0}>
          <ValueText label={label} />
          {detailLabel && <LabelText label={detailLabel} />}
        </Stack>
      </Group>
    </Button>
  );
};

function EditPolicies() {
  const { colorScheme } = useMantineColorScheme();
  const EditCards: Omit<EditCardProps, "colorScheme">[] = [
    {
      label: "Beneficiary Information",
      icon: IconUsers,
    },
    {
      label: "Annuity Information",
      icon: IconUsers,
    },
    {
      label: "Investments and Values",
      icon: IconUsers,
    },
    {
      label: "Authorized Access",
      detailLabel: "POA / TC",
      icon: IconUsers,
    },
    {
      label: "Withdrawals",
      detailLabel: "Required Minimum Distribution",
      icon: IconUsers,
    },
    {
      label: "Contact Information",
      icon: IconUsers,
    },
    {
      label: "Contributions",
      icon: IconUsers,
    },
  ];

  return (
    <Stack>
      <Title>What are you looking to do?</Title>

      <CardContainer>
        <Stack>
          <Text>Choose one to view and edit</Text>
          <Group>
            {EditCards.map((card, index) => (
              <EditCard key={index} {...card} colorScheme={colorScheme} />
            ))}
          </Group>
        </Stack>
      </CardContainer>
    </Stack>
  );
  // const [selectedPolicies, setSelectedPolicies] = useState<Policy[]>([]);
  // return (
  //   <Stack>
  //     <PolicyGrid
  //       selectedPolicies={selectedPolicies}
  //       setSelectedPolicies={setSelectedPolicies}
  //     />
  //   </Stack>
  // );
}
