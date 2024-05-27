import { useFormik } from "formik";
import * as yup from "yup";
import {
  IStoreProvider,
  useAddStoreProviderMutation,
} from "../../../app/services/store/provider/storeProvider";
import { Box, Grid, LinearProgress, TextField } from "@mui/material";
import { useEffect } from "react";
import MuiPhoneNumber from "material-ui-phone-number-2";
import MobileSaveHeader from "../../../components/common/mobileHeader/MobileSaveHeader";
import { useNavigate } from "react-router-dom";
import { store_routes } from "../../../constants/path";
import { toast } from "react-toastify";

interface IFormikValues extends IStoreProvider {}

const initialValues: IFormikValues = {
  fio: "",
  telefon: "",
};

const validationSchema = yup.object<IFormikValues>().shape({
  fio: yup.string().min(3).max(255).required("FISH talab qilinadi"),
  telefon: yup.string().min(0).required("Telefon talab qilinadi"),
});

const StoreProviderAdd = () => {
  // Api
  const [addData, { data: providerAddResData, error }] =
    useAddStoreProviderMutation();

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
    navigate(store_routes.provider);
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
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
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
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default StoreProviderAdd;
