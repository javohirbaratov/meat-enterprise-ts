import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useGetStoreCashierBalanceQuery } from '../../../app/services/store/cashier/storeCashier';
import { TStoreReceptionParam } from '../../../app/services/store/reception/storeReception';
import MyDateRange from '../../../components/common/ui/myDateRange/MyDateRange';
import styles from "./adminCard.module.css";

const AdminBalance:React.FC = () => {
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
      <Box sx={{ m: "auto", my: 2 }}>
        <MyDateRange setValue={setSelectedDate} />
      </Box>

      <Grid container spacing={2}>
        {cardsData.map((item) => (

          <Grid item xs={12} sm={6} md={3} key={item.id}>
            <Card className={styles.card}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {
                    item.label
                  }
                </Typography>
                <Typography variant="body1">{item.values}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

    </>
  )
}

export default AdminBalance