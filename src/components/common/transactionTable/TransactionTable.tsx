import { FileDownload } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React from "react";
import { tableLocalization } from "../../../constants/const";

export interface ITransactionTableRow {
  id: string;
  getter_user: string;
  setter_user: string;
  price: string;
  before_price: string;
  after_price: string;
  date: string;
  status: string;
}

export type TTransactionTableColumns = MRT_ColumnDef<ITransactionTableRow>[];

interface ITransactionTableProps {
  data: ITransactionTableRow[];
  columns: TTransactionTableColumns;
  exportFileName: string;
  isLoading: boolean;
}

const TransactionTable: React.FC<ITransactionTableProps> = ({
  data = [],
  columns = [],
  exportFileName,
  isLoading,
}) => {
  // Export to PDf
  const handleExportRows = (rows: MRT_Row<ITransactionTableRow>[]) => {
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
    initialState: {density: 'compact'},
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

  return <MaterialReactTable table={table} />;
};

export default TransactionTable;
