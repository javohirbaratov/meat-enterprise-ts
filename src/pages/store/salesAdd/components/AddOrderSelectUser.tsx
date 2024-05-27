import React, { Dispatch, useMemo, useState } from "react";
import { useGetSalesCustomerQuery } from "../../../../app/services/sales/customer/salesCustomer";
import UserList from "../../../../components/common/userList/UserList";
import { IUserListItem } from "../../../../components/common/userList/UserListItem";
import useUserSearchList from "../../../../hooks/useUserSearchList";
import SearchInput from "../../../../components/common/searchInput/SearchInput";
import { Box } from "@mui/material";

interface IAddOrderSelectUser {
  onPress: Dispatch<string>;
}

const AddOrderSelectUser: React.FC<IAddOrderSelectUser> = ({ onPress }) => {
  // State
  const [search, setSearch] = useState<string>("");

  // Api
  const customerRes = useGetSalesCustomerQuery();

  // Use search
  const [searchUser] = useUserSearchList();

  // Filter
  const customerData = useMemo<IUserListItem[]>(() => {
    if (customerRes.data?.success) {
      return customerRes.data.data.map((item) => ({
        key: item.id,
        name: item.fio,
        phone: item.telefon,
        company: item.korxona,
        editId: item.id,
      }));
    }
    return [];
  }, [customerRes]);

  // Search
  const searchedData = useMemo(() => {
    return searchUser(customerData, search);
  }, [customerData, search, searchUser]);

  return (
    <Box height={"calc(100vh - 116px)"} overflow={"auto"}>
      {/* Search */}
      <SearchInput value={search} setValue={setSearch} />

      {/* User List */}
      <UserList
        data={searchedData}
        isLoading={customerRes.isLoading}
        onPress={onPress}
      />
    </Box>
  );
};

export default AddOrderSelectUser;
