import { createFileRoute, Link } from "@tanstack/react-router";
import { Beneficiary, MockData } from "../../../../../../PolicyGrid";
import {
  CardContainer,
  PolicyDetailsButton,
} from "../../../../../../components";
import {
  Title,
  Text,
  Button,
  Group,
  Stack,
  Table,
  TextInput,
  NumberInput,
  RadioGroup,
  Radio,
  Center,
} from "@mantine/core";
import { useState } from "react";
import { usePolicyAsSearchParams } from "../../../../../../hooks/usePolicyAsSearchParams";
import { IconPlus, IconRotateClockwise2 } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";

export const Route = createFileRoute(
  "/$userId/edit-policies/edit-beneficiaries/$policy_number/modify_policy/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const [addingBenificiary, setAddingBenificiary] = useState<boolean>(false);
  const policyBeforeEdits = MockData.find(
    (policy) => policy.policyNumber === params.policy_number,
  );

  const { policy, setPolicy } = usePolicyAsSearchParams(Route.id);
  console.log("p", policy.beneficiaries);
  const [currentBeneficiaries, setCurrentBeneficiaries] = useState<
    Beneficiary[]
  >(policy?.beneficiaries || []);
  const undoChanges = () => {
    setPolicy(policyBeforeEdits);
  };

  const beneficiaryForm = useForm<Partial<Beneficiary>>({
    initialValues: {
      name: "",
      role: "",
      relationship: "",
      // type: "",
      value: "",
      email: "",
      address: "",
      phoneNumber: "",
    },
    validate: {
      name: isNotEmpty("Required"),
      // role: isNotEmpty("Required"),
      relationship: isNotEmpty("Required"),
      // type: isNotEmpty("equired"),
      // value: isNotEmpty("Required"),
      email: isNotEmpty("Required"),
      address: isNotEmpty("Required"),
      phoneNumber: isNotEmpty("Required"),
    },
  });

  return (
    <Stack>
      <Title>Add / Delete Beneficiaries</Title>
      <CardContainer style={{ height: "fit-content", width: "100%" }}>
        <Stack>
          <Group justify={"space-between"}>
            {policy?.policyNumber ? (
              <Group>
                <Text>Policy:</Text>
                <PolicyDetailsButton policyNumber={policy.policyNumber} />
              </Group>
            ) : (
              <div></div>
            )}

            <Button
              variant={"outline"}
              size={"compact-md"}
              leftSection={<IconPlus />}
              disabled={addingBenificiary}
              onClick={() => setAddingBenificiary(true)}
            >
              Add Beneficiary
            </Button>
          </Group>
          <div style={{ minWidth: "40rem" }}>
            {policy.beneficiaries?.length > 0 ? (
              <Table
                striped
                // withTableBorder={true}
                highlightOnHover
                withRowBorders={false}
                style={{ width: "40rem" }}
              >
                <Table.Tbody>
                  {policy.beneficiaries?.map((bene: Beneficiary) => (
                    <Table.Tr key={bene.name}>
                      <Table.Td>
                        {bene.role === "primary"
                          ? "Primary Beneficiary"
                          : "Contingent Beneficiary"}
                      </Table.Td>
                      <Table.Td>{bene.name}</Table.Td>
                      {/*<Table.Td>{bene.value}</Table.Td>*/}
                      <Table.Td>
                        <Button
                          color={"red.6"}
                          size={"compact-md"}
                          onClick={() => {
                            setPolicy({
                              ...policy,
                              beneficiaries: policy.beneficiaries?.filter(
                                (x) => x.name !== bene.name,
                              ),
                            });
                          }}
                        >
                          Delete
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            ) : (
              <Center>
                <Title order={4} c={"dimmed"}>
                  Please Add Beneficiary
                </Title>
              </Center>
            )}
          </div>
          <Group justify={"space-between"}>
            <Button
              leftSection={<IconRotateClockwise2 />}
              variant={"outline"}
              disabled={addingBenificiary}
              onClick={undoChanges}
            >
              Undo Changes
            </Button>
            <Button
              disabled={addingBenificiary}
              component={Link}
              to="allocations"
              search={policy}
            >
              Next
            </Button>
          </Group>
        </Stack>
      </CardContainer>

      {addingBenificiary && (
        <Stack>
          <Title order={5}>Add New Beneficiary</Title>
          <CardContainer style={{ height: "fit-content", width: "100%" }}>
            <form>
              <Group gap={"xl"}>
                <TextInput
                  label={"Name"}
                  {...beneficiaryForm.getInputProps("name")}
                />
                <TextInput
                  label={"Email"}
                  {...beneficiaryForm.getInputProps("email")}
                />
                <TextInput
                  label={"Address"}
                  {...beneficiaryForm.getInputProps("address")}
                />
                <NumberInput
                  label={"Phone Number"}
                  {...beneficiaryForm.getInputProps("phoneNumber")}
                />

                <RadioGroup
                  label={"Beneficiary Type"}
                  {...beneficiaryForm.getInputProps("role")}
                  variant={"horizontal"}
                >
                  <Radio label={"Primary"} value={"primary"}></Radio>
                  <Radio label={"Contingent"} value={"contingent"}></Radio>
                </RadioGroup>

                <TextInput
                  label={"Relationship"}
                  {...beneficiaryForm.getInputProps("relationship")}
                />
              </Group>
              <Group mt={"md"} justify={"flex-end"}>
                <Button
                  color={"red.5"}
                  onClick={() => {
                    beneficiaryForm.reset();
                    setAddingBenificiary(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    const valid = beneficiaryForm.isValid();
                    console.log("valid", valid);
                    if (valid) {
                      const foo = {
                        ...policy,
                        beneficiaries: [
                          ...policy.beneficiaries,
                          beneficiaryForm.values,
                        ],
                      };
                      setPolicy(foo);
                      setAddingBenificiary(false);
                    } else {
                      beneficiaryForm.validate();
                      console.log(beneficiaryForm.errors);
                    }
                  }}
                >
                  Add Beneficiary
                </Button>
              </Group>
            </form>
          </CardContainer>
        </Stack>
      )}
    </Stack>
  );
}
