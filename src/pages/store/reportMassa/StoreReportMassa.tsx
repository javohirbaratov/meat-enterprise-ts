import { Box, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import MyDateRange from "../../../components/common/ui/myDateRange/MyDateRange";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import useUserSearchList from "../../../hooks/useUserSearchList";
import { IDate } from "../../../types/api";
// import StoreDebtTable, {
//   IStoreDebtTableRow,
//   TStoreDebtTableColumns,
// } from "./components/StoreDebtTable";
import { useGetReportMassaQuery } from "../../../app/services/store/reportMassa/reportMassa";
import ReportMassaTable, { IStoreReportMassaTableRow, TStoreReportMassaColumns } from "./components/ReportMassaTable";

const StoreReportMassa: React.FC = () => {
  // State
  const [selectedDate, setSelectedDate] = useState<IDate>({
    start: null,
    end: null,
  });
  const [search, setSearch] = useState<string>("");

  const [searchUser] = useUserSearchList();

  // API
  const { data, isLoading } = useGetReportMassaQuery({
    date: selectedDate,
  });

  const { filterData } = useMemo<{
    filterData: IStoreReportMassaTableRow[];
  }>(() => {
    if (data?.success === true) {
      if (data.data?.length) {
        return {
          filterData: data.data
        };
      }
    }

    return {
      filterData: [],
    };
  }, [data]);

  const tableData = useMemo<IStoreReportMassaTableRow[]>(() => {
    return searchUser(filterData, search);
  }, [filterData, search, searchUser]);


  // columns
  const tableColumns = useMemo<TStoreReportMassaColumns>(() => {
    return [
      {
        accessorKey: "krim_massa",
        header: "Kirim",
        size: 10,
        
      },
      {
        accessorKey: "sotuv_massa",
        header: "Sotuv",
        size: 10,
      },
      {
        accessorKey: "xolodelnik_massa",
        header: "Xolodelnik",
        size: 10,
      },
      {
        accessorKey: "foiz",
        header: "Foiz",
        size: 10,
        accessorFn: (row) => (
            
            <Typography variant="subtitle1" gutterBottom color={
                (row.foiz >= 75)? "green" : (row.foiz >= 70)? "yellow" : "red"
            }>
                { row.foiz }
            </Typography>
        ),
      }
    ];
  }, []);

  return (
    <Box sx={{ pt: 4 }}>
      {/* <MobileHeader title={`${totalPrice} so'm`} to={store_routes.debtAdd} /> */}

      <PageTitle title="Hisobot massa" />

      {/* Date */}
      <Box sx={{ m: "auto", my: 2 }}>
        <MyDateRange setValue={setSelectedDate} />
      </Box>

      <SearchInput value={search} setValue={setSearch} />

      {/* <UserSaleList isLoading={isLoading} data={[...list]} /> */}
      <ReportMassaTable
        data={tableData}
        columns={tableColumns}
        exportFileName="Hisobot massa"
        isLoading={isLoading}
      />

    </Box>
  );
};

export default StoreReportMassa;
