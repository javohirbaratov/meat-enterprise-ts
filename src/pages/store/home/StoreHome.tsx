import { Grid } from "@mui/material";
import React, { useMemo } from "react";
import { useGetStoreSpareQuery } from "../../../app/services/store/spare/storeSpare";
import MyPieChart, {
  TPieChart,
} from "../../../components/common/chart/pieChart/MyPieChart";
import ProductCard from "../../../components/common/productCard/ProductCard";
import ProductCardLoading from "../../../components/common/productCard/ProductCardLoading";
import TotalVolumeCard from "../../../components/common/totalVolumeCard/TotalVolumeCard";
import { store_routes } from "../../../constants/path";
import formatCommaNum from "../../../util/formatCommaNum";

const StoreHome: React.FC = () => {
  // Api
  const spareRes = useGetStoreSpareQuery();

  const { jami_krim_mass, svejiy, xolodelnik, foiz } = useMemo(() => {
    if (spareRes.data?.success) {
      return {
        jami_krim_mass: formatCommaNum.formatNumber(
          spareRes.data.data.jami_krim_mass
        ),
        svejiy: spareRes.data.data.svejiy,
        xolodelnik: spareRes.data.data.xolodelnik,
        foiz: spareRes.data.data.foiz
      };
    }
    return { jami_krim_mass: 0, svejiy: [], xolodelnik: [] };
  }, [spareRes.data]);

  const spareChartData = useMemo<TPieChart[]>(() => {
    if (xolodelnik.length) {
      return xolodelnik.map((item) => ({
        id: item.id,
        value: item.massa,
        label: item.name,
        percent: item.foiz,
      }));
    }
    return [];
  }, [xolodelnik]);
  
  return (
    <div>
      <TotalVolumeCard
        isLoading={spareRes.isLoading}
        title={jami_krim_mass}
        foiz={foiz}
        to={store_routes.receptionAdd}
      />

      <Grid container rowSpacing={3} columnSpacing={1}>
        {spareRes.isLoading
          ? Array(8)
              .fill("")
              .map((_, index) => (
                <Grid xs={6} md={4} lg={3} item key={index}>
                  <ProductCardLoading />
                </Grid>
              ))
          : svejiy.map((item) => (
              <Grid xs={6} md={4} lg={3} item key={item.id}>
                <ProductCard title={item.massa} caption={item.name} />
              </Grid>
            ))
        }
        {spareRes.isLoading
          ? Array(8)
              .fill("")
              .map((_, index) => (
                <Grid xs={6} md={4} lg={3} item key={index}>
                  <ProductCardLoading />
                </Grid>
              ))
          : xolodelnik.map((item) => (
              <Grid xs={6} md={4} lg={3} item key={item.id}>
                <ProductCard title={item.massa} caption={item.name} category="Xolodelnik" />
              </Grid>
            ))
        }
      </Grid>

      {!spareRes.isLoading ? <MyPieChart data={spareChartData} /> : null}
    </div>
  );
};

export default StoreHome;
