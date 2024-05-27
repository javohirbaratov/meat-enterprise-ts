import React, { useMemo, useState } from "react";
import { useGetAdminReportsCustomerDebtQuery } from "../../../app/services/admin/reports/adminReports";

import { v4 as uuidv4 } from "uuid";
import { IDate } from "../../../types/api";
import formatCommaNum from "../../../util/formatCommaNum";
import AdminReportsCustomerDebtTable, {
  IAdminReportsCustomerDebtTableRow,
  TAdminReportsCustomerDebtTableColumns,
} from "./components/AdminReportsCustomerDebtTable";

const AdminReportsCustomerDebt: React.FC = () => {
  // State
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState<IDate>({
    start: null,
    end: null,
  });

  // Api
  const { data, isLoading } = useGetAdminReportsCustomerDebtQuery({
    date: selectedDate,
    customer_id: selectedCustomer,
  });

  // useMemo
  const tableData = useMemo<IAdminReportsCustomerDebtTableRow[]>(() => {
    if (!data?.success) return [];
    return data?.data.akt.map((item) => ({
      id: uuidv4(),
      fio: item.fio,
      eski_qarz: formatCommaNum.formatNumber(item.eski_qarz),
      debit: formatCommaNum.formatNumber(item.debit),
      jamikredit: formatCommaNum.formatNumber(item.jamikredit),
      massavozvrat: formatCommaNum.formatNumber(item.massavozvrat),
      saldo: formatCommaNum.formatNumber(item.saldo),
    }));
  }, [data?.data, data?.success]);

  // columnsTAdminReportsCustomerDebtTableColumns
  const tableColumns = useMemo<TAdminReportsCustomerDebtTableColumns>(() => {
    return [
      {
        accessorKey: "fio",
        header: "Mijoz",
        size: 10,
      },
      {
        accessorKey: "eski_qarz",
        header: "Eski qarz",
        size: 10,
      },
      {
        accessorKey: "debit",
        header: "Debet",
        size: 10,
      },
      {
        accessorKey: "jamikredit",
        header: "Jami kredit",
        size: 10,
      },
      {
        accessorKey: "massavozvrat",
        header: "Massa vozvrat",
        size: 10,
      },
      {
        accessorKey: "saldo",
        header: "Saldo",
        size: 10,
      },
    ];
  }, []);

  return (
    <AdminReportsCustomerDebtTable
      data={tableData}
      columns={tableColumns}
      exportFileName="Mijozlarning hisobotlari"
      isLoading={isLoading}
      setDate={setSelectedDate}
      setCustomer={setSelectedCustomer}
      customer={selectedCustomer}
    />
  );
};

export default AdminReportsCustomerDebt;
