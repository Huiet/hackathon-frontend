import { createFileRoute } from "@tanstack/react-router";
import { Beneficiary, MockData } from "../../../../../PolicyGrid";
import { CardContainer, PolicyDetailsButton } from "../../../../../components";
import {
  Text,
  Button,
  Group,
  Stack,
  Table,
  ActionIcon,
  TextInput,
  NumberInput,
  RadioGroup,
  Radio,
} from "@mantine/core";
import { useState } from "react";
import { usePolicyAsSearchParams } from "../../../../../hooks/usePolicyAsSearchParams";
import { IconRotateClockwise2 } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";

export const Route = createFileRoute(
  "/edit-policies/edit-beneficiaries/$policy_number/modify_policy/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [addingBenificiary, setAddingBenificiary] = useState<boolean>(false);
  const params = Route.useParams();
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
      ssn: "",
      phoneNumber: "",
    },
    validate: {
      name: isNotEmpty("Required"),
      // role: isNotEmpty("Required"),
      relationship: isNotEmpty("Required"),
      // type: isNotEmpty("Required"),
      // value: isNotEmpty("Required"),
      email: isNotEmpty("Required"),
      address: isNotEmpty("Required"),
      ssn: isNotEmpty("Required"),
      phoneNumber: isNotEmpty("Required"),
    },
  });

  return (
    <Stack>
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
              disabled={addingBenificiary}
              onClick={() => setAddingBenificiary(true)}
            >
              Add Beneficiary
            </Button>
          </Group>
          <Table
            // striped
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
          <div>
            <Button
              leftSection={<IconRotateClockwise2 />}
              variant={"outline"}
              disabled={addingBenificiary}
              onClick={undoChanges}
            >
              Undo Changes
            </Button>
          </div>
        </Stack>
      </CardContainer>

      {addingBenificiary && (
        <CardContainer style={{ height: "fit-content", width: "100%" }}>
          <form>
            <Group>
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

              <NumberInput
                label={"SSN Number"}
                {...beneficiaryForm.getInputProps("ssn")}
              />
              <RadioGroup {...beneficiaryForm.getInputProps("role")}>
                <Radio label={"Primayy"} value={"primary"}></Radio>
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
                Submit
              </Button>
            </Group>
          </form>
        </CardContainer>
      )}
    </Stack>
  );
}
