import { Chip, Grid } from "@mui/material";
import React, { Dispatch } from "react";

import { motion } from "framer-motion";

import { ShoppingBasket } from "@mui/icons-material";
import styles from "./createOrderCard.module.css";
import formatCommaNum from "../../../util/formatCommaNum";
import { ISalesOrderItemProduct } from "../../../app/services/sales/order/salesOrder";

export type TStatusColor = "success" | "error" | "warning" | "default";

export interface ICreateOrderCard {
  id: string;
  user: string;
  phone: string;
  statusLabel: string;
  volume?: number;
  volumeSumm?: number;
  statusColor?: TStatusColor;
  productName: string;
  productList?: ISalesOrderItemProduct[];
  onPress?: Dispatch<string>;
  isNavigate?: boolean;
  saler?: string;
  izoh?: string;
}

const CreateOrderCard: React.FC<ICreateOrderCard> = ({
  id,
  user,
  phone,
  statusLabel,
  statusColor = "default",
  volume,
  volumeSumm,
  productName,
  onPress,
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        <div
          className={[
            styles.createOrderCard,
            onPress ? styles.clickAction : "",
          ].join(" ")}
          onClick={() => (onPress ? onPress(id) : null)}
        >
          <div className={styles.createOrderCardIcon}>
            <ShoppingBasket />
          </div>
          <div className={styles.createOrderCardContent}>
            <div className={styles.createOrderCardBody}>
              <h3 className={styles.createOrderCardBodyUser}>{user}</h3>
              <div className={styles.createOrderCardVolume}>
                {volume ? (
                  <>
                    <h3 className={styles.createOrderCardVolumeTitle}>
                      {formatCommaNum.formatNumber(volume)}
                    </h3>
                    <small>kg</small>
                  </>
                ) : volumeSumm ? (
                  <>
                    <h3 className={styles.createOrderCardVolumeTitle}>
                      {formatCommaNum.formatNumber(volumeSumm)}
                    </h3>
                    <small>so'm</small>
                  </>
                ) : null}
              </div>
            </div>
            <div className={styles.createOrderCardFooter}>
              <div className={styles.createOrderCardPhone}>{phone}</div>
              <Chip label={statusLabel} size="small" color={statusColor} />
              <b className={styles.createOrderCardCaption}>
                {productName.substring(0, 16)}
              </b>
            </div>
          </div>
        </div>
      </motion.div>
    </Grid>
  );
};

export default CreateOrderCard;
