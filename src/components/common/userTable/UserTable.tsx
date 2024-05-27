import { Box, Button } from "@mui/material";
import {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React from "react";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import { FileDownload } from "@mui/icons-material";

export interface IUserTablePersonRow {
  id: string;
  login: string;
  ism: string;
  familiya: string;
  telefon: string;
  status: string;
}

export type TUserTableColumns = MRT_ColumnDef<IUserTablePersonRow>[];

interface UserTableProps {
  data: IUserTablePersonRow[];
  columns: TUserTableColumns;
}

const UserTable: React.FC<UserTableProps> = ({ data = [], columns = [] }) => {
  // Export to PDf
  const handleExportRows = (rows: MRT_Row<IUserTablePersonRow>[]) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save("mrt-pdf-example.pdf");
  };

  // Table
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: false,
    enableColumnDragging: false,
    enableColumnOrdering: false,
    enableFullScreenToggle: false,
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

export default UserTable;
