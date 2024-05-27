import { Grid } from "@mui/material";
import React, { memo } from "react";
import AddOrderProductCard, {
  IAddOrderProductCard,
  IAddOrderProductCardSetValue,
} from "./AddOrderProductCard";

interface IAddOrderProductCardWrapperProps {
  data: IAddOrderProductCard[];
  setValue: ({uuid, productId, val }: IAddOrderProductCardSetValue) => void;
}

const AddOrderProductCardWrapper: React.FC<
  IAddOrderProductCardWrapperProps
> = ({ data, setValue }) => {
  return (
    <Grid container spacing={1}>
      {data.map((item) => (
        <AddOrderProductCard {...item} key={item.uuid} setValue={setValue} />
      ))}
    </Grid>
  );
};

export default memo(AddOrderProductCardWrapper);
