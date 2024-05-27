import { Delete, Print } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { IUser } from "../../../app/services/auth/auth";
import {
  ISalesOrderItem,
  useAddSalesOrderEndMutation,
  useDeleteSelesOrderMutation,
  useGetSalesOrderQuery,
} from "../../../app/services/sales/order/salesOrder";
import { useTypedSelector } from "../../../app/store";
import ConfirmBottomDrawer, {
  TDrawerMethod,
} from "../../../components/common/confirmBottomDrawer/ConfirmBottomDrawer";
import {
  ICreateOrderCard,
  TStatusColor,
} from "../../../components/common/createOrderCardList/CreateOrderCard";
import CreateOrderCardList from "../../../components/common/createOrderCardList/CreateOrderCardList";
import MobileHeader from "../../../components/common/mobileHeader/MobileHeader";
import Printh5 from "../../../components/common/printH5/PrintH5";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import { store_routes } from "../../../constants/path";
import { selectedUser } from "../../../features/auth/authSlice";
import useUserSearchList from "../../../hooks/useUserSearchList";
import formatCommaNum from "../../../util/formatCommaNum";

const StoreSales: React.FC = () => {
  // Ref
  const drawerRef = useRef<TDrawerMethod>(null);
  const componentRef = useRef<HTMLDivElement>(null);

  // User
  const userData = useTypedSelector<IUser>(selectedUser);

  // Api
  const createdOrderRes = useGetSalesOrderQuery();
  const [endOrder, { isLoading, data }] = useAddSalesOrderEndMutation();
  const [deleteOrder] = useDeleteSelesOrderMutation();

  useEffect(() => {
    if (!isLoading && data?.message) {
      if (data?.success) {
        toast.success(data.message);
        if (drawerRef.current) drawerRef.current.onClose();
      } else {
        toast.error(data?.message);
      }
    }
  }, [data, isLoading, drawerRef]);

  // State
  const [search, setSearch] = useState<string>("");
  const [printData, setPrintData] = useState<ISalesOrderItem | null>(null);
  const [open, setOpen] = React.useState(false);
  // use UserSearch
  const [searchOrder] = useUserSearchList();

  const { createdOrderData, originalData } = useMemo<{
    createdOrderData: ICreateOrderCard[];
    originalData: ISalesOrderItem[];
  }>(() => {
    if (createdOrderRes.data?.success) {
      return {
        createdOrderData: createdOrderRes.data.data.map((item) => {
          let statusColor: TStatusColor = "success";
          let statusLabel = item.status;

          return {
            id: item.id,
            user: item.client.fio,
            phone: item.client.telefon,
            statusLabel: statusLabel,
            volumeSumm: Number(item.all_summa) ? parseFloat(item.all_summa) : 0,
            statusColor: statusColor,
            productName: item.vaqt,
            productList: item.product_list,
            izoh: item.izoh,
            saler: item.sotuvchi,
          };
        }),
        originalData: [...createdOrderRes.data.data],
      };
    }

    return { createdOrderData: [], originalData: [] };
  }, [createdOrderRes]);

  const filterdata = useMemo(() => {
    return searchOrder(createdOrderData, search);
  }, [createdOrderData, search, searchOrder]);

  // Drawer
  const handleOpenDrawer = (id: number | string | null) => {
    const res = createdOrderData.find((item) => item.id === id);
    if (res) {
      drawerRef.current?.onOpen({
        id: res.id,
        title: res.saler || "",
        user: res.user,
        phone: res.phone,
        volumeSumm: res.volumeSumm || 0,
        date: res.productName,
        comment: res.izoh,
        productList: res.productList?.map((item) => ({
          ...item,
          massa: `${item.massa}->${item.tayyorlandi}`,
        })),
      });

      if (originalData) {
        const res = originalData.find((item) => item.id === id);
        setPrintData(res || null);
      }
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

  // Delete 
  const handleDelete = async () => {

    setOpen(false);

    if (drawerRef.current?.getData()) {
      const id = drawerRef.current.getData()?.id || ''

      try {
        const res = await deleteOrder({ orderId: id.toString() }).unwrap();

        if (res.success) {
          toast.success(res.message)
          drawerRef.current.onClose();
        } else {
          toast.error(res.message)
        }

      } catch (err) {

        console.log(err);

        toast.error('Ulanishda xatolik')
      }
    }

  }

  // For Dialog 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Box sx={{ pt: 4 }}>

      {/* Print element */}
      <div
        ref={componentRef as React.MutableRefObject<HTMLDivElement>}
        className={"printContainer"}
      >
        <img src={"/images/custom-logo.png"} width={120} alt="Logo" />

        <p style={{ marginBottom: "1rem" }}>My system</p>
        <table className="printChekTable printTable border">
          <tbody>
            <tr>
              <td>
                <Printh5 txt="Mijoz: " />
              </td>
              <td>
                <Printh5 txt={printData?.client.fio} />
              </td>
            </tr>
            <tr>
              <td><Printh5 txt="Mijoz manzili: " /></td>
              <td>
                <Printh5 txt={printData?.client?.manzil} />
              </td>
            </tr>
            <tr>
              <td>
                <Printh5 txt="Mijoz telefon: " />
              </td>
              <td>
                <Printh5 txt={printData?.client.telefon} />
              </td>
            </tr>
            <tr>
              <td><Printh5 txt="Sana: " />  </td>
              <td>
                <Printh5 txt={printData?.sana} />
              </td>
            </tr>
            <tr>
              <td><Printh5 txt="Telefon: " /></td>
              <td>
                <Printh5 txt="+998(11)111-11-11" />
              </td>
            </tr>
            <tr>
              <td><Printh5 txt="Sotuvchi: " /></td>
              <td>
                <div>
                  <Printh5 txt={userData?.ism + " " + userData?.familya + " " + userData?.telefon} />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <Printh5 txt="Eski qarz: " />
              </td>
              <td>
                <Printh5 txt={formatCommaNum.formatNumber(printData?.old_client_balans || 0) + " so'm"} />
              </td>
            </tr>
          </tbody>
        </table>
        <table style={{ marginTop: '1rem' }} className="printChekTable printTable border">
          <tbody>
            <tr>
              <td>
                <Printh5 txt="Mahsulot nomi: " />
              </td>
              <td>
                <Printh5 txt="Mahsulot miqdori: " />
              </td>
            </tr>
            {printData?.product_list?.map(item => (
              <tr key={item.id}>
                <td>
                  <Printh5 txt={item.product_name} />
                </td>
                <td>
                  <Printh5 txt={item.massa + 'kg'} />
                </td>
              </tr>
            ))
            }
            <tr>
              <td><Printh5 txt="Jammi summa" /></td>
              <td>
                <Printh5 txt={formatCommaNum.formatNumber(printData?.all_summa || 0) + " so'm"} />
              </td>
            </tr>
          </tbody>
        </table>
        <div
          style={{
            marginTop: "1rem",
            borderTop: "1px solid",
          }}
        >
          <Printh5 txt={"Chek raqami: " + printData?.id} />
        </div>
      </div>

      {/* Header */}
      <MobileHeader
        title={filterdata.length}
        to={store_routes.salesAdd}
        toTitle="Yangi buyurtma"
      />
      {/* Title */}
      <PageTitle title="Buyurtmalar" />
      {/* Search */}
      <SearchInput value={search} setValue={setSearch} />
      {/* List */}
      <CreateOrderCardList data={filterdata} onPress={handleOpenDrawer} />

      {/* Bottom Drawer */}
      <ConfirmBottomDrawer
        ref={drawerRef}
        setConfirmed={handleConfirm}
        headElement={
          <div>
            <Button variant="outlined" color="error" startIcon={<Delete />} onClick={handleClickOpen}>
              O'chirish
            </Button>
            <IconButton onClick={handlePrint}>
              <Print />
            </IconButton>
          </div>
        }
        isLoading={isLoading}
        title="Buyurtmani yopish"
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

export default StoreSales;
