import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useAddSalesOrderEndMutation } from "../../../app/services/sales/order/salesOrder";
import {
  TStoreReceptionParam,
  useDeleteStoreReceptionMutation,
  useGetStoreReceptionQuery,
} from "../../../app/services/store/reception/storeReception";
import { TDrawerMethod } from "../../../components/common/confirmBottomDrawer/ConfirmBottomDrawer";
import MobileHeader from "../../../components/common/mobileHeader/MobileHeader";
import MyCardList, {
  TMyCardListItem,
} from "../../../components/common/myCardList/MyCardList";
import OrderBottomDrawer from "../../../components/common/orderBottomDrawer/orderBottomDrawer";
import OrderCardList, {
  IOrderCardListItemProps,
} from "../../../components/common/orderCardList/OrderCardList";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import MyDateRange from "../../../components/common/ui/myDateRange/MyDateRange";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import { store_routes } from "../../../constants/path";
import useUserSearchList from "../../../hooks/useUserSearchList";
import formatCommaNum from "../../../util/formatCommaNum";
const StoreReception: React.FC = () => {
  // Ref
  const drawerRef = useRef<TDrawerMethod>(null);

  // State
  const [selectedDate, setSelectedDate] = useState<TStoreReceptionParam>({
    start: "",
    end: "",
  });
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = React.useState(false);

  // Api
  const orderRes = useGetStoreReceptionQuery(selectedDate);
  const [deleteStore] = useDeleteStoreReceptionMutation();

  // test
  const [endOrder, { isLoading }] = useAddSalesOrderEndMutation();

  // use UserSearch
  const [searchUser] = useUserSearchList();

  // Filter
  const filterOrderData = useMemo<IOrderCardListItemProps[]>(() => {
    if (orderRes.data?.success) {
      return orderRes.data?.data.krim_list.map((item) => ({
        id: item.id,
        title: item.taminotchi,
        user: item.partiyanomer,
        date: item.sana,
        phone: `${formatCommaNum.formatNumber(item.summa)} so'm`,
        volume: Number(item.massa) ? parseFloat(item.massa) : 0,
        malumot: JSON.parse(item.malumot),
      }));
    }
    return [];
  }, [orderRes]);

  // Total data
  const totalCardData = useMemo<TMyCardListItem[]>(() => {
    if (orderRes.data?.success) {
      return [
        {
          label: "Jami massa",
          value: `${formatCommaNum.formatNumber(
            orderRes.data.data.jamimassa
          )} kg`,
        },
        {
          label: "Jami summa",
          value: formatCommaNum.formatNumber(orderRes.data.data.jamisumma),
        },
        {
          label: "Jami dona",
          value: formatCommaNum.formatNumber(orderRes.data.data.jamidona),
        },
      ];
    }
    return [];
  }, [orderRes.data]);

  const orderData = useMemo<IOrderCardListItemProps[]>(() => {
    return searchUser(filterOrderData, search);
  }, [filterOrderData, search, searchUser]);

  // Drawer
  const handleOpenDrawer = (id: number | string | null) => {
    const res = filterOrderData.find((item) => item.id === id);
    if (res) {
      drawerRef.current?.onOpen({
        id: res.id,
        title: res.title || "",
        user: res.user,
        phone: res.phone,
        date: res.date,
        volume: res.volume,
        malumot: res.malumot,
      });
    }
  };

  // Handle delete
  const handleDelete = async () => {
    setOpen(false);

    if (drawerRef.current?.getData()) {
      const id = drawerRef.current.getData()?.id || "";

      try {
        const res = await deleteStore({ receptionId: id }).unwrap();

        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (err) {
        console.log(err);

        toast.error("Ulanishda xatolik");
      }
      drawerRef.current.onClose();
    }
  };

  // Handle confirm
  const handleConfirm = async (id: number | string | null) => {
    if (id) {
      await endOrder({ order_id: id.toString() });
    } else {
      toast.info(`Buyurtma topilmadi!`);
    }
  };

  // For Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ pt: 8 }}>
      {/* Header */}
      <MobileHeader title="" to={store_routes.receptionAdd} />

      <MyCardList
        list={totalCardData}
        isLoading={orderRes.isLoading || orderRes.isFetching}
      />

      {/* Page title */}
      <PageTitle title="Qabul qilinganlar" />

      {/* Date */}
      <Box sx={{ m: "auto", my: 2 }}>
        <MyDateRange setValue={setSelectedDate} />
      </Box>

      {/* Search */}
      <SearchInput value={search} setValue={setSearch} />

      {/* Body */}
      <OrderCardList
        data={orderData}
        isLoading={orderRes.isLoading || orderRes.isFetching}
        onPress={handleOpenDrawer}
      />

      {/* Bottom Drawer */}
      <OrderBottomDrawer
        ref={drawerRef}
        setConfirmed={handleConfirm}
        headElement={
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={handleClickOpen}
            fullWidth
          >
            O'chirish
          </Button>
        }
        isLoading={isLoading}
        title="Info"
      />

      {/* Dialog  */}
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

export default StoreReception;
