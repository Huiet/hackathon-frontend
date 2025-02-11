import { createFileRoute } from "@tanstack/react-router";
import { Beneficiary, MockData } from "../../../../../PolicyGrid";
import { CardContainer, PolicyDetailsButton } from "../../../../../components";
import { Text, Button, Group, Stack, Table } from "@mantine/core";
import { useState } from "react";
import { usePolicyAsSearchParams } from "../../../../../hooks/usePolicyAsSearchParams";

export const Route = createFileRoute(
  "/edit-policies/edit-beneficiaries/$policy_number/modify_policy/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const policy = MockData.find(
    (policy) => policy.policyNumber === params.policy_number,
  );
  const [currentBeneficiaries, setCurrentBeneficiaries] = useState<
    Beneficiary[]
  >(policy?.beneficiaries || []);
  const foo = Route.useSearch();
  const {
    policy: search,
    setFilters,
    clearPolicy,
  } = usePolicyAsSearchParams(Route.id);
  console.log(foo);
  return (
    <CardContainer style={{ height: "fit-content", width: "100%" }}>
      <Stack>
        <Group justify={"space-between"}>
          {policy?.policyNumber && (
            <Group>
              <Text>Policy:</Text>
              <PolicyDetailsButton policyNumber={policy.policyNumber} />
            </Group>
          )}

          <Table striped highlightOnHover withRowBorders={false}></Table>

          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Name</Table.Td>
            </Table.Tr>
          </Table.Tbody>
          <Button>Add Beneficiary</Button>
        </Group>
      </Stack>
    </CardContainer>
  );
}
