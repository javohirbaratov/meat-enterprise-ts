import { useFormik } from "formik";
import React, { useEffect, useMemo } from "react";
import {
  IAdminGivingMoneyToAgentAdd,
  useAddAdminGivingMoneyToAgentMutation
} from "../../../app/services/admin/givingMoneyToAgent/adminGivingMoneyToAgent";

import { Check, Close } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, MenuItem, Paper, Skeleton, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useGetStoreAgentQuery } from "../../../app/services/store/reception/storeReception";
import NumericFormatCustom from "../../../components/common/numericFormatCustom/NumericFormatCustom";
import { admin_routes } from "../../../constants/path";

const initialValues: IAdminGivingMoneyToAgentAdd = {
  zakup_id: "",
  summa: "",
  izoh: "",
};

const validationSchema = yup.object<IAdminGivingMoneyToAgentAdd>().shape({
  zakup_id: yup.string().required("Agent talab qilinadi"),
  summa: yup
    .string()
    .min(0, "0 dan kichik bo'lmasin")
    .required("Summa talab qilinadi"),
  izoh: yup.string().required("Izoh talab qilinadi"),
});

const AdminGivingMoneyToAgentForm: React.FC = () => {
  // Navigate
  const navigate = useNavigate();

  // Api
  const agentRes = useGetStoreAgentQuery();
  const [addData, { data: givingDataRes }] =
    useAddAdminGivingMoneyToAgentMutation();

  // Res useEffect
  useEffect(() => {
    if (givingDataRes?.message) {
      if (givingDataRes.success) {
        toast.success(givingDataRes?.message);
        formik.resetForm();
        navigate(admin_routes.givingMoneyToAgent);
      } else {
        toast.error(givingDataRes?.message);
      }
    }
  }, [givingDataRes]);

  const agentOptions = useMemo(() => {
    if (agentRes.data?.success) {
      return agentRes.data?.data;
    }
    return [];
  }, [agentRes]);

  // Submit
  const handleSubmit = async (values: IAdminGivingMoneyToAgentAdd) => {
    await addData(values);
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box component={Paper} my={3} px={2} py={6} maxWidth={600} mx={"auto"}>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid container columnSpacing={2} rowSpacing={3}>
          <Grid item sm={12}>
            {agentRes.isLoading ? (
              <Skeleton variant="rounded" height={40} />
            ) : (
              <TextField
                fullWidth
                size="small"
                id="zakup_id"
                select
                label="Xaridchi"
                name="zakup_id"
                value={formik.values.zakup_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.zakup_id && Boolean(formik.errors.zakup_id)
                }
                helperText={formik.touched.zakup_id && formik.errors.zakup_id}
                sx={{ m: 0 }}
                disabled={formik.isSubmitting}
              >
                {agentOptions?.map((state) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.zakupchik}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
          <Grid item sm={12}>
            <TextField
              name="summa"
              id="summa"
              size="small"
              label="Summa"
              value={formik.values.summa}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.summa && Boolean(formik.errors.summa)}
              helperText={formik.touched.summa && formik.errors.summa}
              disabled={formik.isSubmitting}
              InputProps={{
                inputComponent: NumericFormatCustom as any,
              }}
              fullWidth
            />
          </Grid>
          <Grid item sm={12}>
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
          <Grid item sm={12} mt={4} display={"flex"} gap={2}>
            <LoadingButton
              disabled={formik.isSubmitting}
              startIcon={<Close />}
              variant="contained"
              fullWidth
              color="error"
              onClick={() => navigate(admin_routes.givingMoneyToAgent)}
            >
              Berkor qilishk
            </LoadingButton>

            <LoadingButton
              loading={formik.isSubmitting}
              startIcon={<Check />}
              variant="contained"
              fullWidth
              type="submit"
            >
              Saqlash
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminGivingMoneyToAgentForm;
