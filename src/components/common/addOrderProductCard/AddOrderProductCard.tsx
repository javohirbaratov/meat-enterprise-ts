import React, { memo } from "react";

import { Grid } from "@mui/material";
import ProductCard, { IProductCardProps } from "../productCard/ProductCard";
import styles from "./addOrderProductCard.module.css";
import formatCommaNum from "../../../util/formatCommaNum";
import { error } from "console";

export interface IAddOrderProductCard extends IProductCardProps {
  uuid?:string;
  id: string;
  isSelected: boolean;
  article: string;
  title: number;
  isXolodelnik?: boolean
}

export type IAddOrderProductCardSetValue = { uuid:string, productId: string; val: boolean };

export interface IAddOrderProductCardProps extends IAddOrderProductCard {
  setValue: ({ productId, val }: IAddOrderProductCardSetValue) => void;
}

const AddOrderProductCard: React.FC<IAddOrderProductCardProps> = ({
  id,
  uuid,
  title,
  caption,
  isSelected,
  setValue,
}) => {
  if(!uuid){
    throw new Error('`uuid` is required.')
  }
 
  return (
    <Grid item xs={6} position={"relative"}>
      <label htmlFor={uuid}>
        <input
          id={uuid}
          type="checkbox"
          name={uuid}
          className={styles.addOrderInput}
          onChange={(e) => setValue({ uuid, productId: id, val: e.target.checked })}
        />
        <ProductCard
          title={formatCommaNum.formatNumber(title)}
          caption={caption}
          isSelected={isSelected}
        />
      </label>
    </Grid>
  );
};

export default memo(AddOrderProductCard);
