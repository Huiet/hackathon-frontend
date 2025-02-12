import { createFileRoute } from "@tanstack/react-router";
import {
  CardContainer,
  PolicyDetailsButton,
} from "../../../../../../components";
import { Table, Stack, Title, Text, Group, Button } from "@mantine/core";
import { Policy, PolicyGrid } from "../../../../../../PolicyGrid";
import { usePolicyAsSearchParams } from "../../../../../../hooks/usePolicyAsSearchParams";
import { useGetPolicies } from "../../../../../../api/serviice";
import { useState } from "react";

export const Route = createFileRoute(
  "/$userId/edit-policies/edit-beneficiaries/$policy_number/modify_policy/verify-and-submit",
)({
  component: RouteComponent,
});

const TableOfData = ({ data }: { data: Policy[] }) => {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Policy Number</Table.Th>
          <Table.Th>Carrier</Table.Th>
          <Table.Th>Product Name</Table.Th>
          <Table.Th>Firm</Table.Th>
          <Table.Th>Account Value</Table.Th>
          <Table.Th>Product Category</Table.Th>
          <Table.Th>Financial Advisor</Table.Th>
        </Table.Tr>
        <Table.Tbody>
          {data.map((policy) => (
            <Table.Tr key={policy.policyNumber}>
              <Table.Td>{policy.policyNumber}</Table.Td>
              <Table.Td>{policy.carrier}</Table.Td>
              <Table.Td>{policy.productName}</Table.Td>
              <Table.Td>{policy.firm}</Table.Td>
              <Table.Td>{policy.accountValue}</Table.Td>
              <Table.Td>{policy.productCategory}</Table.Td>
              <Table.Td>{policy.financialAdvisor}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table.Thead>
    </Table>
  );
};

function RouteComponent() {
  const params = Route.useParams();
  const userId = params.userId;
  const { policy, setPolicy } = usePolicyAsSearchParams(Route.id);
  const policies = useGetPolicies(userId);
  console.log("aaapolicies", policies);
  const [selectedPolicies, setSelectedPolicies] = useState<Policy[]>([]);
  console.log("ppp");
  return (
    <Stack style={{ width: "100%" }}>
      <Group justify={"space-between"}>
        <Title>Verify and Submit</Title>
        <Button>Submit Updates</Button>
      </Group>
      <CardContainer>
        <Stack>
          <Group>
            <Text>Current Policy:</Text>
            <PolicyDetailsButton policyNumber={policy.policyNumber} />
          </Group>

          <div style={{ height: "7rem" }}>
            <PolicyGrid policies={[policy]} />
          </div>
          {/*<TableOfData data={[policy]} />*/}
        </Stack>
      </CardContainer>
      <CardContainer
        style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Text>
          Would you like to apply these beneficiary changes to any other policy?
        </Text>

        <div style={{ flexGrow: 1, minHeight: "15rem" }}>
          <PolicyGrid
            policies={policies.data || []}
            selectedPolicies={selectedPolicies}
            setSelectedPolicies={(p) => setSelectedPolicies(p)}
          />
        </div>
        {/*<TableOfData data={[]} />*/}
      </CardContainer>
    </Stack>
  );
}
