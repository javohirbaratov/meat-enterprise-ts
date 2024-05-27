import {
  Box,
  Grid,
  LinearProgress,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useGetSalesSpareQuery } from "../../../app/services/sales/spare/salesSpare";
import {
  IStoreTransferToFreezerAdd,
  useAddStoreTransferToFreezerMutation,
} from "../../../app/services/store/transferToFreezer/storeTransferToFreezer";
import MobileSaveHeader from "../../../components/common/mobileHeader/MobileSaveHeader";
import NumericFormatCustom from "../../../components/common/numericFormatCustom/NumericFormatCustom";
import { store_routes } from "../../../constants/path";
import formatCommaNum from "../../../util/formatCommaNum";

interface IFormikValues extends IStoreTransferToFreezerAdd {}

const initialValues: IFormikValues = {
  product_id: "",
  massa: "",
};

const validationSchema = yup.object<IFormikValues>().shape({
  product_id: yup.string().max(255).required("Mahsulot talab qilinadi"),
  massa: yup.number().min(1).required("Massa talab qilinadi"),
});

const StoreTransferToFreezerAdd = () => {
  // Api
  const [addData, { data: addResData, error }] =
    useAddStoreTransferToFreezerMutation();
  const spareRes = useGetSalesSpareQuery();

  const spareOptions = useMemo(() => {
    if (spareRes.data?.success) {
      return spareRes.data?.data;
    }
    return [];
  }, [spareRes]);

  // Handle submit
  const handleSubmit = async (values: IFormikValues) => {
    await addData(values);
  };

  // Formik
  const formik = useFormik<IFormikValues>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  // Navigate
  const navigate = useNavigate();

  // Cancel
  const handleCancel = () => {
    navigate(store_routes.transferToFreezer);
  };

  // Res useEffect
  useEffect(() => {
    if (error) {
      toast.error("Ulanishda xatolik");
    } else {
      if (addResData?.success) {
        if (addResData.success) {
          toast.success(addResData?.message);
          formik.resetForm();
        } else {
          toast.error(addResData?.message);
        }
      }
    }
  }, [error, addResData]);

  return (
    <Box sx={{ pt: "46px" }}>
      {formik.isSubmitting ? (
        <Box position={"sticky"}>
          <LinearProgress />
        </Box>
      ) : null}

      <form onSubmit={formik.handleSubmit}>
        {/* Header */}
        <MobileSaveHeader onCancel={handleCancel} />

        {/* Body */}
        <Grid container columnSpacing={2} rowSpacing={3}>
          {/* Provider */}
          <Grid item xs={12} sm={6}>
            {spareRes.isLoading ? (
              <Skeleton variant="rounded" height={40} />
            ) : (
              <TextField
                fullWidth
                size="small"
                id="product_id"
                select
                label="Mahsulot"
                name="product_id"
                value={formik.values.product_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.product_id && Boolean(formik.errors.product_id)
                }
                helperText={
                  formik.touched.product_id && formik.errors.product_id
                }
                sx={{ m: 0 }}
                disabled={formik.isSubmitting}
              >
                {spareOptions?.map((state) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.name}&nbsp;
                    <small>{formatCommaNum.formatNumber(state.soni)} kg</small>
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>

          {/* Massa */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="massa"
              id="massa"
              size="small"
              label="massa so'm"
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
        </Grid>
      </form>
    </Box>
  );
};

export default StoreTransferToFreezerAdd;
