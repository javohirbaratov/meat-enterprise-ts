import { Box, Grid, MenuItem, Skeleton, TextField, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  useGetStoreExpenseCategoryQuery,
  useGetStoreExpenseQuery,
} from "../../../app/services/store/expense/storeExpense";
import MobileHeader from "../../../components/common/mobileHeader/MobileHeader";
import SearchInput from "../../../components/common/searchInput/SearchInput";
import MyDateRange from "../../../components/common/ui/myDateRange/MyDateRange";
import PageTitle from "../../../components/common/ui/typography/pageTitle/PageTitle";
import UserSaleList from "../../../components/common/userSaleList/UserSaleList";
import { IUserSaleListItem } from "../../../components/common/userSaleList/UserSaleListItem";
import { store_routes } from "../../../constants/path";
import useUserSearchList from "../../../hooks/useUserSearchList";
import { IDate } from "../../../types/api";

const StoreExpense: React.FC = () => {
  // State
  const [selectedDate, setSelectedDate] = useState<IDate>({
    start: "",
    end: "",
  });
  const [category, setCategory] = useState("0");
  const [search, setSearch] = useState<string>("");

  const [searchUser] = useUserSearchList();

  // API
  const { data, isLoading } = useGetStoreExpenseQuery({
    date: selectedDate,
    expenseCategory: category,
  });

  const expenseCategoryRes = useGetStoreExpenseCategoryQuery();

  const expenseCategoryOptions = useMemo(() => {
    if (expenseCategoryRes.data?.success) {
      return expenseCategoryRes.data?.data;
    }
    return [];
  }, [expenseCategoryRes]);
  const filterData = useMemo<IUserSaleListItem[]>(() => {
    if (data?.success === true) {
      if (data.data.list?.length) {
        return data.data.list.map((item) => ({
          key: item.id,
          name: item.javobgar,
          pnomer: item.turi,
          price: item.naqdsum,
          pricePrefix: "so'm",
          date: item.vaqt,
        }));
      }
    }
    return [];
  }, [data]);

  const list = useMemo<IUserSaleListItem[]>(() => {
    return searchUser(filterData, search);
  }, [filterData, search, searchUser]);

  return (
    <Box sx={{ pt: 4 }}>
      <MobileHeader title={`${list.length} ta`} to={store_routes.expenseAdd} />
      <PageTitle title="Xarajatlar" />

      {/* Date */}
      <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" gutterBottom>
              Jammi summa : {data?.data.jami}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Jamibank : {data?.data.jamibank}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Jamikarta : {data?.data.jamikarta}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Jaminaqd : {data?.data.jaminaqd}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <MyDateRange setValue={setSelectedDate} />
          </Grid>
      </Grid>
      <Box sx={{ m: "auto", my: 2 }}>
        
      </Box>

      <SearchInput value={search} setValue={setSearch} />

      <Box sx={{ m: "auto", my: 2 }}>
        {/* Expense category */}
        <Grid item xs={12} sm={6}>
          {expenseCategoryRes.isLoading ? (
            <Skeleton variant="rounded" height={40} />
          ) : (
            <TextField
              fullWidth
              size="small"
              select
              label="Kategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ m: 0 }}
            >
              <MenuItem value="0">--Tanlash--</MenuItem>
              {expenseCategoryOptions?.map((state) => (
                <MenuItem key={state.id} value={state.id}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        </Grid>
      </Box>

      <UserSaleList isLoading={isLoading} data={[...list]} />
    </Box>
  );
};

export default StoreExpense;
