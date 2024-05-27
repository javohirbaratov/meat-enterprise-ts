import { Grid } from "@mui/material";
import React, { memo, Dispatch } from "react";
import OrderCard, { IOrderCardProps } from "./OrderCard";

import { AnimatePresence, motion } from "framer-motion";
import EmptyBox from "../emptyBox/EmptyBox";
import OrderCardLoading from "./OrderCardLoading";

export interface IOrderCardListItemProps extends IOrderCardProps {}

export interface IOrderCardListProps {
  data: IOrderCardListItemProps[];
  isLoading: boolean;
  setValue?: (val: string | number | null) => void;
  onPress?: Dispatch<string>;
}

const OrderCardList: React.FC<IOrderCardListProps> = ({
  data,
  isLoading,
  setValue,
  onPress
}) => { 
  
  return (
    <motion.div layout>
      <Grid container spacing={1}>
        {isLoading ? (
          Array(11)
            .fill("")
            .map((_, index) => <OrderCardLoading key={index} />)
        ) : !data.length ? (
          <motion.div layout style={{ width: "100%" }}>
            <EmptyBox />
          </motion.div>
        ) : (
          data.map((item) => (
            <AnimatePresence key={item.id}>
              <OrderCard {...item} setValue={setValue} onPress={onPress}/>
            </AnimatePresence>
          ))
        )}
      </Grid>
    </motion.div>
  );
};

export default memo(OrderCardList);
