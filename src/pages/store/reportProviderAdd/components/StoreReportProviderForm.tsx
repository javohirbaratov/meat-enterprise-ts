import { Box, Grid, LinearProgress, MenuItem, TextField } from "@mui/material";
import { useFormik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { IStoreProvider, useGetStoreProviderQuery } from '../../../../app/services/store/provider/storeProvider';
import { IStoreReportProviderAdd, useAddStoreReportProviderMutation } from '../../../../app/services/store/reportsProvider/storeReportsProvider';
import MobileSaveHeader from '../../../../components/common/mobileHeader/MobileSaveHeader';
import { store_routes } from '../../../../constants/path';
import formatCommaNum from '../../../../util/formatCommaNum';

interface IFormikValues extends IStoreProvider { }

interface StoreReportProviderProps {
    setShow: Function
}

const initialValues: IStoreReportProviderAdd = {
    taminotchi_id: 0,
    naqdsum: 0,
    naqdusd: 0,
    valyuta: 0,
    bank: 0,
    karta: 0,
    izoh: ""
};

const validationSchema = yup.object<IFormikValues>().shape({
    taminotchi_id: yup.number().required("Taminotchi talab qilinadi"),
    izoh: yup.string().min(3).max(255).required("Izoh talab qilinadi"),
});

const StoreReportProviderForm: React.FC<StoreReportProviderProps> = ( {setShow} ) => {

    // Api
    const [addData, { data: providerAddResData, error }] =
        useAddStoreReportProviderMutation();

    const customerRes = useGetStoreProviderQuery();


    const providerOptions = useMemo(() => {
        if (customerRes.data?.success) {
            return customerRes.data?.data;
        }
        return [];
    }, [customerRes]);

    // Handle submit
    const handleSubmit = async (values: IStoreReportProviderAdd) => {
        addData(values);
        setShow(true);
    };

    // Formik
    const formik = useFormik<IStoreReportProviderAdd>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    // Navigate
    const navigate = useNavigate();

    // Cancel
    const handleCancel = () => {
        navigate(store_routes.reportProvider);
    };

    // Res useEffect
    useEffect(() => {
        if (error) {
            toast.error("Ulanishda xatolik");
        } else {
            if (providerAddResData?.success) {
                if (providerAddResData.success) {
                    setShow(true);
                    toast.success(providerAddResData?.message);
                    formik.resetForm();
                } else {
                    toast.error(providerAddResData?.message);
                }
            }
        }
    }, [error, providerAddResData]);

    return (
        <div>
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
                        {/* Taminotchi */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                size="small"
                                id="taminotchi_id"
                                select
                                label="Taminodchi"
                                name="taminotchi_id"
                                value={formik.values.taminotchi_id}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    formik.touched.taminotchi_id && Boolean(formik.errors.taminotchi_id)
                                }
                                helperText={
                                    formik.touched.taminotchi_id && formik.errors.taminotchi_id
                                }
                                sx={{ m: 0 }}
                                disabled={formik.isSubmitting}
                            >
                                <MenuItem key={0} value={0}>
                                    Tanlang&nbsp;
                                </MenuItem>
                                {providerOptions?.map((state) => (
                                    <MenuItem key={state.id} value={state.id}>
                                        {state.fio}&nbsp;
                                        <small>{formatCommaNum.formatNumber(state.telefon)}</small>
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Naqdsum */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="naqdsum"
                                id="naqdsum"
                                size="small"
                                label="Naqd sum"
                                value={formik.values.naqdsum}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.naqdsum && Boolean(formik.errors.naqdsum)}
                                helperText={formik.touched.naqdsum && formik.errors.naqdsum}
                                disabled={formik.isSubmitting}
                                fullWidth
                            />
                        </Grid>

                        {/* Naqdusd */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="naqdusd"
                                id="naqdusd"
                                size="small"
                                label="Naqd USD"
                                value={formik.values.naqdusd}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.naqdusd && Boolean(formik.errors.naqdusd)}
                                helperText={formik.touched.naqdusd && formik.errors.naqdusd}
                                disabled={formik.isSubmitting}
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
        </div>
    );
};

export default StoreReportProviderForm;