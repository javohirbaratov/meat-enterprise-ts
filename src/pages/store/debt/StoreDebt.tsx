import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useMemo, useState } from "react";
import { useDeleteStoreDebtMutation, useGetStoreDebtQuery } from "../../../app/services/store/debt/storeDebt";
import MobileHeader from "../../../components/common/mobileHeader/MobileHeader";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import MyDateRange from "../../../components/common/ui/myDateRange/MyDateRange";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import { store_routes } from "../../../constants/path";
import useUserSearchList from "../../../hooks/useUserSearchList";
import { IDate } from "../../../types/api";
import formatCommaNum from "../../../util/formatCommaNum";
import StoreDebtTable, {
  IStoreDebtTableRow,
  TStoreDebtTableColumns,
} from "./components/StoreDebtTable";
import { toast } from "react-toastify";

const StoreDebt: React.FC = () => {
  // State
  const [selectedDate, setSelectedDate] = useState<IDate>({
    start: null,
    end: null,
  });
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [debtId, setDebtId] = useState('');

  const [searchUser] = useUserSearchList();

  // API
  const { data, isLoading } = useGetStoreDebtQuery({
    date: selectedDate,
  });
  const [deleteData] = useDeleteStoreDebtMutation();

  const { filterData, totalPrice } = useMemo<{
    filterData: IStoreDebtTableRow[];
    totalPrice: string;
  }>(() => {
    if (data?.success === true) {
      if (data.data.list?.length) {
        return {
          filterData: data.data.list,
          totalPrice: formatCommaNum.formatNumber(data.data.itog),
        };
      }
    }

    return {
      filterData: [],
      totalPrice: "0",
    };
  }, [data]);

  const tableData = useMemo<IStoreDebtTableRow[]>(() => {
    return searchUser(filterData, search);
  }, [filterData, search, searchUser]);

  // Delete 
  const handleDelete = async () => {
    try {

      const res = await deleteData({ debtId: debtId }).unwrap();

      if (res.success) {
        toast.success(res.message)

      } else {

        toast.error(res.message)
      }

    } catch (err) {

      console.log(err);

      toast.error('Ulanishda xatolik')
    }
  }

  // Dialog 
  const handleClickOpen = (id: string) => {
    setOpen(true);
    setDebtId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // columns
  const tableColumns = useMemo<TStoreDebtTableColumns>(() => {
    return [
      {
        accessorKey: "client",
        header: "Mijoz",
        size: 10,
      },
      {
        accessorKey: "telefon",
        header: "Telefon",
        size: 10,
      },
      {
        accessorKey: "naqdsum",
        header: "Naqd so'm",
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
        accessorKey: "naqdusd",
        header: "Naqd usd",
        size: 10,
      },
      {
        accessorKey: "valyuta",
        header: "Valyuta",
        size: 10,
      },
      {
        accessorKey: "summa",
        header: "Summa",
        size: 10,
      },
      {
        accessorKey: "vaqt",
        header: "Sana",
        size: 10,
      },
      {
        accessorKey: "O'chirish",
        header: "O'chirish",
        size: 10,
        accessorFn: (row) => (
          <Button variant="outlined" color="error" onClick={() => handleClickOpen(row.id)}>O'chirish</Button>
        ),
      },
    ];
  }, []);

  return (
    <Box sx={{ pt: 4 }}>
      <MobileHeader title={`${totalPrice} so'm`} to={store_routes.debtAdd} />

      <PageTitle title="Yechilgan qarzlar" />

      {/* Date */}
      <Box sx={{ m: "auto", my: 2 }}>
        <MyDateRange setValue={setSelectedDate} />
      </Box>

      <SearchInput value={search} setValue={setSearch} />

      {/* <UserSaleList isLoading={isLoading} data={[...list]} /> */}
      <StoreDebtTable
        data={tableData}
        columns={tableColumns}
        exportFileName="Mijozlarning hisobotlari"
        isLoading={isLoading}
      />

      <Dialog
        sx={{ zIndex: 99999 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"O'rishni hohlaysizmi"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            O'chirilgan ma'lumotni tiklab bo'lmaydi
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Bekor qilish
          </Button>
          <Button onClick={handleDelete} autoFocus>
            O'chirish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StoreDebt;
