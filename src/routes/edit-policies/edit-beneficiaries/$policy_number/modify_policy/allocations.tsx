import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { isNotEmpty, useForm } from "@mantine/form";
import { Beneficiary, MockData, Policy } from "../../../../../PolicyGrid";
import { usePolicyAsSearchParams } from "../../../../../hooks/usePolicyAsSearchParams";
import {
  Radio,
  Input,
  Stack,
  Table,
  Title,
  Switch,
  NumberInput,
  Group,
  Button,
} from "@mantine/core";
import { CardContainer } from "../../../../../components";
import { camelCaseToWords } from "../../index";

export const Route = createFileRoute(
  "/edit-policies/edit-beneficiaries/$policy_number/modify_policy/allocations",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const params = Route.useParams();
  const policyBeforeEdits = MockData.find(
    (policy) => policy.policyNumber === params.policy_number,
  );
  const { policy, setPolicy } = usePolicyAsSearchParams(Route.id);
  const beneficiaryForm = useForm<Partial<Policy>>({
    initialValues: {
      // beneficiaries: policyBeforeEdits?.beneficiaries,
      beneficiaries: policy?.beneficiaries,
    },
    validate: {
      beneficiaries: (value, values) => {
        if ((value?.length || 0) === 0) {
          return "Enter Beneficiaries";
        }

        const primaryBeneficiaries = values.beneficiaries?.filter(
          (beneficiary) => beneficiary.role === "primary",
        );
        const secondaryBeneficiaries = values.beneficiaries?.filter(
          (beneficiary) => beneficiary.role === "contingent",
        );
        const sumOfSecondaryBeneficiaries = secondaryBeneficiaries?.reduce(
          (sum, beneficiary) => sum + +beneficiary.value || 0,
          0,
        );

        if ((primaryBeneficiaries?.length || 0) > 0) {
          const sumOfPrimaryBeneficiaries = primaryBeneficiaries?.reduce(
            (sum, beneficiary) => sum + +beneficiary.value || 0,
            0,
          );
          if (sumOfPrimaryBeneficiaries !== 100) {
            return "Sum of Primary Beneficiaries must be 100";
          }
        }
        if ((secondaryBeneficiaries?.length || 0) > 0) {
          if (sumOfSecondaryBeneficiaries !== 100) {
            return "Sum of Secondary Beneficiaries must be 100";
          }
        }
        return null;
      },
    },
  });
  return (
    <Stack>
      <Title>Update Allocations</Title>
      <CardContainer>
        <Table horizontalSpacing="xl">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Beneficiary</Table.Th>
              <Table.Th>Add Per Stirpes</Table.Th>
              <Table.Th>Percentage </Table.Th>
              <Table.Th>Primary / Contingent</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {policy.beneficiaries.map((beneficiary, index) => (
              <Table.Tr key={beneficiary.name}>
                <Table.Td>{beneficiary.name}</Table.Td>
                <Table.Td>
                  <Switch
                    {...beneficiaryForm.getInputProps(
                      `beneficiaries.${index}.perStirpes`,
                      { type: "checkbox" },
                    )}
                    onChange={(e) => {
                      console.log(",change per stirpes", e);
                      for (let i = 0; i < policy.beneficiaries.length; i++) {
                        beneficiaryForm.setFieldValue(
                          `beneficiaries.${i}.perStirpes`,
                          e.target.checked,
                        );
                      }
                    }}
                  />
                </Table.Td>
                <Table.Td>
                  <NumberInput
                    rightSection={"%"}
                    {...beneficiaryForm.getInputProps(
                      `beneficiaries.${index}.value`,
                    )}
                    onChange={(e) => {
                      console.log(",change value", e);
                      beneficiaryForm.setFieldValue(
                        `beneficiaries.${index}.value`,
                        e === "" ? "" : +e,
                      );
                      beneficiaryForm.validate();
                    }}
                    placeholder="% Value"
                    error={beneficiaryForm.errors.beneficiaries}
                  />
                </Table.Td>
                <Table.Td>{camelCaseToWords(beneficiary.role)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Group justify={"flex-end"}>
          <Button
            disabled={!beneficiaryForm.isValid()}
            onClick={() => {
              const newPolicy = {
                ...policy,
                beneficiaries: beneficiaryForm.values.beneficiaries,
              };
              setPolicy(newPolicy);
              setTimeout(() => {
                navigate({ to: "../verify-and-submit", search: newPolicy });
              });
            }}
          >
            Next
          </Button>
        </Group>
      </CardContainer>
    </Stack>
  );
}
