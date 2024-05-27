import { Box, Grid } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useGetStoreCashierBalanceQuery } from "../../../app/services/store/cashier/storeCashier";
import ProductCard from "../../../components/common/productCard/ProductCard";
import ProductCardLoading from "../../../components/common/productCard/ProductCardLoading";
import TotalVolumeCard from "../../../components/common/totalVolumeCard/TotalVolumeCard";
import formatCommaNum from "../../../util/formatCommaNum";
import { TStoreReceptionParam } from "../../../app/services/store/reception/storeReception";
import MyDateRange from "../../../components/common/ui/myDateRange/MyDateRange";

const StoreCashier: React.FC = () => {
  // State
  const [selectedDate, setSelectedDate] = useState<TStoreReceptionParam>({
    start: "",
    end: "", 
  });

  // Api
  const cashierRes = useGetStoreCashierBalanceQuery({
    start: selectedDate.start || "",
    end: selectedDate.end || "",
  });

  const { totalPrice, cardsData } = useMemo(() => {
    if (cashierRes.data?.success) {
      return {
        totalPrice: 0,
        cardsData: [
          {
            id: 1,
            label: "Naqd so'm",
            values: cashierRes.data.data.qoldiq_balans.naqdsum,
          },
          {
            id: 2,
            label: "Naqd usd",
            values: cashierRes.data.data.qoldiq_balans.naqdusd,
          },
          {
            id: 3,
            label: "Bank",
            values: cashierRes.data.data.qoldiq_balans.bank,
          },
          {
            id: 4,
            label: "Karta",
            values: cashierRes.data.data.qoldiq_balans.karta,
          },
          {
            id: 5,
            label: "Jami debet",
            values: cashierRes.data.data.jami_hisobot.jami_debet,
          },
          {
            id: 6,
            label: "Jami kredit",
            values: cashierRes.data.data.jami_hisobot.jami_kredit,
          },
          {
            id: 7,
            label: "Ostatka",
            values: cashierRes.data.data.jami_hisobot.ostatka,
          },
          {
            id: 8,
            label: "Balans",
            values: cashierRes.data.data.jami_hisobot.balans,
          },
        ],
      };
    }
    return { totalPrice: 0, cardsData: [] };
  }, [cashierRes.data]);

  return (
    <>
      {/* Date */}
      <Box sx={{ m: "auto", my: 2 }}>
        <MyDateRange setValue={setSelectedDate} />
      </Box>

      <TotalVolumeCard
        isLoading={cashierRes.isLoading || cashierRes.isFetching}
        title={totalPrice}
        prefix="so'm"
      />

      <Grid container rowSpacing={3} columnSpacing={1}>
        {cashierRes.isLoading || cashierRes.isFetching
          ? Array(8)
              .fill("")
              .map((_, index) => (
                <Grid xs={6} md={4} lg={3} item key={index}>
                  <ProductCardLoading />
                </Grid>
              ))
          : cardsData.map((item) => (
              <Grid xs={6} md={4} lg={3} item key={item.id}>
                <ProductCard
                  title={formatCommaNum.formatNumber(item.values)}
                  caption={item.label}
                  prefix=""
                />
              </Grid>
            ))}
      </Grid>
    </>
  );
};

export default StoreCashier;
