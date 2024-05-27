import { Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";

const UserSaleListItemLoading: React.FC = () => {
  return (
    <Grid container columnSpacing={1}>
      <Grid alignContent={'space-between'}>
        <Skeleton variant="circular" width={42} height={42} />
      </Grid>
      <Grid flexGrow={1}>
        <Skeleton variant="text" width={200} height={20} />
        <Skeleton variant="text" width={100} height={15} />
      </Grid>
      <Grid display={"flex"} alignItems={"flex-end"}>
        <Skeleton variant="text" width={30} height={20} />
      </Grid>
    </Grid>
  );
};

export default UserSaleListItemLoading;
