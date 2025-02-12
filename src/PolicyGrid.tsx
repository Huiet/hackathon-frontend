import {
  ColDef,
  colorSchemeDark,
  RowSelectionOptions,
  SelectionChangedEvent,
  themeQuartz,
  ValueGetterParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import {
  Button,
  NumberFormatter,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useCallback, useMemo } from "react";
import { useGetPolicies } from "./api/serviice";

export type Transaction = {
  date: string;
  category: string;
};
export type PolicySummary = {
  value: number;
  ownerName: string;
  ownerEmail: string;
  ownerAddress: string;
  ownerCity: string;
  ownerState: string;
  ownerZip: number;
  phoneNumber: string;
};

export type Beneficiary = {
  role: string; // (primary, secondary, contingent),
  relationship: string;
  name: string;
  type: string; //percentage/dollar
  value: number | ""; //	(could be percentage, could be dollar)

  email: string;
  address: string;
  phoneNumber: number | "";
  perStirpes: "Yes" | "No" | boolean;
};

export type Policy = {
  lastUpdated: string;
  policyNumber: string;
  carrier: string;
  firm: string;
  accountValue: number;
  productCategory: string;
  financialAdvisor: string;
  productName: string;
  owner: {
    firstName: string;
    lastName: string;
    middleName: string;
    address: string;
    city: string;
    state: string;
    zip: number;
    phoneNumber: string;
  };
  distributionType: string; //(dollar/percentage or persturbes)
  beneficiaries: Beneficiary[];
};

export const MockData: Policy[] = [
  {
    lastUpdated: "2025-02-10",
    policyNumber: "POL123456789",
    carrier: "ABC Insurance",
    firm: "XYZ Financial",
    accountValue: 150000,
    productCategory: "Life Insurance",
    financialAdvisor: "John Doe",
    productName: "Term Life",
    owner: {
      firstName: "Michael",
      lastName: "Smith",
      middleName: "James",
      address: "123 Maple Street",
      city: "Springfield",
      state: "IL",
      zip: 62701,
      phoneNumber: "555-1234",
    },
    distributionType: "percentage",
    beneficiaries: [
      {
        role: "primary",
        relationship: "spouse",
        name: "Sarah Smith",
        type: "percentage",
        value: 100,
        email: "SarahSmith@foo.com",
        address: "somewhere",
        phoneNumber: 123123123,
        perStirpes: true,
      },
      {
        role: "contingent",
        relationship: "child",
        name: "Emily Smith",
        type: "percentage",
        value: 50,
        email: "SarahSmith@foo.com",
        address: "somewhere",
        phoneNumber: 123123123,
        perStirpes: true,
      },
      {
        role: "contingent",
        relationship: "sibling",
        name: "David Smith",
        type: "percentage",
        value: 50,
        email: "SarahSmith@foo.com",
        address: "somewhere",
        phoneNumber: 123123123,
        perStirpes: true,
      },
    ],
  },
  {
    lastUpdated: "2025-02-10",
    policyNumber: "POL987654321",
    carrier: "XYZ Life",
    firm: "ABC Investments",
    accountValue: 200000,
    productCategory: "Annuity",
    financialAdvisor: "Jane Roe",
    productName: "Fixed Annuity",
    owner: {
      firstName: "Lisa",
      lastName: "Johnson",
      middleName: "Marie",
      address: "456 Oak Avenue",
      city: "Chicago",
      state: "IL",
      zip: 60601,
      phoneNumber: "555-5678",
    },
    distributionType: "dollar",
    beneficiaries: [
      {
        role: "primary",
        relationship: "spouse",
        name: "Tom Johnson",
        type: "dollar",
        value: 100,
        email: "SarahSmith@foo.com",
        address: "somewhere",
        phoneNumber: 123123123,
        perStirpes: true,
      },
      {
        role: "contingent",
        relationship: "child",
        name: "Sophia Johnson",
        type: "dollar",
        value: 100,
        email: "SarahSmith@foo.com",
        address: "somewhere",
        phoneNumber: 123123123,
        perStirpes: true,
      },
    ],
  },
  {
    lastUpdated: "2025-02-10",
    policyNumber: "POL112233445",
    carrier: "PQR Insurance",
    firm: "LMN Wealth",
    accountValue: 250000,
    productCategory: "Disability Insurance",
    financialAdvisor: "Emily Davis",
    productName: "Short-Term Disability",
    owner: {
      firstName: "Kevin",
      lastName: "Brown",
      middleName: "Edward",
      address: "789 Pine Road",
      city: "Peoria",
      state: "IL",
      zip: 61602,
      phoneNumber: "555-8765",
    },
    distributionType: "percentage",
    beneficiaries: [
      {
        role: "primary",
        relationship: "partner",
        name: "Jessica Brown",
        type: "percentage",
        value: 100,
        email: "SarahSmith@foo.com",
        address: "somewhere",
        phoneNumber: 123123123,
        perStirpes: true,
      },
    ],
  },
];

const colDefs: ColDef<Policy>[] = [
  {
    headerName: "Carrier",
    field: "carrier",
  },
  {
    headerName: "Firm",
    field: "firm",
  },
  {
    headerName: "Account Value",
    field: "accountValue",
    cellRenderer: (params: any) => {
      return (
        <NumberFormatter
          value={params.value}
          thousandSeparator={true}
          prefix={"$"}
        />
      );
    },
  },
  {
    headerName: "Product Category",
    field: "productCategory",
  },
  {
    headerName: "Financial Advisor",
    field: "financialAdvisor",
  },
  // {
  //   headerName: "",
  //   pinned: "right",
  //   minWidth: 100,
  //   maxWidth: 100,
  //   lockPinned: true,
  //   colId: "actions",
  //   cellRenderer: (params: CustomCellRendererProps<Policy>) => {
  //     return (
  //       <Button variant="outline" size={"compact-md"}>
  //         Edit
  //       </Button>
  //     );
  //   },
  // },
];

const defaultColDef: ColDef = {
  lockVisible: true,
  suppressMovable: true,
  flex: 1,
  minWidth: 150,
  sortable: true,
  resizable: true,
  filter: false,
};

const selectionColumnDef: ColDef = {
  pinned: "left",
  lockPinned: true,
};

const PolicyCellRenderer = (params: any) => {
  return (
    <div style={{ lineHeight: "1rem" }}>
      <Button
        pl={0}
        variant={"transparent"}
        size={"compact-sm"}
        onClick={() => params.openDetailsModal(params.data)}
      >
        {params.data?.policyNumber}
      </Button>
      <Text component={"div"} size={"xs"} color={"dimmed"}>
        Last Updated: {params.data?.lastUpdated}
      </Text>
    </div>
  );
};

type PolicyGridProps = {
  selectedPolicies?: Policy[];
  setSelectedPolicies?: (policies: Policy[]) => void;
  policies: Policy[];
};
export const PolicyGrid = ({
  selectedPolicies,
  setSelectedPolicies,
  policies,
}: PolicyGridProps) => {
  console.log("policies", policies);
  const rowSelection: RowSelectionOptions | undefined = useMemo(
    () =>
      setSelectedPolicies
        ? {
            mode: "multiRow",
          }
        : undefined,
    [],
  );
  const openDetailsModal = useCallback((policy: Policy) => {}, []);

  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent<Policy>) => {
      const dataSelected = event.api.getSelectedRows();
      setSelectedPolicies?.(dataSelected);
      console.log(event);
    },
    [],
  );

  const colDefsToUse: ColDef[] = useMemo(() => {
    return [
      {
        pinned: "left",
        lockPinned: true,
        minWidth: 200,
        width: 200,
        autoHeight: true,
        headerName: "Policy Number",
        field: "policyNumber",
        cellRenderer: PolicyCellRenderer,
        cellRendererParams: {
          openDetailsModal: openDetailsModal,
        },
      },
      ...colDefs,
    ];
  }, []);

  const { colorScheme } = useMantineColorScheme();
  return (
    <AgGridReact
      theme={
        colorScheme === "light"
          ? themeQuartz
          : themeQuartz.withPart(colorSchemeDark)
      }
      columnDefs={colDefsToUse}
      rowData={MockData}
      defaultColDef={defaultColDef}
      rowSelection={rowSelection}
      selectionColumnDef={selectionColumnDef}
      onSelectionChanged={onSelectionChanged}
    />
  );
};
