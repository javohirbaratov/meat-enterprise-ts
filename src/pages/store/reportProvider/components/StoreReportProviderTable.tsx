import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { memo } from "react";
import { IStoreReportProviderResItem } from "../../../../app/services/store/reportsProvider/storeReportsProvider";
import { tableLocalization } from "../../../../constants/const";

export interface IStoreReportProviderTableRow extends IStoreReportProviderResItem {}

export type TStoreReportProviderTableColumns = MRT_ColumnDef<IStoreReportProviderTableRow>[];

interface IStoreReportCashierTableProps {
  data: IStoreReportProviderTableRow[];
  columns: TStoreReportProviderTableColumns;
  exportFileName: string;
  isLoading: boolean;
}
const StoreReportProviderTable: React.FC<IStoreReportCashierTableProps> = ({
  data = [],
  columns = [],
  exportFileName,
  isLoading,
}) => {
  // Export to PDf
  const handleExportRows = (rows: MRT_Row<IStoreReportProviderTableRow>[]) => {
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
    // renderTopToolbarCustomActions: ({ table }) => (
    //   <Box
    //     sx={{
    //       display: "flex",
    //       gap: "16px",
    //       padding: "8px",
    //       flexWrap: "wrap",
    //     }}
    //   >
    //     <Button
    //       disabled={table.getPrePaginationRowModel().rows.length === 0}
    //       //export all rows, including from the next page, (still respects filtering and sorting)
    //       onClick={() =>
    //         handleExportRows(table.getPrePaginationRowModel().rows)
    //       }
    //       startIcon={<FileDownload />}
    //     >
    //       Export
    //     </Button>
    //   </Box>
    // ),
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default memo(StoreReportProviderTable);
