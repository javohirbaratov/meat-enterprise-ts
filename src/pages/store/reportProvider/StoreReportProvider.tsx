import { Box, Button, Chip } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useGetStoreReportProviderQuery } from "../../../app/services/store/reportsProvider/storeReportsProvider";
import MobileHeader from "../../../components/common/mobileHeader/MobileHeader";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import { store_routes } from "../../../constants/path";
import useUserSearchList from "../../../hooks/useUserSearchList";
import formatCommaNum from "../../../util/formatCommaNum";
import StoreReportProviderModal from "./components/StoreReportProviderModal";
import StoreReportProviderTable, {
  IStoreReportProviderTableRow,
  TStoreReportProviderTableColumns,
} from "./components/StoreReportProviderTable";

const StoreReportProvider: React.FC = () => {
  // State
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [reportId, setReportId] = useState(0);

  const [searchUser] = useUserSearchList();

  // API
  const { data, isLoading, isFetching } = useGetStoreReportProviderQuery();
  
  const filterData = useMemo<IStoreReportProviderTableRow[]>(() => {
    if (data?.success === true) {
      if (data.data.length) {
        return data.data.map((item) => ({
          ...item,
          naqdsum: formatCommaNum.formatNumber(item.naqdsum),
          naqdusd: formatCommaNum.formatNumber(item.naqdusd),
          valyuta: formatCommaNum.formatNumber(item.valyuta),
          bank: formatCommaNum.formatNumber(item.bank),
          karta: formatCommaNum.formatNumber(item.karta),
        }));
      }
    }

    return [];
  }, [data]);

  const tableData = useMemo<IStoreReportProviderTableRow[]>(() => {
    return searchUser(filterData, search);
  }, [filterData, search, searchUser]);

  // columns
  const tableColumns = useMemo<TStoreReportProviderTableColumns>(() => {
    return [
      {
        accessorKey: "id",
        header: "Id",
        size: 10,
      },
      {
        accessorKey: "taminotchi",
        header: "taminotchi",
        size: 10,
      },
      {
        accessorKey: "naqdsum",
        header: "naqdsum",
        size: 10,
      },
      {
        accessorKey: "naqdusd",
        header: "naqdusd",
        size: 10,
      },
      {
        accessorKey: "valyuta",
        header: "valyuta",
        size: 10,
      },
      {
        accessorKey: "bank",
        header: "bank",
        size: 10,
      },
      {
        accessorKey: "karta",
        header: "karta",
        size: 10,
      },
      {
        accessorKey: "izoh",
        header: "izoh",
        size: 10,
      },
      {
        accessorKey: "status",
        header: "status",
        size: 10,
        accessorFn: (row) => (
          <Chip
            label={row.status}
            color={row.status === "checked" ? "success" : "error"}
          />
        ),
      },
      {
        accessorKey: "vaqt",
        header: "Tasdiqlash",
        size: 10,
        accessorFn: (row) => (
          row.status !== "checked" ? (
            <Button onClick={()=> handleOpen(row.taminotchi_id)}>Tasdiqlash</Button>
          ) : (
            <Button disabled>Tasdiqlash</Button>
          )
          
        ),
      },
    ];
  }, []);

    // handle open 
  const handleOpen = (reportId: number) => {
    setOpen(true);
    setReportId(reportId)
  };
  const handleClose = () => setOpen(false);


  return (
    <>
    <StoreReportProviderModal open={open} handleClose={handleClose} id={reportId} />
    
    <Box sx={{ pt: 6 }}>
      <MobileHeader title={`${tableData.length}`} to={store_routes.reportProviderAdd} />

      <PageTitle title="Berilgan pullar tarixi" />

      {/* Date */}
      {/* <Box sx={{ m: "auto", my: 2 }}>
        <MyDateRange setValue={setSelectedDate} />
      </Box> */}

      <SearchInput value={search} setValue={setSearch} />

      {/* <UserSaleList isLoading={isLoading} data={[...list]} /> */}
      <StoreReportProviderTable
        data={tableData}
        columns={tableColumns}
        exportFileName="Mijozlarning hisobotlari"
        isLoading={isLoading || isFetching}
      />

    </Box>
    </>
  );
};

export default StoreReportProvider;
