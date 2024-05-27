import { ArrowBack } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Grid, IconButton, Stack } from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useAddSalesOrderMutation } from "../../../app/services/sales/order/salesOrder";
import { useGetSalesSpareQuery } from "../../../app/services/sales/spare/salesSpare";
import {
  IAddOrderProductCard,
  IAddOrderProductCardSetValue,
} from "../../../components/common/addOrderProductCard/AddOrderProductCard";
import AddOrderProductCardWrapper from "../../../components/common/addOrderProductCard/AddOrderProductCardWrapper";
import Steper, { ISteperIndex } from "../../../components/common/steper/Steper";
import { store_routes } from "../../../constants/path";
import AddOrderFinish from "./components/AddOrderFinish";
import AddOrderReviewCard, {
  ISetPaymentData,
} from "./components/AddOrderReviewCard";
import AddOrderSelectUser from "./components/AddOrderSelectUser";
import AddOrderTable, { AddOrderTabeRow } from "./components/AddOrderTable";

interface ISelectedState extends IAddOrderProductCard {
  uuid: string;
}

const StoreSalesAdd: React.FC = () => {
  // State
  const [currentStep, setCurrentStep] = React.useState<ISteperIndex>(0);
  const [allSteps, setAllSteps] = useState<boolean[]>([
    true,
    ...Array(4).fill(false),
  ]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const [selecteds, setSelecteds] = useState<ISelectedState[]>([]);

  const [tableProducts, setTableProducts] = useState<AddOrderTabeRow[]>([]);

  // Navigate
  const navigate = useNavigate();

  // API
  const spareRes = useGetSalesSpareQuery();
  const [addData, { isLoading, data }] = useAddSalesOrderMutation();

  // Save
  const handleSave = async (paymentData: ISetPaymentData) => {
    await addData({
      client_id: selectedUser,
      summa: tableProducts.reduce(
        (a, b) => a + (b.massa || 0) * (b.price || 0),
        0
      ),
      product_list: tableProducts,

      naqd: paymentData.naqd,
      naqdusd: paymentData.naqdusd,
      valyuta: paymentData.valyuta,
      plastik: paymentData.plastik,
      karta: paymentData.karta,
      izoh: paymentData.izoh,
    });
  };

  // Save
  const handleChangeStep = useCallback((index: number, isSteper = true) => {
    if (index === allSteps.length || currentStep === allSteps.length) {
      navigate(store_routes.sales);
      return;
    }

    const data = [...allSteps];
    if (isSteper && index > currentStep) return;

    if (index === 0) {
      setSelecteds((prev) =>
        prev.map((item) => ({
          ...item,
          isSelected: false,
        }))
      );
    }

    data[index] = true;

    setAllSteps(data);
    setCurrentStep(index);
  }, [allSteps, currentStep, navigate]);

  useEffect(() => {
    if (data?.success && !isLoading) {
      handleChangeStep(currentStep + 1, false);
    } else if (data?.message && !isLoading) {
      toast.error(data?.message);
    }
  }, [currentStep, data?.message, data?.success, handleChangeStep, isLoading]);

  // Next active
  const nextBtnActive = useMemo(() => {
    // One
    if (currentStep === 0) {
      if (!selectedUser) return false;
      return true;
    }

    // two
    if (currentStep === 1) {
      if (!selecteds.find((item) => item.isSelected)) return false;
      return true;
    }
    // three
    if (currentStep === 2) {
      if (tableProducts.find((item) => !item.massa || !item.price)) {
        return false;
      }
      return true;
    }
    return true;
  }, [currentStep, selectedUser, selecteds, tableProducts]);

  // Select User
  const handleSelectUser = (userId: string) => {
    handleChangeStep(1, false);
    setSelectedUser(userId);
  };

  // Products
  useEffect(() => {
    if (spareRes.data?.success) {
      setSelecteds(
        spareRes.data?.data.concat(spareRes.data?.data).map((item, index, array) => {
          const isSecondHalf = index >= array.length / 2;
          return {
            uuid: uuidv4(),
            id: item.id,
            caption: isSecondHalf ? `${item.name} Xolodelnik` : item.name,
            title: item.soni,
            isClean: item.name.includes("tiniq"),
            isSelected: false,
            article: item.article,
            isXolodelnik: isSecondHalf ? true : false
          };
        })
      );
    }
  }, [spareRes]);

  const productsWrapperData = useMemo(() => {
    return selecteds;
  }, [selecteds]);

  // Handle select
  const handleSelect = ({ uuid, productId, val }: IAddOrderProductCardSetValue) => {
    setSelecteds((prev) =>
      prev.map((item) => {
        if (item.uuid === uuid) {
          return {
            ...item,
            uuid: item.uuid,
            id: productId,
            isSelected: val,
          };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    if (selecteds.length && currentStep === 2) {
      setTableProducts(
        selecteds
          .filter((item) => item.isSelected)
          .map((item) => ({
            uuid: item.uuid,
            name: item.caption,
            product_id: item.id,
            aritcle: item.article,
            massa: null,
            price: null,
            xolodelnik: item.isXolodelnik,
          }))
      );
    }
  }, [currentStep, selecteds]);

  // Add order table
  const addOrderTableData = useMemo(() => {
    return tableProducts;
  }, [tableProducts]);

  // Total price
  const totalPrice = useMemo(() => {
    return tableProducts.reduce(
      (a, b) => a + (b.massa || 0) * (b.price || 0),
      0
    );
  }, [tableProducts]);

  const handleChangeProductTable = (e: ChangeEvent<HTMLInputElement>) => {
    const parseItem = e.target.name.split(".");
    let value: string | boolean = e.target.value;
 
    
    const data = tableProducts.map((item) => {
      if (item.uuid === parseItem[0]) {
        return {
          ...item,
          [parseItem[1]]: value,
        };
      }
      return item;
    });

    setTableProducts(data);
  };

  return (
    <>
      {/* <MobileSaveHeader onCancel={() => ''} /> */}
      <IconButton
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => navigate(store_routes.sales)}
      >
        <ArrowBack />
      </IconButton>

      <Stack height={"calc(100vh - 20px)"} pb={10}>
        {/* Steper */}
        <Steper value={currentStep} setValue={handleChangeStep} />

        {/* Body */}
        <Grid mt={5} flexGrow={1}>
          {currentStep === 0 ? (
            /* Users */ 
            <AddOrderSelectUser onPress={handleSelectUser} />
          ) : currentStep === 1 ? (
            /* Product */
            <AddOrderProductCardWrapper
              data={productsWrapperData}
              setValue={handleSelect}
            />
          ) : currentStep === 2 ? (
            /* Miqdor */
            <AddOrderTable
              data={addOrderTableData}
              handleChange={handleChangeProductTable}
            />
          ) : currentStep === 3 ? (
            /* Ko'rish */
            <AddOrderReviewCard
              data={addOrderTableData}
              totalPrice={totalPrice}
              isSubmitting={isLoading}
              handleSave={(val) => handleSave(val)}
            />
          ) : currentStep === 4 ? (
            /* Finish */
            <AddOrderFinish />
          ) : null}
        </Grid>

        {currentStep !== 0 && currentStep !== 3 ? (
          <LoadingButton
            variant="contained"
            disabled={!nextBtnActive}
            sx={{ mt: 3 }}
            onClick={() => {
              handleChangeStep(currentStep + 1, false);
            }}
            loading={isLoading}
          >
            {currentStep === 4 ? "Asosiy sahifaga" : "Keyingi"}
          </LoadingButton>
        ) : null}
      </Stack>
    </>
  );
};

export default StoreSalesAdd;
