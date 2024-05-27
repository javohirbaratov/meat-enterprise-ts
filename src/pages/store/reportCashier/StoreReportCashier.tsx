import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { useGetStoreReportCashierQuery } from "../../../app/services/store/reports/storeReports";
import MobileHeader from "../../../components/common/mobileHeader/MobileHeader";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import MyDateRange from "../../../components/common/ui/myDateRange/MyDateRange";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import { store_routes } from "../../../constants/path";
import useUserSearchList from "../../../hooks/useUserSearchList";
import { IDate } from "../../../types/api";
import formatCommaNum from "../../../util/formatCommaNum";
import StoreReportCashierTable, {
  IStoreReportCashierTableRow,
  TStoreReportCashierTableColumns,
} from "./components/StoreReportCashierTable";
import MyCardList, { TMyCardListItem } from "../../../components/common/myCardList/MyCardList";

const StoreReportCashier: React.FC = () => {
  // State
  const [selectedDate, setSelectedDate] = useState<IDate>({
    start: null,
    end: null,
  });
  const [search, setSearch] = useState<string>("");

  const [searchUser] = useUserSearchList();

  // API
  const { data, isLoading, isFetching } = useGetStoreReportCashierQuery({
    date: selectedDate,
    supplierId: "0",
  });

  const { filterData, totalPrice } = useMemo<{
    filterData: IStoreReportCashierTableRow[];
    totalPrice: string;
  }>(() => {
    if (data?.success === true) {
      if (data.data.akt?.length) {
        return {
          filterData: data.data.akt,
          // totalPrice: formatCommaNum.formatNumber(data.data.itog),
          totalPrice: "0",
        };
      }
    }

    return {
      filterData: [],
      totalPrice: "0",
    };
  }, [data]);

  // Total data
  const totalCardData = useMemo<TMyCardListItem[]>(() => {
    if (data?.success) {
      return [
        {
          label: "Eski qarz",
          value: formatCommaNum.formatNumber(data.data.jami_eski_qarz),
        },
        {
          label: "Berilgan yuklar",
          value: formatCommaNum.formatNumber(data.data.jamiberilganyuk),
        },
        {
          label: "Kredit",
          value: formatCommaNum.formatNumber(data.data.jamikredit_naqd),
        },
        {
          label: "Qaytarilgan",
          value: formatCommaNum.formatNumber(data.data.jamimassavozvrat),
        },
        {
          label: "Saldo",
          value: formatCommaNum.formatNumber(data.data.jami_saldo),
        },
      ];
    }
    return [];
  }, [data]);

  const tableData = useMemo<IStoreReportCashierTableRow[]>(() => {
    return searchUser(filterData, search);
  }, [filterData, search, searchUser]);

  // columns
  const tableColumns = useMemo<TStoreReportCashierTableColumns>(() => {
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
    <Box sx={{ pt: 6 }}>
      <MobileHeader title={`${totalPrice} so'm`} to={store_routes.debtAdd} />

      <MyCardList list={totalCardData} isLoading={isLoading || isFetching} rowCount={5} />

      <PageTitle title="Hisobot mijoz" />

      {/* Date */}
      <Box sx={{ m: "auto", my: 2 }}>
        <MyDateRange setValue={setSelectedDate} />
      </Box>

      <SearchInput value={search} setValue={setSearch} />

      {/* <UserSaleList isLoading={isLoading} data={[...list]} /> */}
      <StoreReportCashierTable
        data={tableData}
        columns={tableColumns}
        exportFileName="Mijozlarning hisobotlari"
        isLoading={isLoading || isFetching}
      />
    </Box>
  );
};

export default StoreReportCashier;
