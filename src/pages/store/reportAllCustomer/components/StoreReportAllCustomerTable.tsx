import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import {
  MRT_ColumnDef,
  MRT_Row,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import React, { memo } from "react";
import { IStoreReportAllCustomerAktItem } from "../../../../app/services/store/reports/storeReports";
import { tableLocalization } from "../../../../constants/const";

export interface IStoreReportAllCustomerTableRow
  extends IStoreReportAllCustomerAktItem {}

export type TStoreReportAllCustomerTableColumns =
  MRT_ColumnDef<IStoreReportAllCustomerTableRow>[];

interface IStoreReportAllCustomerTableProps {
  data: IStoreReportAllCustomerTableRow[];
  columns: TStoreReportAllCustomerTableColumns;
  exportFileName: string;
  isLoading: boolean;
}

const StoreReportAllCustomerTable: React.FC<
  IStoreReportAllCustomerTableProps
> = ({ data = [], columns = [], exportFileName, isLoading }) => {
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

export default memo(StoreReportAllCustomerTable);
