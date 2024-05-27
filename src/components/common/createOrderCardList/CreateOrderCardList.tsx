import React, { Dispatch } from "react";
import CreateOrderCard, { ICreateOrderCard } from "./CreateOrderCard";

import { CircularProgress, Grid, Stack } from "@mui/material";
import { motion } from "framer-motion";

export interface ICreateOrderCardListProps {
  data: ICreateOrderCard[];
  isLoading?: boolean;
  onPress?: Dispatch<string>;
}

const CreateOrderCardList: React.FC<ICreateOrderCardListProps> = ({
  data,
  isLoading = false,
  onPress
}) => {
  return (
    <motion.div layout>
      {isLoading ? (
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          minHeight={300}
          justifyContent={"center"}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Grid container rowSpacing={1.2} columnSpacing={3}>
          {data.map((item) => (
            <CreateOrderCard {...item} key={item.id} onPress={onPress} />
          ))}
        </Grid>
      )}
    </motion.div>
  );
};

export default CreateOrderCardList;
