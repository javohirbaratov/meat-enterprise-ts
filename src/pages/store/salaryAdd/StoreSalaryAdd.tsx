import {
  Box,
  Grid,
  LinearProgress,
  MenuItem,
  Skeleton,
  TextField
} from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useAddStoreSalaryMutation, useGetStoreWorkerQuery } from "../../../app/services/store/salary/storeSalary";
import MobileSaveHeader from "../../../components/common/mobileHeader/MobileSaveHeader";
import NumericFormatCustom from "../../../components/common/numericFormatCustom/NumericFormatCustom";
import { store_routes } from "../../../constants/path";

interface StoreReceptionAddProps { }

interface IFormikValues {
  worker_id: string,
  bank: string,
  karta: string,
  naqdsum: string,
  naqdusd: string,
  izoh: string,
  valyuta: string,
}

const initialValues = {
  worker_id: "",
  bank: "",
  karta: "",
  naqdsum: "0",
  naqdusd: "0",
  izoh: "",
  valyuta: "0",
};

const validationSchema = yup
  .object<IFormikValues>()
  .shape({
    worker_id: yup.string().required("Ishchi talab qilinadi"),
    izoh: yup.string().required("Izoh talab qilinadi"),
  })
  .required();

const StoreSalaryAdd: React.FC<StoreReceptionAddProps> = () => {
  // Navigate
  const navigate = useNavigate();

  // APi
  const [addData, { isLoading, data }] = useAddStoreSalaryMutation();
  // Api useGetSalesSpareQuery
  const workerRes = useGetStoreWorkerQuery();
  // SAVE
  const handleSave = async (values: IFormikValues) => {
    await addData({
      worker_id: values.worker_id,
      bank: values.bank,
      karta: values.karta,
      naqdsum: values.naqdsum,
      naqdusd: values.naqdusd,
      izoh: values.izoh,
      valyuta: values.valyuta,
    });
  };

  // Cancel
  const handleCancel = () => {
    navigate(store_routes.reception);
  };

  // Formik
  const formik = useFormik<IFormikValues>({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSave
  });

  useEffect(() => {
    if (data?.success && !isLoading) {
      toast.success(data.message);
      formik.resetForm();
      navigate(store_routes.reception);
    } else if (data?.message && !isLoading) {
      toast.error(data?.message);
    }
  }, [data?.message, data?.success, isLoading]);

  const workerOptions = useMemo(() => {
    if (workerRes.data?.success) {
      return workerRes.data?.data;
    }
    return [];
  }, [workerRes]);

  return (
    <Box sx={{ pt: "46px" }}>
      {formik.isSubmitting ? (
        <Box position={"sticky"}>
          <LinearProgress />
        </Box>
      ) : null}
      <form onSubmit={formik.handleSubmit}>
        <FormikProvider value={formik}>
          {/* Header */}
          <MobileSaveHeader onCancel={handleCancel} />

          {/* Body */}
          <Grid container columnSpacing={2} rowSpacing={3}>
            {/* Worker */}
            <Grid item xs={12} sm={6}>
              {workerRes.isLoading ? (
                <Skeleton variant="rounded" height={40} />
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  id="worker_id"
                  select
                  label="Ishchi"
                  name="worker_id"
                  value={formik.values.worker_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.worker_id &&
                    Boolean(formik.errors.worker_id)
                  }
                  helperText={
                    formik.touched.worker_id && formik.errors.worker_id
                  }
                  sx={{ m: 0 }}
                  disabled={formik.isSubmitting}
                >
                  {workerOptions?.map((state) => (
                    <MenuItem key={state.id} value={state.id}>
                      {state.fio}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>

            {/* Bank  */}
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

            {/* Karta  */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="karta"
                id="karta"
                size="small"
                label="karta"
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

            {/* naqdsum  */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="naqdsum"
                id="naqdsum"
                size="small"
                label="naqdsum"
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

            {/* naqdusd  */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="naqdusd"
                id="naqdusd"
                size="small"
                label="naqdusd"
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

            {/* valyuta  */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="valyuta"
                id="valyuta"
                size="small"
                label="valyuta"
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

            {/* izoh  */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="izoh"
                id="izoh"
                size="small"
                label="izoh"
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
        </FormikProvider>
      </form>
    </Box>
  );
};

export default StoreSalaryAdd;
