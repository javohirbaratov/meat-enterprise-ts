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
import {
  IStoreExpenseAdd,
  useAddStoreExpenseMutation,
  useGetStoreExpenseCategoryQuery,
} from "../../../app/services/store/expense/storeExpense";
import MobileSaveHeader from "../../../components/common/mobileHeader/MobileSaveHeader";
import NumericFormatCustom from "../../../components/common/numericFormatCustom/NumericFormatCustom";
import { store_routes } from "../../../constants/path";

interface IFormikValues extends IStoreExpenseAdd {}

const initialValues: IFormikValues = {
  naqdsum: 0,
  naqdusd: 0,
  valyuta: 0,
  bank: 0,
  karta: 0,
  izoh: "",
  category_id: "",
};

const validationSchema = yup.object<IFormikValues>().shape({
  naqdsum: yup.number().min(0).required("Naqd so'm talab qilinadi"),
  naqdusd: yup.number().min(0).required("Naqd usd talab qilinadi"),
  valyuta: yup.number().min(0).required("Valyuta talab qilinadi"),
  bank: yup.number().min(0).required("Plastik talab qilinadi"),
  karta: yup.number().min(0).required("Karta talab qilinadi"),
  izoh: yup.string().required("Izoh talab qilinadi"),
  category_id: yup.string().required("Xarajat"),
});

const StoreExpenseAdd = () => {
  // Api
  const [addData, { data: providerAddResData, error }] =
    useAddStoreExpenseMutation();

  const expenseCategoryRes = useGetStoreExpenseCategoryQuery();

  const expenseCategoryOptions = useMemo(() => {
    if (expenseCategoryRes.data?.success) {
      return expenseCategoryRes.data?.data;
    }
    return [];
  }, [expenseCategoryRes]);

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
    navigate(store_routes.expense);
  };

  // Res useEffect
  useEffect(() => {
    if (error) {
      toast.error("Ulanishda xatolik");
    } else {
      if (providerAddResData?.success) {
        if (providerAddResData.success) {
          toast.success(providerAddResData?.message);
          formik.resetForm();
        } else {
          toast.error(providerAddResData?.message);
        }
      }
    }
  }, [error, providerAddResData]);

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
        <Grid container columnSpacing={2} rowSpacing={2} my={3}>
          {/* Provider */}
          <Grid item xs={12} sm={6}>
            {expenseCategoryRes.isLoading ? (
              <Skeleton variant="rounded" height={40} />
            ) : (
              <TextField
                fullWidth
                size="small"
                id="category_id"
                select
                label="Xarajat turi"
                name="category_id"
                value={formik.values.category_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.category_id &&
                  Boolean(formik.errors.category_id)
                }
                helperText={
                  formik.touched.category_id && formik.errors.category_id
                }
                sx={{ m: 0 }}
                disabled={formik.isSubmitting}
              >
                {expenseCategoryOptions?.map((state) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>

          {/* Narx */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="naqdsum"
              id="naqdsum"
              size="small"
              label="Naqd so'm"
              value={formik.values.naqdsum}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.naqdsum && Boolean(formik.errors.naqdsum)}
              helperText={formik.touched.naqdsum && formik.errors.naqdsum}
              disabled={formik.isSubmitting}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
              fullWidth
            />
          </Grid>

          {/* Naqd usd */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="naqdusd"
              id="naqdusd"
              size="small"
              label="m.b."
              value={formik.values.naqdusd}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.naqdusd && Boolean(formik.errors.naqdusd)}
              helperText={formik.touched.naqdusd && formik.errors.naqdusd}
              disabled={formik.isSubmitting}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
              fullWidth
            />
          </Grid>

          {/* Valyuta */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="valyuta"
              id="valyuta"
              size="small"
              label="Valyuta"
              value={formik.values.valyuta}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.valyuta && Boolean(formik.errors.valyuta)}
              helperText={formik.touched.valyuta && formik.errors.valyuta}
              disabled={formik.isSubmitting}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
              fullWidth
            />
          </Grid>

          {/* Bank */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="bank"
              id="bank"
              size="small"
              label="Bank"
              value={formik.values.bank}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bank && Boolean(formik.errors.bank)}
              helperText={formik.touched.bank && formik.errors.bank}
              disabled={formik.isSubmitting}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
              fullWidth
            />
          </Grid>

          {/* Karta */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="karta"
              id="karta"
              size="small"
              label="Karta"
              value={formik.values.karta}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.karta && Boolean(formik.errors.karta)}
              helperText={formik.touched.karta && formik.errors.karta}
              disabled={formik.isSubmitting}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
              fullWidth
            />
          </Grid>

          {/* Izoh */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="izoh"
              id="izoh"
              size="small"
              label="Izoh"
              value={formik.values.izoh}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.izoh && Boolean(formik.errors.izoh)}
              helperText={formik.touched.izoh && formik.errors.izoh}
              disabled={formik.isSubmitting}
              fullWidth
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default StoreExpenseAdd;
