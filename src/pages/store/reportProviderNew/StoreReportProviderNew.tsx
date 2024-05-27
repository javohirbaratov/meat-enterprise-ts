import { Box, Grid, MenuItem, TextField } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useGetStoreProviderQuery } from "../../../app/services/store/provider/storeProvider";
import { useGetReportProviderNewQuery } from "../../../app/services/store/reportProviderNew/reportProviderNew";
import MobileHeader from "../../../components/common/mobileHeader/MobileHeader";
import MyCardList, { TMyCardListItem } from "../../../components/common/myCardList/MyCardList";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import MyDateRange from "../../../components/common/ui/myDateRange/MyDateRange";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import useUserSearchList from "../../../hooks/useUserSearchList";
import { IDate } from "../../../types/api";
import formatCommaNum from "../../../util/formatCommaNum";
import StoreReportProviderNewTable, {
  IStoreReportProviderNewTableRow,
  TStoreReportProviderNewTableColumns,
} from "./components/StoreReportProviderNewTable";

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
  const { data, isLoading, isFetching } = useGetReportProviderNewQuery({
    date: selectedDate,
    provider_id: supplier
  });

  const supplierRes = useGetStoreProviderQuery()
  

  const { filterData } = useMemo<{
    filterData: IStoreReportProviderNewTableRow[];
  }>(() => {
    if (data?.success === true) {
      if (data.data.akt?.length) {
        return {
          filterData: data.data.akt,
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
          label: "Jami Debet",
          value: formatCommaNum.formatNumber(data.data.jamidebit),
        },
        {
          label: "Jami Dona",
          value: formatCommaNum.formatNumber(data.data.jamidona),
        },
        {
          label: "Jami Kredit",
          value: formatCommaNum.formatNumber(data.data.jamikredit),
        },
        {
          label: "Jami saldo",
          value: formatCommaNum.formatNumber(data.data.saldo),
        },
        {
          label: "Eski balans",
          value: formatCommaNum.formatNumber(data.data.eski_balans),
        }
      ];
    }
    return [];
  }, [data]);

  const tableData = useMemo<IStoreReportProviderNewTableRow[]>(() => {
    return searchUser(filterData, search);
  }, [filterData, search, searchUser]);

  // columns
  const tableColumns = useMemo<TStoreReportProviderNewTableColumns>(() => {
    return [
      {
        accessorKey: "id",
        header: "Id",
        size: 10,
      },
      {
        accessorKey: "debit",
        header: "Debit",
        size: 10,
      },
      {
        accessorKey: "kredit",
        header: "Kredit",
        size: 10,
      },
      {
        accessorKey: "summa",
        header: "Summa",
        size: 10,
      },
      {
        accessorKey: "vozvrat",
        header: "Vozvrat",
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

      <MobileHeader title={`${tableData.length}`} />

      <PageTitle title="Taminotchi hisoboti" />

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          size="small"
          id="taminotchi_id"
          select
          label="Taminodchi"
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
