import { useMemo, useState } from "react"; 
import useUserSearchList from "../../../hooks/useUserSearchList";
import { IUserListItem } from "../../../components/common/userList/UserListItem";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import { Box } from "@mui/material";
import UserList from "../../../components/common/userList/UserList";
import MobileHeader from "../../../components/common/mobileHeader/MobileHeader";
import { store_routes } from "../../../constants/path";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import { useGetStoreProviderQuery } from "../../../app/services/store/provider/storeProvider";

const StoreProvider: React.FC = () => {
  // State
  const [search, setSearch] = useState<string>("");

  // Api
  const customerRes = useGetStoreProviderQuery();

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

  return (
    <Box height={"calc(100vh - 116px)"} overflow={"auto"} sx={{ pt: 6 }}>
      <MobileHeader
        title={customerData.length.toString()}
        to={store_routes.providerAdd}
      />

      {/* Page title */}
      <PageTitle title="Taminotchilar" />

      {/* Search */}
      <SearchInput value={search} setValue={setSearch} />

      {/* User List */}
      <UserList data={searchedData} isLoading={customerRes.isLoading} />
    </Box>
  );
};

export default StoreProvider;
