import React from "react";

import { Grid, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import styles from "./orderCard.module.css";

const OrderCardLoading: React.FC = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        <div className={styles.orderCard}>
          <div className={styles.orderCardBody}>
            <Skeleton height={30} width={"60%"} />
            <Skeleton height={30} width={"20%"} />
          </div>
          <div className={styles.orderCardFooter}>
            <div style={{ width: "180px" }}>
              <p className={styles.orderCardCaptionTitle}>
                <Skeleton height={18} width={"90%"} />
              </p>
              <p className={styles.orderCardCaptionPhone}>
                <Skeleton height={18} width={"70%"} />
              </p>
            </div>
            <Skeleton height={20} width={80} />
          </div>
        </div>
      </motion.div>
    </Grid>
  );
};

export default OrderCardLoading;
