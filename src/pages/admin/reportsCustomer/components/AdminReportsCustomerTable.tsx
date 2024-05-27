import { FileDownload } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { Dispatch, useMemo } from "react";
import { useGetSalesCustomerQuery } from "../../../../app/services/sales/customer/salesCustomer";
import MyDateRange from "../../../../components/common/ui/myDateRange/MyDateRange";
import { tableLocalization } from "../../../../constants/const";
import { IDate } from "../../../../types/api";

export interface IAdminReportsCustomerTableRow {
  fio: string;
  debit: number;
  jamikredit: number;
  saldo: number;
}

export type TAdminReportsCustomerTableColumns =
  MRT_ColumnDef<IAdminReportsCustomerTableRow>[];

interface IAdminReportsCustomerTableProps {
  data: IAdminReportsCustomerTableRow[];
  columns: TAdminReportsCustomerTableColumns;
  exportFileName: string;
  isLoading: boolean;
  setDate: ({ start, end }: IDate) => void;
  setCustomer: Dispatch<string>;
  customer: string;
}

const AdminReportsCustomerTable: React.FC<IAdminReportsCustomerTableProps> = ({
  data = [],
  columns = [],
  exportFileName,
  isLoading,
  setDate,
  setCustomer,
  customer,
}) => {
  // Export to PDf
  const handleExportRows = (rows: MRT_Row<IAdminReportsCustomerTableRow>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save(`${exportFileName}.pdf`);
  };

  // Table
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: false,
    enableColumnDragging: false,
    enableColumnOrdering: false,
    enableFullScreenToggle: false,
    state: {
      isLoading,
    },
    initialState: { density: "compact" },
    localization: tableLocalization,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          //export all rows, including from the next page, (still respects filtering and sorting)
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownload />}
        >
          Export
        </Button>
      </Box>
    ),
  });

  // Api
  const customerCategoryRes = useGetSalesCustomerQuery();

  // useMemo
  const customerCategoryOptions = useMemo(() => {
    if (customerCategoryRes.data?.success) {
      return customerCategoryRes.data?.data;
    }
    return [];
  }, [customerCategoryRes]);

  return (
    <>
      <Grid
        container
        my={4}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item sm={6} md={4}>
          {customerCategoryRes.isLoading ? (
            <Skeleton variant="rounded" height={40} />
          ) : (
            <TextField
              fullWidth
              size="small"
              select
              label="Mijoz tanlang"
              sx={{ m: 0 }}
              value={customer}
              onChange={(e) => setCustomer(e.target.value || "")}
            >
              <MenuItem>None</MenuItem>
              {customerCategoryOptions?.map((state) => (
                <MenuItem key={state.id} value={state.id}>
                  {state.fio}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>
        <Grid
          item
          sm={6}
          md={6}
          pl={1}
          justifyContent={"flex-end"}
          flexDirection={"row"}
          display={"flex"}
        >
          <MyDateRange setValue={setDate} />
        </Grid>
      </Grid>
      <MaterialReactTable table={table} />
    </>
  );
};

export default AdminReportsCustomerTable;
