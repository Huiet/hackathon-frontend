import { createFileRoute } from "@tanstack/react-router";
import {
  Text,
  Button,
  Group,
  Stack,
  Title,
  useMantineColorScheme,
  Table,
  NumberFormatter,
} from "@mantine/core";
import { CardContainer } from "../../components";
import { MockData } from "../../PolicyGrid";

export const Route = createFileRoute("/edit-policies/edit-beneficiaries")({
  component: RouteComponent,
});

function camelCaseToWords(s: string) {
  const result = s.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function RouteComponent() {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Stack style={{ flexGrow: 1 }}>
      <Title>Edit Beneficiaries</Title>
      {MockData.map((policy) => (
        <CardContainer
          style={{
            flexGrow: 1,
          }}
        >
          <Stack>
            <Group justify={"space-between"}>
              <Group>
                <Text>Policy:</Text>
                <Button
                  pl={0}
                  variant={"transparent"}
                  color={colorScheme === "light" ? "blue.8" : "blue.6"}
                >
                  {policy.policyNumber}
                </Button>
              </Group>
              <Button variant={"outline"}>Edit This Contract</Button>
            </Group>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Per Stripes?</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Primary / Contingent</Table.Th>
                  <Table.Th>Relationship</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {policy.beneficiaries.map((beneficiary) => (
                  <Table.Tr key={beneficiary.name}>
                    <Table.Td>{camelCaseToWords(beneficiary.name)}</Table.Td>
                    <Table.Td>Yes</Table.Td>
                    <Table.Td>
                      {beneficiary.value > 100 ? (
                        <NumberFormatter
                          value={beneficiary.value}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      ) : (
                        `${beneficiary.value}%`
                      )}
                    </Table.Td>
                    <Table.Td>{camelCaseToWords(beneficiary.role)}</Table.Td>
                    <Table.Td>
                      {camelCaseToWords(beneficiary.relationship)}
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Stack>
        </CardContainer>
      ))}
    </Stack>
  );
}
