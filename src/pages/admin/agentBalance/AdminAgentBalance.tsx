import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  IAdminAgentBalanceItem,
  useGetAdminAgentBalanceQuery,
} from "../../../app/services/admin/givingMoneyToAgent/adminGivingMoneyToAgent";
import formatCommaNum from "../../../util/formatCommaNum";
import AdminAgentBalanceTable, {
  TAdminAgentTableColumns,
} from "./components/AdminAgentBalanceTable";

const AdminAgentBalance: React.FC = () => {
  // Api
  const { data, isLoading } = useGetAdminAgentBalanceQuery();

  // Navigate
  const navigate = useNavigate();

  // useMemo
  const tableData = useMemo<IAdminAgentBalanceItem[]>(() => {
    if (!data?.success) return [];
    return data?.data.map((item) => ({
      ...item,
      balans: formatCommaNum.formatNumber(item.balans),
    }));
  }, [data?.data, data?.success]);

  // columns
  const tableColumns = useMemo<TAdminAgentTableColumns>(() => {
    return [
      {
        accessorKey: "id",
        header: "Id",
        size: 10,
      },
      {
        accessorKey: "xaridchi",
        header: "Xaridchi",
        size: 10,
      },
      {
        accessorKey: "balans",
        header: "Balans",
        size: 10,
      },
    ];
  }, []);

  return (
    <Box maxWidth={800} m={"auto"}>
      <AdminAgentBalanceTable
        data={tableData}
        columns={tableColumns}
        isLoading={isLoading}
        exportFileName="Agentlar balansi"
      />
    </Box>
  );
};

export default AdminAgentBalance;
