import React from "react";
import styles from "./productCard.module.css";
import { Skeleton } from "@mui/material";

const ProductCardLoading: React.FC = () => {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCardBody}>
        <Skeleton variant="text" height={40} width={'90%'} />

        <Skeleton variant="text" height={25} width={'60%'} />
      </div>
      <div>
        <Skeleton variant="rounded" height={30} width={30} />
      </div>
    </div>
  );
};

export default ProductCardLoading;
