import { Box, Grid, LinearProgress, Skeleton, TextField } from "@mui/material";
import { useFormik } from "formik";
import MuiPhoneNumber from "material-ui-phone-number-2";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useGetStoreCustomerByIdQuery, usePutStoreCustomerMutation } from "../../../app/services/store/customer/storeCustomer";
import {
  IStoreProvider
} from "../../../app/services/store/provider/storeProvider";
import MobileSaveHeader from "../../../components/common/mobileHeader/MobileSaveHeader";
import { store_routes } from "../../../constants/path";

interface IFormikValues extends IStoreProvider { }

const initialValues: IFormikValues = {
  fio: "",
  telefon: "",
};

const validationSchema = yup.object<IFormikValues>().shape({
  fio: yup.string().min(3).max(255).required("FISH talab qilinadi"),
  telefon: yup.string().min(0).required("Telefon talab qilinadi"),
});

const StoreCustomerEdit = () => {
  // Params
  const { customerId } = useParams();

  // Api
  const [updateData, { data: providerAddResData, error }] =
    usePutStoreCustomerMutation();

  // Handle submit
  const handleSubmit = async (values: IFormikValues) => {
    await updateData({
      body: values,
      customerId: customerId ?? ''
    });
  };

  // Formik
  const formik = useFormik<IFormikValues>({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  // Api
  const customerRes = useGetStoreCustomerByIdQuery(customerId ?? '');

  // useEffect
  useEffect(() => {
    const res = customerRes.data
    if (res) {
      formik.setFieldValue('fio', res.data.fio);
      formik.setFieldValue('telefon', res.data.telefon);
    }
  }, [customerRes]);

  // Navigate
  const navigate = useNavigate();

  // Cancel
  const handleCancel = () => {
    navigate(store_routes.customer);
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
        <Grid container columnSpacing={2} rowSpacing={3}>
          {/* Fullname */}
          <Grid item xs={12} sm={6}>
            {customerRes.isLoading ? (
              <Skeleton variant="rounded" height={40} />
            ) : (
              <TextField
                name="fio"
                id="naqd"
                size="small"
                label="FISH"
                value={formik.values.fio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fio && Boolean(formik.errors.fio)}
                helperText={formik.touched.fio && formik.errors.fio}
                disabled={formik.isSubmitting}
                fullWidth
              />
            )}
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
            {customerRes.isLoading ? (
              <Skeleton variant="rounded" height={40} />
            ) : (
              <MuiPhoneNumber
                defaultCountry={"uz"}
                masks={{
                  uz: "+...(..)... .. ..",
                }}
                countryCodeEditable={false}
                variant="outlined"
                disableDropdown={true}
                size="small"
                name="telefon"
                fullWidth
                id="telefon"
                label="Telefon"
                value={formik.values.telefon}
                onChange={() => ""}
                onChangeCapture={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.telefon && Boolean(formik.errors.telefon)}
                helperText={formik.touched.telefon && formik.errors.telefon}
                disabled={formik.isSubmitting}
              />
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default StoreCustomerEdit;
