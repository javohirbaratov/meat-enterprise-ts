import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable
} from "material-react-table";
import React, { memo } from "react";
import { IStoreReportCashierAktItem } from "../../../../app/services/store/reports/storeReports";
import { tableLocalization } from "../../../../constants/const";

export interface IStoreReportCashierTableRow
  extends IStoreReportCashierAktItem {}

export type TStoreReportCashierTableColumns =
  MRT_ColumnDef<IStoreReportCashierTableRow>[];

interface IStoreReportCashierTableProps {
  data: IStoreReportCashierTableRow[];
  columns: TStoreReportCashierTableColumns;
  exportFileName: string;
  isLoading: boolean;
}

const StoreReportCashierTable: React.FC<IStoreReportCashierTableProps> = ({
  data = [],
  columns = [],
  exportFileName,
  isLoading,
}) => {
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

export default memo(StoreReportCashierTable);
