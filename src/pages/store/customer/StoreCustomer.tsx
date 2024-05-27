import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useGetStoreCustomerQuery } from "../../../app/services/store/customer/storeCustomer";
import MobileHeader from "../../../components/common/mobileHeader/MobileHeader";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import UserList from "../../../components/common/userList/UserList";
import { IUserListItem } from "../../../components/common/userList/UserListItem";
import { store_routes } from "../../../constants/path";
import useUserSearchList from "../../../hooks/useUserSearchList";
import { useNavigate } from "react-router-dom";

const StoreCustomer: React.FC = () => {
  // Navigate
  const navigate = useNavigate();

  // State
  const [search, setSearch] = useState<string>("");

  // Api
  const customerRes = useGetStoreCustomerQuery();

  // Use search
  const [searchUser] = useUserSearchList();

  // Filter
  const customerData = useMemo<IUserListItem[]>(() => {
    if (customerRes.data?.success) {
      return customerRes.data.data.map((item) => ({
        key: item.id,
        name: item.fio,
        phone: item.telefon,
        editId: item.id,
      }));
    }
    return [];
  }, [customerRes]);

  // Search
  const searchedData = useMemo(() => {
    return searchUser(customerData, search);
  }, [customerData, search, searchUser]);

  // Handle navigate
  const handleNavigate = (customerId: string) => navigate(store_routes.customerEdit.replace(':customerId', customerId))

  return (
    <Box height={"calc(100vh - 116px)"} overflow={"auto"} sx={{ pt: 6 }}>
      <MobileHeader
        title={customerData.length.toString()}
        to={store_routes.customerAdd}
      />

      {/* Page title */}
      <PageTitle title="Mijozlar" />

      {/* Search */}
      <SearchInput value={search} setValue={setSearch} />

      {/* User List */}
      <UserList data={searchedData} isLoading={customerRes.isLoading}  setEdit={({editId}) => handleNavigate(editId ?? ""
      )} />
    </Box>
  );
};

export default StoreCustomer;
