import React, { useMemo } from "react";
import { useGetAdminUserQuery } from "../../../app/services/admin/users/adminUsers";
import UserTable, {
  IUserTablePersonRow,
  TUserTableColumns,
} from "../../../components/common/userTable/UserTable";

const AdminUsers: React.FC = () => {
  // Api
  const { data } = useGetAdminUserQuery();

  // useMemo
  const tableData = useMemo<IUserTablePersonRow[]>(() => {
    if (!data?.success) return [];
    return data?.data.map((item) => ({
      id: item.id,
      login: item.login,
      ism: item.ism,
      familiya: item.familya,
      telefon: item.telefon,
      status: item.status,
    }));
  }, [data?.data, data?.success]);

  // columns
  const tableColumns = useMemo<TUserTableColumns>(() => {
    return [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "login",
        header: "login",
      },
      {
        accessorKey: "ism",
        header: "ism",
      },
      {
        accessorKey: "familiya",
        header: "familiya",
      },
      {
        accessorKey: "telefon",
        header: "telefon",
      },
      {
        accessorKey: "status",
        header: "status",
      },
    ];
  }, []);

  return (
    <>
      <UserTable data={tableData} columns={tableColumns} />
    </>
  );
};

export default AdminUsers;
