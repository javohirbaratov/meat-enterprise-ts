import {
  AccountBalanceWallet,
  AssuredWorkload,
  AttachMoney,
  CreditCard,
  DataSaverOff,
  DonutSmall,
  DoorFront,
  LocalAtm,
  ShowChart,
} from "@mui/icons-material";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useGetAdminReportsBenifitQuery } from "../../../app/services/admin/benifit/adminBenifit";
import { IDate } from "../../../types/api";
import formatCommaNum from "../../../util/formatCommaNum";
import MyDateRange from "../ui/myDateRange/MyDateRange";
import styles from "./dashboardCard.module.css";

const DashboardCards: React.FC = () => {
  // State
  const [selectedDate, setSelectedDate] = useState<IDate>({
    start: null,
    end: null,
  });

  // Api
  const benifitRes = useGetAdminReportsBenifitQuery({
    date: selectedDate,
  });

  const data = useMemo(() => {
    if (benifitRes.data?.success) {
      return {
        jami_krim_massa: {
          value: formatCommaNum.formatNumber(
            benifitRes.data?.data.jami_krim_massa
          ),
          icon: <AccountBalanceWallet fontSize={"large"} />,
          name: "Jami kirim massa",
        },
        jami_krim_summa: {
          value: formatCommaNum.formatNumber(
            benifitRes.data?.data.jami_krim_summa
          ),
          icon: <CreditCard fontSize={"large"} />,
          name: "Jami kirim summa",
        },
        jami_dona: {
          value: formatCommaNum.formatNumber(benifitRes.data?.data.jami_dona),
          icon: <DataSaverOff fontSize={"large"} />,
          name: "Jami dona",
        },
        xolodelnik_massa: {
          value: formatCommaNum.formatNumber(
            benifitRes.data?.data.xolodelnik_massa
          ),
          icon: <DoorFront fontSize={"large"} />,
          name: "Xolodelnik massa",
        },
        jami_sotuv_summa: {
          value: formatCommaNum.formatNumber(
            benifitRes.data?.data.jami_sotuv_summa
          ),
          icon: <DonutSmall fontSize={"large"} />,
          name: "Jami sotuv massa",
        },
        xolodelnik_summa: {
          value: formatCommaNum.formatNumber(
            benifitRes.data?.data.xolodelnik_summa
          ),
          icon: <AttachMoney fontSize={"large"} />,
          name: "Xolodelnik summa",
        },
        foiz: {
          value: formatCommaNum.formatNumber(benifitRes.data?.data.foiz),
          icon: <ShowChart fontSize={"large"} />,
          name: "Foiz",
        },
        qassob_harajat: {
          value: formatCommaNum.formatNumber(
            benifitRes.data?.data.qassob_harajat
          ),
          icon: <AccountBalanceWallet fontSize={"large"} />,
          name: "Qassob harajat",
        },
        jami_harajat: {
          value: formatCommaNum.formatNumber(
            benifitRes.data?.data.jami_harajat
          ),
          icon: <LocalAtm fontSize={"large"} />,
          name: "Jami harajat",
        },
        bugungi_foyda: {
          value: formatCommaNum.formatNumber(
            benifitRes.data?.data.bugungi_foyda
          ),
          icon: <AssuredWorkload fontSize={"large"} />,
          name: "Foyda",
        },
      };
    }
    return { jami_krim_mass: 0 };
  }, [benifitRes.data]);

  return (
    <>
      {/* Date */}
      <Box sx={{ m: "auto", my: 2 }}>
        <MyDateRange setValue={setSelectedDate} />
      </Box>
      <Grid container spacing={2}>
        {Object.entries(data).map(([key, { value, icon, name }]) => (
          <Grid item xs={12} sm={6} md={3} key={key}>
            <Card className={styles.card}>
              <div className={styles.icon}>{icon}</div>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {name}
                </Typography>
                <Typography variant="body1">{value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default DashboardCards;
