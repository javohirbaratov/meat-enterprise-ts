import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useGetStoreTransferToFreezerQuery } from "../../../app/services/store/transferToFreezer/storeTransferToFreezer";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import useUserSearchList from "../../../hooks/useUserSearchList";
import { IStoreTransferToFreezezRow, TStoreTransferToFreezerColumns } from "./components/StoreTransferToFreezerTable";
import StoreTransferToFreezerTable from "./components/StoreTransferToFreezerTable";
import MobileHeader from "../../../components/common/mobileHeader/MobileHeader";
import { store_routes } from "../../../constants/path";

const StoreTransferToFreezer: React.FC = () => {
  // State
  const [search, setSearch] = useState<string>("");

  // API 
  const { data, isLoading } = useGetStoreTransferToFreezerQuery();
  // Use search
  const [searchUser] = useUserSearchList();

  // Filter
  const { filterData } = useMemo<{
    filterData: IStoreTransferToFreezezRow[];
  }>(() => {
    if (data?.success === true) {
      if (data.data?.length) {
        return {
          filterData: data.data,
        };
      }
    }

    return {
      filterData: [],
      totalPrice: "0",
    };
  }, [data]);

  // Search
  const searchedData = useMemo(() => {
    return searchUser(filterData, search);
  }, [filterData, search, searchUser]);

  const tableColumns = useMemo<TStoreTransferToFreezerColumns>(() => {
    return [
      {
        accessorKey: "id",
        header: "id",
        size: 10,
      },
      {
        accessorKey: "partiya_kun",
        header: "partiya_kun",
        size: 10,
      },
      {
        accessorKey: "partiya_id",
        header: "partiya_id",
        size: 10,
      },
      {
        accessorKey: "product",
        header: "product",
        size: 10,
      },
      {
        accessorKey: "massa",
        header: "massa",
        size: 10,
      },
      {
        accessorKey: "javobgar",
        header: "javobgar",
        size: 10,
      },
      {
        accessorKey: "vaqt",
        header: "vaqt",
        size: 10,
      },
    ];
  }, []);

  return (
    <Box sx={{ pt: 4 }}>
      {/* <MobileHeader title={`${totalPrice} so'm`} to={store_routes.debtAdd} /> */}
      <MobileHeader
        title={filterData.length.toString()}
        to={store_routes.transferToFreezerAdd}
      />

      {/* Page title */}
      <PageTitle title="O'tkazilgan mahsulotlar" />


      <SearchInput value={search} setValue={setSearch} />

      {/* <UserSaleList isLoading={isLoading} data={[...list]} /> */}
      <StoreTransferToFreezerTable
        data={searchedData}
        columns={tableColumns}
        exportFileName="Mijozlarning hisobotlari"
        isLoading={isLoading}
      />
    </Box>
  );
};

export default StoreTransferToFreezer;
