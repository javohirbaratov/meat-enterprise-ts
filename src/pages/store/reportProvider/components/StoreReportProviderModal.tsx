import { Button, Grid, TextField } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as React from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { IStoreProvider } from '../../../../app/services/store/provider/storeProvider';
import { IStoreReportProviderConfirmSms, useAddSmsStoreReportProviderMutation } from '../../../../app/services/store/reportsProvider/storeReportsProvider';


interface IFormikValues extends IStoreProvider { }

type StoreReportProviderModalProps = {
    id: number,
    open: boolean;
    handleClose: VoidFunction
};

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    px: 2,
    py: 4,
    borderRadius: 2
};

const StoreReportProviderModal: React.FC<StoreReportProviderModalProps> = ({ id, open, handleClose }) => {

    // initial Values 
    const initialValues: IStoreReportProviderConfirmSms = {
        taminotchi_id: id,
        code: ''
    };

    // Validation schema 
    const validationSchema = yup.object<IFormikValues>().shape({
        code: yup.string().min(3).max(255).required("Kod talab qilinadi"),
    });

    // API
    const [addData, { data: providerAddResData, error }] =
        useAddSmsStoreReportProviderMutation();

    // Handle submit
    const handleSubmit = async (values: IStoreReportProviderConfirmSms) => {
        try {

            const res = await addData({
                ...values,
                taminotchi_id: id
            }).unwrap();

            if (res.success) {
                toast.success(res.message)

            } else {

                toast.error(res.message)
            }

        } catch (err) {

            console.log(err);

            toast.error('Ulanishda xatolik')
        }
        formik.resetForm();
        handleClose();
        console.log(providerAddResData);

    };

    // Formik
    const formik = useFormik<IStoreReportProviderConfirmSms>({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            sx={{ zIndex: 9999 }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box sx={style}>

                    <form onSubmit={formik.handleSubmit}>
                        <Typography variant="subtitle1" gutterBottom>
                            SMS kodni kiriting
                        </Typography>
                        {/* Body */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                // onClick={onSave}
                                >
                                    Saqlash
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default StoreReportProviderModal;