import { Table, NumberFormatter } from "@mantine/core";
import { Beneficiary } from "../PolicyGrid";
import { camelCaseToWords } from "../routes/$userId/edit-policies/edit-beneficiaries";

type BeneTableProps = {
  beneficiaries: Beneficiary[];
};

export const BeneTable = ({ beneficiaries }: BeneTableProps) => {
  return (
    <Table striped highlightOnHover withRowBorders={false}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ width: "20rem" }}>Name</Table.Th>
          <Table.Th>Per Stirpes?</Table.Th>
          <Table.Th>Allocation</Table.Th>
          <Table.Th style={{ width: "14rem" }}>Primary / Contingent</Table.Th>
          <Table.Th>Relationship</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {beneficiaries.map((beneficiary) => (
          <Table.Tr key={beneficiary.beneName}>
            <Table.Td>{camelCaseToWords(beneficiary.beneName)}</Table.Td>
            <Table.Td>Yes</Table.Td>
            <Table.Td>
              {+beneficiary.beneValue > 100 ? (
                <NumberFormatter
                  value={beneficiary.beneValue}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              ) : (
                `${beneficiary.beneValue}%`
              )}
            </Table.Td>
            <Table.Td>{camelCaseToWords(beneficiary.beneRole)}</Table.Td>
            <Table.Td>{camelCaseToWords(beneficiary.relationship)}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};
