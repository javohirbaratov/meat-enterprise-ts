import React, { useMemo, useState } from "react";
import { useGetAdminReportsCustomerQuery } from "../../../app/services/admin/reports/adminReports";
import AdminReportsCustomerTable, {
  IAdminReportsCustomerTableRow,
  TAdminReportsCustomerTableColumns,
} from "./components/AdminReportsCustomerTable";

import { v4 as uuidv4 } from "uuid";
import { IDate } from "../../../types/api";

const AdminReportsCustomer: React.FC = () => {
  // State
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");

  const [selectedDate, setSelectedDate] = useState<IDate>({
    start: null,
    end: null,
  });

  // Api
  const { data, isLoading } = useGetAdminReportsCustomerQuery({
    date: selectedDate,
    customer_id: selectedCustomer,
  });

  // useMemo
  const tableData = useMemo<IAdminReportsCustomerTableRow[]>(() => {
    if (!data?.success) return [];
    return data?.data.akt.map((item) => ({
      id: uuidv4(),
      fio: item.fio,
      debit: item.debit,
      jamikredit: item.jamikredit,
      saldo: item.saldo,
    }));
  }, [data?.data, data?.success]);

  // columns
  const tableColumns = useMemo<TAdminReportsCustomerTableColumns>(() => {
    return [
      {
        accessorKey: "fio",
        header: "Mijoz",
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
        accessorKey: "saldo",
        header: "Saldo",
        size: 10,
      },
    ];
  }, []);

  return (
    <AdminReportsCustomerTable
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

export default AdminReportsCustomer;
