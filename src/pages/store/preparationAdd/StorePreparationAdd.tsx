import {
  Box,
  Grid,
  LinearProgress,
  MenuItem,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  IStoreOrderConfirmResItem,
  useGetStoreOrderConfirmedByOneQuery,
} from "../../../app/services/store/order/storeOrder";
import {
  IStoreOrderProcessAdd,
  useAddStoreOrderProcessEndMutation,
  useAddStoreOrderProcessMutation,
} from "../../../app/services/store/orderProcess/storeOrderProcess";
import MobileSaveHeader from "../../../components/common/mobileHeader/MobileSaveHeader";
import NumericFormatCustom from "../../../components/common/numericFormatCustom/NumericFormatCustom";
import { store_routes } from "../../../constants/path";
import formatCommaNum from "../../../util/formatCommaNum";

const initialValues: IStoreOrderProcessAdd = {
  order_id: "",
  order_item_id: "",
  massa: "",
  bonus: "",
  isEnd: 0,
  isEndOrder: 0,
};

const validationSchema = yup
  .object<IStoreOrderProcessAdd>()
  .shape({
    order_item_id: yup.string().required("Mahsulot talab qilinadi"),
    massa: yup.number().min(0).required("Massa talab qilinadi"),
  })
  .required();

const StorePreparationAdd: React.FC = () => {
  // Param
  const { orderId } = useParams<{ orderId: string }>();

  // Navigate
  const navigate = useNavigate();

  // Api
  const [addData, { data: addOrderProcessResData }] =
    useAddStoreOrderProcessMutation();
  const [addEndOrder, { data: endOrderDataRes, isLoading: endOrderIsLoading }] =
    useAddStoreOrderProcessEndMutation();

  useEffect(() => {
    if (!endOrderIsLoading && endOrderDataRes?.message) {
      if (endOrderDataRes?.success) {
        toast.success(endOrderDataRes.message);
        navigate(store_routes.cashier);
      } else {
        toast.error(endOrderDataRes?.message);
      }
    }
  }, [endOrderDataRes, endOrderIsLoading]);

  // Res useEffect
  useEffect(() => {
    if (addOrderProcessResData?.message) {
      if (addOrderProcessResData.success) {
        toast.success(addOrderProcessResData?.message);
        formik.resetForm();
      } else {
        toast.error(addOrderProcessResData?.message);
      }
    }
  }, [addOrderProcessResData]);

  // SAVE
  const handleSave = async (values: IStoreOrderProcessAdd) => {
    if (!orderId) return;

    await addData({
      ...values,
      order_id: orderId,
    });
  };

  // Cancel
  const handleCancel = () => {
    navigate(store_routes.cashier);
  };

  // Formik
  const formik = useFormik<IStoreOrderProcessAdd>({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSave,
  });

  // Api
  const orderProductsRes = useGetStoreOrderConfirmedByOneQuery({
    orderId: orderId || "",
  });

  const orderData = useMemo<IStoreOrderConfirmResItem | null>(() => {
    if (orderProductsRes.data?.success) {
      return orderProductsRes.data.data;
    }
    return null;
  }, [orderProductsRes]);

  const orderProductsOptions = useMemo(() => {
    if (orderProductsRes.data?.success) {
      return orderProductsRes.data.data.product_list;
    }
    return [];
  }, [orderProductsRes]);

  useEffect(() => {
    if (!orderProductsRes.isLoading && !orderProductsRes.data?.success) {
      navigate(store_routes.orderHistory, { replace: true });
      if (orderProductsRes.data?.message)
        toast.error(orderProductsRes.data?.message);
    }
  }, [
    navigate,
    orderProductsRes.data?.message,
    orderProductsRes.data?.success,
    orderProductsRes.isLoading,
  ]);

  // Handle end order
  const handleEndOrder = (orderId: string | undefined) => {
    if (!orderId) toast.error("Buyurtmani tugatib bo'lmadi");
    else {
      addEndOrder({ order_id: orderId });
    }
  };

  return (
    <Box sx={{ pt: "46px" }}>
      {formik.isSubmitting ? (
        <Box position={"sticky"}>
          <LinearProgress />
        </Box>
      ) : null}
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ mt: 3 }}
        maxWidth={800}
        mx={"auto"}
      >
        {/* Header */}
        <MobileSaveHeader
          onCancel={handleCancel}
          // onSave={formik.handleSubmit}
        />

        {/* Body */}
        <Grid container columnSpacing={2} rowSpacing={3}>
          <Grid item xs={12} sm={6}>
            {orderProductsRes.isLoading || orderProductsRes.isFetching ? (
              <Skeleton variant="rounded" height={40} />
            ) : (
              <TextField
                fullWidth
                size="small"
                id="order_item_id"
                select
                label="Mahsulot"
                name="order_item_id"
                value={formik.values.order_item_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.order_item_id &&
                  Boolean(formik.errors.order_item_id)
                }
                helperText={
                  formik.touched.order_item_id && formik.errors.order_item_id
                }
                sx={{ m: 0 }}
                disabled={formik.isSubmitting}
              >
                {orderProductsOptions.map((state) => (
                  <MenuItem key={state.item_id} value={state.item_id}>
                    {state.product_name} [{state.massa}]
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="massa"
              id="massa"
              size="small"
              label="Massa"
              value={formik.values.massa}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.massa && Boolean(formik.errors.massa)}
              helperText={formik.touched.massa && formik.errors.massa}
              disabled={formik.isSubmitting}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="bonus"
              id="bonus"
              size="small"
              label="Bonus massa"
              value={formik.values.bonus}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bonus && Boolean(formik.errors.bonus)}
              helperText={formik.touched.bonus && formik.errors.bonus}
              disabled={formik.isSubmitting}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <p>
              <strong>{orderData?.client}</strong>
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TableContainer>
              <Table size="small" aria-label="a dense table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Nomi</TableCell>
                    <TableCell>Buyurtma(kg)</TableCell>
                    <TableCell>Bonus(kg)</TableCell>
                    <TableCell align="right">Tayyorlandi(kg)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderProductsOptions?.map((row) => (
                    <TableRow
                      key={row.product_id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.product_name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatCommaNum.formatNumber(row.massa)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatCommaNum.formatNumber(row.bonus)}
                      </TableCell>
                      <TableCell component="th" scope="row" align="right">
                        {formatCommaNum.formatNumber(row.tayyorlandi)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={6} mt={5}>
            <LoadingButton
              variant="contained"
              color="error"
              onClick={() => handleEndOrder(orderData?.id)}
              loadingPosition="center"
              loading={endOrderIsLoading}
            >
              Buyurtmani yopish
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default StorePreparationAdd;
