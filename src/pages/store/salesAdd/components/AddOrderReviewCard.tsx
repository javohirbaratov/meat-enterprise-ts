import { LoadingButton } from "@mui/lab";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import { useFormik } from "formik";
import React, { Dispatch } from "react";
import * as yup from "yup";
import { ISalesAddOrderProduct } from "../../../../app/services/sales/order/salesOrder";
import MoneyCardSecondly from "../../../../components/common/moneyCardSecondly/MoneyCardSecondly";
import NumericFormatCustom from "../../../../components/common/numericFormatCustom/NumericFormatCustom";
import formatCommaNum from "../../../../util/formatCommaNum";

export interface AddOrderReviewItem extends ISalesAddOrderProduct {
  uuid: string;
  name: string;
}

export interface ISetPaymentData {
  naqd: number | "";
  naqdusd: number | "";
  valyuta: number | "";
  plastik: number | "";
  karta: number | "";
  izoh: string;
}

interface AddOrderReviewProps {
  data: AddOrderReviewItem[];
  totalPrice: number;
  handleSave: Dispatch<ISetPaymentData>;
  isSubmitting: boolean;
}

const initialValues: ISetPaymentData = {
  naqd: 0,
  naqdusd: 0,
  valyuta: 0,
  plastik: 0,
  karta: 0,
  izoh: "",
};

const validationSchema = yup.object<ISetPaymentData>().shape({
  naqd: yup.number().min(0).required("Naqd so'm talab qilinadi"),
  naqdusd: yup.number().min(0).required("Naqd usd talab qilinadi"),
  valyuta: yup.number().min(0).required("Valyuta talab qilinadi"),
  plastik: yup.number().min(0).required("Plastik talab qilinadi"),
  karta: yup.number().min(0).required("Karta talab qilinadi"),
  izoh: yup.string().required("Izoh talab qilinadi"),
  // xolodelnik: yup.boolean().required("Xolodelnik talab qilinadi"),
});

const AddOrderReviewCard: React.FC<AddOrderReviewProps> = ({
  data,
  totalPrice,
  handleSave,
  isSubmitting,
}) => {
  // Formik
  const formik = useFormik<ISetPaymentData>({
    initialValues,
    validationSchema,
    onSubmit: handleSave,
  });

  return (
    <>
      <MoneyCardSecondly title={totalPrice} />

      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 0.5, fontSize: 12 }} align="left">
                Mahsulot
              </TableCell>
              <TableCell sx={{ px: 0.5, fontSize: 12 }}>Narx</TableCell>
              <TableCell sx={{ px: 0.5, fontSize: 12 }}>Miqdor</TableCell>
              <TableCell
                sx={{ px: 0.5, fontSize: 12 }}
                width={80}
                align="right"
              >
                Summa
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.uuid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  sx={{ px: 0.5, color: "#747C85", fontSize: 12 }}
                  scope="row"
                  align="left"
                >
                  {row.name}
                </TableCell>
                <TableCell component="th" sx={{ px: 0.5 }} scope="row">
                  {row.massa ? formatCommaNum.formatNumber(row.massa) : 0}
                </TableCell>
                <TableCell component="th" sx={{ px: 0.5 }} scope="row">
                  {row.price ? formatCommaNum.formatNumber(row.price) : 0}
                </TableCell>

                <TableCell
                  component="th"
                  sx={{ px: 0.5, color: "#747C85", fontSize: 12 }}
                  scope="row"
                  align="right"
                >
                  {formatCommaNum.formatNumber(
                    (row.price || 0) * (row.massa || 0)
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <form onSubmit={formik.handleSubmit}>
        {/* Body */}
        <Grid container columnSpacing={2} rowSpacing={2} my={3}>
          {/* Narx */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="naqd"
              id="naqd"
              size="small"
              label="Naqd so'm"
              value={formik.values.naqd}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.naqd && Boolean(formik.errors.naqd)}
              helperText={formik.touched.naqd && formik.errors.naqd}
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

          {/* Plastik */}
          <Grid item xs={12} sm={6}>
            <TextField
              name="plastik"
              id="plastik"
              size="small"
              label="Plastik"
              value={formik.values.plastik}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.plastik && Boolean(formik.errors.plastik)}
              helperText={formik.touched.plastik && formik.errors.plastik}
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

          <Grid item xs={12} sm={6}>
            <LoadingButton
              variant="contained"
              sx={{ mt: 3 }}
              fullWidth
              type="submit"
              loading={isSubmitting}
            >
              Tasdiqlash
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddOrderReviewCard;
