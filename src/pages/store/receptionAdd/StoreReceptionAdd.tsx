import { Add, RemoveCircleOutline } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useGetSalesSpareQuery } from "../../../app/services/sales/spare/salesSpare";
import { useGetStoreProviderQuery } from "../../../app/services/store/provider/storeProvider";
import {
  useAddStoreReceptionMutation,
  useGetStoreButcherQuery,
} from "../../../app/services/store/reception/storeReception";
import MobileSaveHeader from "../../../components/common/mobileHeader/MobileSaveHeader";
import NumericFormatCustom from "../../../components/common/numericFormatCustom/NumericFormatCustom";
import { store_routes } from "../../../constants/path";
import { formatFloat } from "../../../util/formatFloat";

interface StoreReceptionAddProps { }

interface IFormikValues {
  taminotchi_id: string;
  qassob_id: string;
  product_id: string;
  narx: string;
  jami_massa: string;
  jami_dona: string;
  rows: number[][];
}

const initialValues = {
  taminotchi_id: "",
  qassob_id: "",
  product_id: "",
  narx: "0",
  jami_massa: "0",
  jami_dona: "0",
  rows: [[0, 0, 0]],
};

const validationSchema = yup
  .object<IFormikValues>()
  .shape({
    taminotchi_id: yup.string().required("Xaridchi talab qilinadi"),
    product_id: yup.string().required("Xaridchi talab qilinadi"),
    qassob_id: yup.string().required("Qassob talab qilinadi"),
    narx: yup.number().min(0).required("Narx talab qilinadi"),
    jami_massa: yup.number().min(0, '0 dan kichik bo\'lmasin!').required("Jami massa talab qilinadi"),
    jami_dona: yup.number().min(0, '0 dan kichik bo\'lmasin!').required("Jami dona talab qilinadi"),
    rows: yup.array().of(yup.array().of(yup.string().required("Majburiy"))),
  })
  .required();

const StoreReceptionAdd: React.FC<StoreReceptionAddProps> = () => {
  // Navigate
  const navigate = useNavigate();

  // APi
  const [addData, { isLoading, data }] = useAddStoreReceptionMutation();

  // SAVE
  const handleSave = async (values: IFormikValues) => {
    await addData({
      taminotchi_id: values.taminotchi_id,
      product_id: values.product_id,
      qassob_id: values.qassob_id,
      price: values.narx,
      massa: values.jami_massa,
      dona: values.jami_dona,
      malumot: values.rows.map((item) => ({
        massa: item[0],
        dona: item[1],
        yashik: item[2],
      })),
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

  // Api useGetSalesSpareQuery
  const providerRes = useGetStoreProviderQuery();
  const butcherRes = useGetStoreButcherQuery();
  const productRes = useGetSalesSpareQuery();

  const providerOptions = useMemo(() => {
    if (providerRes.data?.success) {
      return providerRes.data?.data;
    }
    return [];
  }, [providerRes]);

  const productOptions = useMemo(() => {
    if (productRes.data?.success) {
      return productRes.data?.data;
    }
    return [];
  }, [productRes]);

  const butcherOptions = useMemo(() => {
    if (butcherRes.data?.success) {
      return butcherRes.data?.data;
    }
    return [];
  }, [butcherRes]);

  const calculate = (val: number, val2: number) => {
    return formatFloat(val - val2)
  }

  useEffect(() => {
    let totalMass = 0
    formik.values.rows.map((item, index) => {
      const firstVal = !isNaN(Number(item[0])) ? Number(item[0]) : 0;
      const secondVal = !isNaN(Number(item[1])) ? Number(item[1]) : 0;

      totalMass += calculate(firstVal, secondVal)
    })
    formik.setFieldValue('jami_massa', totalMass)
  }, [formik.values])

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
            {/* Provider */}
            <Grid item xs={12} sm={6}>
              {providerRes.isLoading ? (
                <Skeleton variant="rounded" height={40} />
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  id="taminotchi_id"
                  select
                  label="Taminotchi"
                  name="taminotchi_id"
                  value={formik.values.taminotchi_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.taminotchi_id &&
                    Boolean(formik.errors.taminotchi_id)
                  }
                  helperText={
                    formik.touched.taminotchi_id && formik.errors.taminotchi_id
                  }
                  sx={{ m: 0 }}
                  disabled={formik.isSubmitting}
                >
                  {providerOptions?.map((state) => (
                    <MenuItem key={state.id} value={state.id}>
                      {state.fio}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>

            {/* Butcher */}
            <Grid item xs={12} sm={6}>
              {providerRes.isLoading ? (
                <Skeleton variant="rounded" height={40} />
              ) : (
                <TextField
                  fullWidth
                  size="small"
                  id="qassob_id"
                  select
                  label="Qassob"
                  name="qassob_id"
                  value={formik.values.qassob_id}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.qassob_id && Boolean(formik.errors.qassob_id)
                  }
                  helperText={
                    formik.touched.qassob_id && formik.errors.qassob_id
                  }
                  sx={{ m: 0 }}
                  disabled={formik.isSubmitting}
                >
                  {butcherOptions?.map((state) => (
                    <MenuItem key={state.id} value={state.id}>
                      {state.fio}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
            {/* Product ID  */}
            <Grid item xs={12} sm={6}>
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
                {productOptions?.map((state) => (
                  <MenuItem key={state.id} value={state.id}>
                    {state.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {/* Narx */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="narx"
                id="narx"
                size="small"
                label="Narx"
                value={formik.values.narx}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.narx && Boolean(formik.errors.narx)}
                helperText={formik.touched.narx && formik.errors.narx}
                disabled={formik.isSubmitting}
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
                fullWidth
              />
            </Grid>

            {/* Total mass */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="jami_massa"
                id="jami_massa"
                size="small"
                label="Jami massa"
                value={
                  formik.values.jami_massa
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.jami_massa && Boolean(formik.errors.jami_massa)
                }
                helperText={
                  formik.touched.jami_massa && formik.errors.jami_massa
                }
                disabled={true}
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
                fullWidth
              />
            </Grid>

            {/* Total count */}
            <Grid item xs={12} sm={6}>
              <TextField
                name="jami_dona"
                id="jami_dona"
                size="small"
                label="Jami dona"
                value={formik.values.jami_dona}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.jami_dona && Boolean(formik.errors.jami_dona)
                }
                helperText={formik.touched.jami_dona && formik.errors.jami_dona}
                disabled={formik.isSubmitting}
                InputProps={{
                  inputComponent: NumericFormatCustom as any,
                }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FieldArray name="rows">
                {({ push, remove }) => (
                  <>
                    {formik.values.rows.map((row, index) => (
                      <Grid key={index} container spacing={1} mb={2}>
                        {row.map((item, inIndex) => (
                          <Grid item xs={3.53} key={inIndex}>
                            <TextField
                              name={`rows.${index}.${inIndex}`}
                              id={`rows.${index}.${inIndex}`}
                              size="small"
                              label={
                                inIndex === 0
                                  ? "Massa"
                                  : inIndex === 1
                                    ? "Tara"
                                    : "Toza"
                              }
                              value={
                                inIndex === 2 ? calculate(row[0], row[1]) : item
                              }
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={
                                formik.touched?.rows?.[index]?.[inIndex] &&
                                Boolean(formik.errors?.rows?.[index]?.[inIndex])
                              }
                              helperText={
                                formik.touched?.rows?.[index]?.[inIndex] &&
                                formik.errors?.rows?.[index]?.[inIndex]
                              }
                              disabled={
                                inIndex === 2 ? true : formik.isSubmitting
                              }
                              InputProps={{
                                inputComponent: NumericFormatCustom as any,
                              }}
                              fullWidth
                            />
                          </Grid>
                        ))}
                        <Grid item xs={1.4}>
                          {index === 0 ? (
                            <IconButton onClick={() => push(["", "", ""])}>
                              <Add />
                            </IconButton>
                          ) : (
                            <IconButton onClick={() => remove(index)}>
                              <RemoveCircleOutline />
                            </IconButton>
                          )}
                        </Grid>
                      </Grid>
                    ))}
                  </>
                )}
              </FieldArray>
            </Grid>

          </Grid>
        </FormikProvider>
      </form>
    </Box>
  );
};

export default StoreReceptionAdd;
