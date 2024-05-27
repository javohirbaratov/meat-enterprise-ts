import { Box, Grid, MenuItem, TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useGetStoreProviderQuery } from "../../../app/services/store/provider/storeProvider";
import { useGetReportSalaryQuery } from "../../../app/services/store/salary/storeSalary";
import MobileHeader from "../../../components/common/mobileHeader/MobileHeader";
import MyCardList, { TMyCardListItem } from "../../../components/common/myCardList/MyCardList";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import MyDateRange from "../../../components/common/ui/myDateRange/MyDateRange";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import { store_routes } from "../../../constants/path";
import useUserSearchList from "../../../hooks/useUserSearchList";
import { IDate } from "../../../types/api";
import formatCommaNum from "../../../util/formatCommaNum";
import StoreSalaryTable, { IStoreSalaryTableRow, TStoreSalaryTableColumns } from "./components/StoreSalaryTable";

const StoreReportProviderNew: React.FC = () => {
  // State
  const [search, setSearch] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<IDate>({
    start: null,
    end: null,
  });
  const [supplier, setSupplier] = useState('0');
  const [reportId, setReportId] = useState(0);

  const [searchUser] = useUserSearchList();

  // API
  const { data, isLoading, isFetching } = useGetReportSalaryQuery({
    date: selectedDate,
    worker_id: supplier
  });

  const supplierRes = useGetStoreProviderQuery()
  

  const { filterData } = useMemo<{
    filterData: IStoreSalaryTableRow[];
  }>(() => {
    if (data?.success === true) {
      if (data.data.list.length) {
        return {
          filterData: data.data.list,
          // totalPrice: formatCommaNum.formatNumber(data.data.itog),
        };
      }
    }

    return {
      filterData: [],
    };
  }, [data]);


  const providerOptions = useMemo(() => {
    if (supplierRes.data?.success) {
      return supplierRes.data?.data;
    }
    return [];
  }, [supplierRes]);

  // Total data
  const totalCardData = useMemo<TMyCardListItem[]>(() => {
    if (data?.success) {
      return [
        {
          label: "Jami Bank",
          value: formatCommaNum.formatNumber(data.data.jamibank),
        },
        {
          label: "Jami Karta",
          value: formatCommaNum.formatNumber(data.data.jamikarta),
        },
        {
          label: "Jami Naqd",
          value: formatCommaNum.formatNumber(data.data.jaminaqd),
        },
        {
          label: "Jami usd",
          value: formatCommaNum.formatNumber(data.data.jamiusd),
        }
      ];
    }
    return [];
  }, [data]);

  const tableData = useMemo<IStoreSalaryTableRow[]>(() => {
    return searchUser(filterData, search);
  }, [filterData, search, searchUser]);

  // columns
  const tableColumns = useMemo<TStoreSalaryTableColumns>(() => {
    return [
      {
        accessorKey: "id",
        header: "Id",
        size: 10,
      },
      {
        accessorKey: "worker",
        header: "Ishchi",
        size: 10,
      },
      {
        accessorKey: "bank",
        header: "Bank",
        size: 10,
      },
      {
        accessorKey: "karta",
        header: "Karta",
        size: 10,
      },
      {
        accessorKey: "naqdsum",
        header: "Naqd sum",
        size: 10,
      },
      {
        accessorKey: "naqdusd",
        header: "Naqd usd",
        size: 10,
      },
      {
        accessorKey: "summa",
        header: "Summa",
        size: 10,
      },
      {
        accessorKey: "vaqt",
        header: "Vaqt",
        size: 10,
      }
    ];
  }, []);

  return (
    <>
    <Box sx={{ pt: 6 }}>
      <MyCardList
          list={totalCardData}
          isLoading={isLoading || isFetching}
          rowCount={2}
        />

      <MobileHeader title={`${tableData.length}`} to={store_routes.salaryAdd} toTitle="Oylik chiqarish"/>

      <PageTitle title="Oylik" />

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          id="taminotchi_id"
          select
          label="Ishchi"
          name="taminotchi_id"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        >
          <MenuItem key={0} value={0}>
            Tanlang&nbsp;
          </MenuItem>
          {providerOptions?.map((state) => (
            <MenuItem key={state.id} value={state.id}>
              {state.fio}&nbsp;
              <small>{formatCommaNum.formatNumber(state.telefon)}</small>
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Date */}
      <Box sx={{ m: "auto", my: 2 }}>
        <MyDateRange setValue={setSelectedDate} />
      </Box>

      <SearchInput value={search} setValue={setSearch} />

      {/* <UserSaleList isLoading={isLoading} data={[...list]} /> */}
      <StoreSalaryTable
        data={tableData}
        columns={tableColumns}
        exportFileName="Oylik hisoboti"
        isLoading={isLoading || isFetching}
      />

    </Box>
    </>
  );
};

export default StoreReportProviderNew;
