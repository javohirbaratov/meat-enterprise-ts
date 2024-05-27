import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable
} from "material-react-table";
import React, { memo } from "react";
import { IStoreTransferToFreezerResItem } from "../../../../app/services/store/transferToFreezer/storeTransferToFreezer";
import { tableLocalization } from "../../../../constants/const";

export interface IStoreTransferToFreezezRow
  extends IStoreTransferToFreezerResItem {}

export type TStoreTransferToFreezerColumns =
  MRT_ColumnDef<IStoreTransferToFreezezRow>[];

interface IStoreDebtTableProps {
  data: IStoreTransferToFreezezRow[];
  columns: TStoreTransferToFreezerColumns;
  exportFileName: string;
  isLoading: boolean;
}

const StoreDebtTable: React.FC<IStoreDebtTableProps> = ({
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

export default memo(StoreDebtTable);
