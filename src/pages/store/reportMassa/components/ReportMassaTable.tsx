import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { memo } from "react";
import { IStoreReportMassaResListItem } from "../../../../app/services/store/reportMassa/reportMassa";
import { tableLocalization } from "../../../../constants/const";

export interface IStoreReportMassaTableRow extends IStoreReportMassaResListItem {}

export type TStoreReportMassaColumns = MRT_ColumnDef<IStoreReportMassaTableRow>[];

interface IStoreDebtTableProps {
  data: IStoreReportMassaTableRow[];
  columns: TStoreReportMassaColumns;
  exportFileName: string;
  isLoading: boolean;
}

const ReportMassaTable: React.FC<IStoreDebtTableProps> = ({
  data = [],
  columns = [],
  exportFileName,
  isLoading,
}) => {
  // Export to PDf
  const handleExportRows = (rows: MRT_Row<IStoreReportMassaTableRow>[]) => {
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
  });

  return (
    <>
      <MaterialReactTable table={table} />
    </>
  );
};

export default memo(ReportMassaTable);
