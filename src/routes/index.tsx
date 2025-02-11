import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Group,
  NumberFormatter,
  Stack,
  Title,
  Text,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { Policy, PolicyGrid } from "../PolicyGrid";
import { CardContainer } from "../components/CardContainer";
import { LabelText } from "../components/LabelText";
import { ValueText } from "../components/ValueText";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [selectedPolicies, setSelectedPolicies] = useState<Policy[]>([]);
  return (
    <Stack
      style={{
        flexGrow: 1,
      }}
    >
      <Title order={4}>Owner Information</Title>
      <Group>
        <CardContainer
          style={{
            height: "6rem",
          }}
        >
          <Group pt={"xs"}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1_9726)">
                <path
                  d="M10.9233 6.4998H21.0769L23.2682 4.74674C24.0143 4.1514 24.293 3.18494 23.9776 2.28307C23.6622 1.3812 22.8426 0.799805 21.8901 0.799805H10.1101C9.15755 0.799805 8.33802 1.38247 8.02262 2.28307C7.70722 3.18367 7.98589 4.1514 8.73069 4.74547L10.9233 6.4998Z"
                  fill="#FFBB38"
                />
                <path
                  d="M21.2499 8.3999H10.7493C7.29001 11.7958 4.59961 17.7542 4.59961 22.6499C4.59961 26.9046 6.85174 31.1999 11.8829 31.1999H20.4329C24.7307 31.1999 27.3996 27.923 27.3996 22.6499C27.3996 17.7542 24.7092 11.7958 21.2499 8.3999ZM15.5183 18.8499H16.4809C17.9617 18.8499 19.1663 20.0545 19.1663 21.5352C19.1663 22.8665 18.2061 23.9622 16.9496 24.1851V25.182C16.9496 25.7064 16.524 26.132 15.9996 26.132C15.4752 26.132 15.0496 25.7064 15.0496 25.182V24.2332H13.7829C13.2585 24.2332 12.8329 23.8076 12.8329 23.2832C12.8329 22.7588 13.2585 22.3332 13.7829 22.3332H16.4809C16.9141 22.3332 17.2663 21.9811 17.2663 21.5479C17.2663 21.102 16.9141 20.7499 16.4809 20.7499H15.5183C14.0375 20.7499 12.8329 19.5453 12.8329 18.0646C12.8329 16.7333 13.7931 15.6376 15.0496 15.4147V14.4166C15.0496 13.8922 15.4752 13.4666 15.9996 13.4666C16.524 13.4666 16.9496 13.8922 16.9496 14.4166V15.3666H18.2163C18.7407 15.3666 19.1663 15.7922 19.1663 16.3166C19.1663 16.841 18.7407 17.2666 18.2163 17.2666H15.5183C15.0851 17.2666 14.7329 17.6187 14.7329 18.0519C14.7329 18.4978 15.0851 18.8499 15.5183 18.8499Z"
                  fill="#FFBB38"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_9726">
                  <rect
                    width="30.4"
                    height="30.4"
                    fill="white"
                    transform="translate(0.799805 0.799805)"
                  />
                </clipPath>
              </defs>
            </svg>

            <Stack gap={"2px"}>
              <LabelText label={"Portfolio Value"} />
              <NumberFormatter
                value={123456789}
                thousandSeparator={true}
                prefix={"$"}
              />
            </Stack>
          </Group>
        </CardContainer>

        <CardContainer style={{ flexGrow: 1, height: "6rem" }}>
          <Group gap={"3rem"} align={"flex-start"}>
            <Stack gap={"2px"}>
              <LabelText label={"Name"} />
              <ValueText label={"John Doe"} />
            </Stack>
            <Stack gap={"2px"}>
              <LabelText label={"Contact"} />

              <ValueText label={"john.doe@example.com"} />
              <ValueText label={"+1 (555) 555-5555"} />
            </Stack>
            <Stack gap={"2px"}>
              <LabelText label={"Address"} />
              <ValueText label={"123 Main St\nAnytown, USA"} />
            </Stack>
          </Group>
        </CardContainer>
      </Group>
      <Group justify={"space-between"}>
        <Title order={4}>Policies</Title>
        <Group>
          {/*<Tooltip*/}
          {/*  label={*/}
          {/*    selectedPolicies.length === 0*/}
          {/*      ? "Select Policies To Edit Multiple Policies"*/}
          {/*      : "Edit Policies"*/}
          {/*  }*/}
          {/*>*/}
          <Button variant={"outline"} component={Link} to={"/edit-policies/"}>
            Edit My Policies
          </Button>
          {/*</Tooltip>*/}
          <Button variant={"outline"}>Contact Advisor</Button>
        </Group>
      </Group>
      <PolicyGrid
      // selectedPolicies={selectedPolicies}
      // setSelectedPolicies={setSelectedPolicies}
      />
    </Stack>
  );
}
