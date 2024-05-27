import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useGetReportProviderAllNewQuery } from "../../../app/services/store/reportProviderAllNew/reportProviderAllNew";
import MobileHeader from "../../../components/common/mobileHeader/MobileHeader";
import MyCardList, { TMyCardListItem } from "../../../components/common/myCardList/MyCardList";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import MyDateRange from "../../../components/common/ui/myDateRange/MyDateRange";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import { store_routes } from "../../../constants/path";
import useUserSearchList from "../../../hooks/useUserSearchList";
import { IDate } from "../../../types/api";
import formatCommaNum from "../../../util/formatCommaNum";
import StoreReportProviderNewTable, {
  IStoreReportProviderTableRow,
  TStoreReportProviderTableColumns,
} from "./components/StoreReportProviderNewTable";
const StoreReportProviderNew: React.FC = () => {
  // State
  const [search, setSearch] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<IDate>({
    start: null,
    end: null,
  });
  const [searchUser] = useUserSearchList();

  // API
  const { data, isLoading, isFetching } = useGetReportProviderAllNewQuery({
    date: selectedDate,
  });

  const { filterData, totalPrice } = useMemo<{
    filterData: IStoreReportProviderTableRow[];
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
          label: "Jami qarzdorlik",
          value: formatCommaNum.formatNumber(data.data.jami_qarzdorlik),
        },
        {
          label: "Jami debit",
          value: formatCommaNum.formatNumber(data.data.jamidebit),
        },
        {
          label: "Jami kredit",
          value: formatCommaNum.formatNumber(data.data.jamikredit),
        }
      ];
    }
    return [];
  }, [data]);
  // columns
  const tableColumns = useMemo<TStoreReportProviderTableColumns>(() => {
    return [
      {
        accessorKey: "fio",
        header: "Fio",
        size: 10,
      },
      {
        accessorKey: "eski_qarz",
        header: "Eski qarz",
        size: 10,
      },
      {
        accessorKey: "debit",
        header: "Debit",
        size: 10,
      },
      {
        accessorKey: "jamikredit",
        header: "Jami Kredit",
        size: 10,
      },
      {
        accessorKey: "saldo",
        header: "Saldo",
        size: 10,
      }
    ];
  }, []);

  const tableData = useMemo<IStoreReportProviderTableRow[]>(() => {
    return searchUser(filterData, search);
  }, [filterData, search, searchUser]);

  return (
    <>
      <Box sx={{ pt: 6 }}>
        <MobileHeader title={`${tableData.length}`} to={store_routes.reportProviderAdd} />

        <MyCardList list={totalCardData} isLoading={isLoading || isFetching} rowCount={5} />

        <PageTitle title="Barcha taminotchilar hisoboti" />

        {/* Date */}
        <Box sx={{ m: "auto", my: 2 }}>
          <MyDateRange setValue={setSelectedDate} />
        </Box>

        <SearchInput value={search} setValue={setSearch} />

        {/* <UserSaleList isLoading={isLoading} data={[...list]} /> */}
        <StoreReportProviderNewTable
          data={tableData}
          columns={tableColumns}
          exportFileName="Mijozlarning hisobotlari"
          isLoading={isLoading || isFetching}
        />

      </Box>
    </>
  );
};

export default StoreReportProviderNew;
