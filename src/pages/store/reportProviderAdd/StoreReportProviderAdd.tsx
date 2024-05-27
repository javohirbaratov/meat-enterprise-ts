import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  IStoreProvider,
  useGetStoreProviderQuery
} from "../../../app/services/store/provider/storeProvider";
import { IStoreReportProviderAdd, useAddStoreReportProviderMutation } from "../../../app/services/store/reportsProvider/storeReportsProvider";
import { store_routes } from "../../../constants/path";
import StoreReportProviderForm from "./components/StoreReportProviderForm";
import StoreReportProviderFormSms from "./components/StoreReportProviderFormSms";


interface IFormikValues extends IStoreProvider { }

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

const StoreReportProviderAdd = () => {
  // State 
  const [showCode, setShowCode] = useState(false);


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
    await addData(values);
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
          toast.success(providerAddResData?.message);
          formik.resetForm();
        } else {
          toast.error(providerAddResData?.message);
        }
      }
    }
  }, [error, providerAddResData]);

  return (
    <>
        {showCode ? (
            <StoreReportProviderFormSms />
          ) : (
            <StoreReportProviderForm setShow={setShowCode}/>
          )
        }
    </>
  );
};

export default StoreReportProviderAdd;
