import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import { useGetStoreCustomerQuery } from "../../../app/services/store/customer/storeCustomer";
import { useGetStoreReportAllCustomerQuery } from "../../../app/services/store/reports/storeReports";
import MyCardList, {
  TMyCardListItem,
} from "../../../components/common/myCardList/MyCardList";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import MyDateRange from "../../../components/common/ui/myDateRange/MyDateRange";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import useUserSearchList from "../../../hooks/useUserSearchList";
import { IDate } from "../../../types/api";
import formatCommaNum from "../../../util/formatCommaNum";
import StoreReportAllCustomerModal from "./components/StoreReportAllCustomerModal";
import StoreReportAllCustomerTable, {
  IStoreReportAllCustomerTableRow,
  TStoreReportAllCustomerTableColumns,
} from "./components/StoreReportAllCustomerTable";

const StoreReportAllCustomer: React.FC = () => {
  // State
  const [selectedDate, setSelectedDate] = useState<IDate>({
    start: null,
    end: null,
  });
  const [supplier, setSupplier] = useState('0');
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [reportId, setReportId] = useState(0);

  const [searchUser] = useUserSearchList();

  // API
  const { data, isLoading, isFetching } = useGetStoreReportAllCustomerQuery({
    date: selectedDate,
    supplierId: supplier,
  });

  const supplierRes = useGetStoreCustomerQuery()

  const providerOptions = useMemo(() => {
    if (supplierRes.data?.success) {
      return supplierRes.data?.data;
    }
    return [];
  }, [supplierRes]);

  const { filterData } = useMemo<{
    filterData: IStoreReportAllCustomerTableRow[];
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

  // Total data
  const totalCardData = useMemo<TMyCardListItem[]>(() => {
    if (data?.success) {
      return [
        {
          label: "Debet",
          value: formatCommaNum.formatNumber(data.data.jamidebit),
        },
        {
          label: "Kredit",
          value: formatCommaNum.formatNumber(data.data.jamikredit),
        },
      ];
    }
    return [];
  }, [data]);

  const tableData = useMemo<IStoreReportAllCustomerTableRow[]>(() => {
    return searchUser(filterData, search);
  }, [filterData, search, searchUser]);

  // handle open 
  const handleOpen = (status: string, reportId: number) => {
    setOpen(true);
    setStatus(status)
    setReportId(reportId)
  };
  const handleClose = () => setOpen(false);

  // columns
  const tableColumns = useMemo<TStoreReportAllCustomerTableColumns>(() => {
    return [
      {
        accessorKey: "id",
        header: "Id",
        size: 10,
      },
      {
        accessorKey: "debit",
        header: "Debet",
        size: 10,
        accessorFn: ({ debit, id, status }) => <Button onClick={()=> handleOpen(status, id)}>{debit}</Button>
      },
      {
        accessorKey: "kredit",
        header: "kredit",
        size: 10,
        accessorFn: ({ kredit, id, status }) => <Button onClick={()=> handleOpen(status, id)}>{kredit}</Button>
      },
      {
        accessorKey: "status",
        header: "status",
        size: 10,
      },
      {
        accessorKey: "summa",
        header: "summa",
        size: 10,
      },
    ];
  }, []);

  return (
    <Box sx={{ pt: 6 }}>
      <MyCardList
        list={totalCardData}
        isLoading={isLoading || isFetching}
        rowCount={2}
      />

      <PageTitle title="Yechilgan qarzlar" />

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
      <StoreReportAllCustomerTable
        data={tableData}
        columns={tableColumns}
        exportFileName="Mijozlarning hisobotlari"
        isLoading={isLoading || isFetching}
      />

      <StoreReportAllCustomerModal open={open} handleClose={handleClose} id={reportId} status={status} />
    </Box>
  );
};

export default StoreReportAllCustomer;
