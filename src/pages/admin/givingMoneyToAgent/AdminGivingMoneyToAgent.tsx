import { GetApp, Upload } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAdminGivingMoneyToAgentQuery } from "../../../app/services/admin/givingMoneyToAgent/adminGivingMoneyToAgent";
import TransactionTable, {
  ITransactionTableRow,
  TTransactionTableColumns,
} from "../../../components/common/transactionTable/TransactionTable";
import { admin_routes } from "../../../constants/path";
import formatCommaNum from "../../../util/formatCommaNum";

const AdminGivingMoneyToAgent: React.FC = () => {
  // Api
  const { data, isLoading } = useGetAdminGivingMoneyToAgentQuery();

  // Navigate
  const navigate = useNavigate();

  // useMemo
  const tableData = useMemo<ITransactionTableRow[]>(() => {
    if (!data?.success) return [];
    return data?.data.map((item) => ({
      id: item.id,
      getter_user: item.xaridchi,
      setter_user: item.pul_beruvchi,
      price: formatCommaNum.formatNumber(item.naqdsum),
      before_price: formatCommaNum.formatNumber(item.oldin),
      after_price: formatCommaNum.formatNumber(item.keyin),
      date: item.sana,
      status: item.holat,
    }));
  }, [data?.data, data?.success]);

  // columns
  const tableColumns = useMemo<TTransactionTableColumns>(() => {
    return [
      {
        accessorKey: "id",
        header: "Id",
        size: 10,
      },
      {
        accessorKey: "getter_user",
        header: "Oluvchi",
        size: 20,
      },
      {
        accessorKey: "setter_user",
        header: "Beruvchi",
        size: 20,
      },
      {
        accessorKey: "price",
        header: "Narx",
        size: 20,
      },
      {
        accessorKey: "before_price",
        header: "Oldingi narx",
        size: 20,
      },
      {
        accessorKey: "after_price",
        header: "Hozirgi narx",
        size: 20,
      },
      {
        accessorKey: "date",
        header: "Sana",
        size: 20,
      },
      {
        accessorKey: "status",
        header: "Holat",
        size: 20,
      },
    ];
  }, []);

  return (
    <>
      <Stack py={3} gap={1} direction={"row"} justifyContent={"end"}>
        <Button
          onClick={() => navigate(admin_routes.givingMoneyToAgentAdd)}
          startIcon={<Upload />}
          variant="contained"
        >
          Pul berish
        </Button>
        <Button
          onClick={() => navigate(admin_routes.givingMoneyToAgentGet)}
          startIcon={<GetApp />}
          variant="contained"
        >
          Pul olish
        </Button>
      </Stack>
      <TransactionTable
        data={tableData}
        columns={tableColumns}
        exportFileName="Agentga berilgan va olingan pullar"
        isLoading={isLoading}
      />
    </>
  );
};

export default AdminGivingMoneyToAgent;
