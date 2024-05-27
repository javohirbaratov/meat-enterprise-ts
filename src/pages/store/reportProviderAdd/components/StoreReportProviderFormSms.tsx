import { Box, Grid, LinearProgress, MenuItem, TextField } from "@mui/material";
import { useFormik } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { IStoreProvider, useGetStoreProviderQuery } from '../../../../app/services/store/provider/storeProvider';
import { IStoreReportProviderConfirmSms, useAddSmsStoreReportProviderMutation } from '../../../../app/services/store/reportsProvider/storeReportsProvider';
import MobileSaveHeader from '../../../../components/common/mobileHeader/MobileSaveHeader';
import { store_routes } from '../../../../constants/path';
import formatCommaNum from '../../../../util/formatCommaNum';

interface IFormikValues extends IStoreProvider { }

const initialValues: IStoreReportProviderConfirmSms = {
    taminotchi_id: 0,
    code: 0
};

const validationSchema = yup.object<IFormikValues>().shape({
    taminotchi_id: yup.number().required("Taminotchi talab qilinadi"),
    code: yup.string().min(3).max(255).required("Kod talab qilinadi"),
});
 
const StoreReportProviderFormSms: React.FC = () => {
    
    // Api
    const [addData, { data: providerAddResData, error }] =
        useAddSmsStoreReportProviderMutation();

    const customerRes = useGetStoreProviderQuery();


    const providerOptions = useMemo(() => {
        if (customerRes.data?.success) {
            return customerRes.data?.data;
        }
        return [];
    }, [customerRes]);

    // Handle submit
    const handleSubmit = async (values: IStoreReportProviderConfirmSms) => {
        await addData(values);
    };

    // Formik
    const formik = useFormik<IStoreReportProviderConfirmSms>({
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

                        {/* code */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="code"
                                id="code"
                                size="small"
                                label="Kod"
                                value={formik.values.code}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.code && Boolean(formik.errors.code)}
                                helperText={formik.touched.code && formik.errors.code}
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

export default StoreReportProviderFormSms;