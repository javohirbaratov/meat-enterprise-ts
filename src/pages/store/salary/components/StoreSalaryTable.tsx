import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable
} from "material-react-table";
import React, { memo } from "react";
import { IStoreSalaryResWorkerItem } from "../../../../app/services/store/salary/storeSalary";
import { tableLocalization } from "../../../../constants/const";

export interface IStoreSalaryTableRow extends IStoreSalaryResWorkerItem {}

export type TStoreSalaryTableColumns = MRT_ColumnDef<IStoreSalaryTableRow>[];

interface IStoreSalaryTableProps {
  data: IStoreSalaryTableRow[];
  columns: TStoreSalaryTableColumns;
  exportFileName: string;
  isLoading: boolean;
}
const StoreSalaryTable: React.FC<IStoreSalaryTableProps> = ({
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

export default memo(StoreSalaryTable);
