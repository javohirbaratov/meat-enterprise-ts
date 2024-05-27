import React, {Dispatch} from "react";
import formatCommaNum from "../../../util/formatCommaNum";

import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import styles from "./orderCard.module.css";
import {
  IStoreOrderConfirmResProduct,
  IStoreOrderResProduct,
} from "../../../app/services/store/order/storeOrder";

interface InfoGetData {
  massa: string | number,
  dona: string,
  yashik: string
}

export interface IOrderCardProps {
  id: string;
  title: string;
  user: string;
  phone: string;
  volume?: number;
  volumeSumm?: number;
  comment?: string;
  malumot?: InfoGetData[],
  date: string;
  productList?: IStoreOrderResProduct[];
  confirmedProductList?: IStoreOrderConfirmResProduct[];
  setValue?: (val: string | number | null) => void;
  onPress?: Dispatch<string>;
}

const OrderCard: React.FC<IOrderCardProps> = ({
  id,
  title,
  user,
  phone,
  volume,
  volumeSumm,
  date,
  malumot,
  onPress,
}) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg="auto">
      <motion.div
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        <div
          className={[
            styles.orderCard,
            onPress ? styles.clickAction : "",
          ].join(" ")}
          onClick={() => (onPress ? onPress(id) : "")}
        >
          <div className={styles.orderCardBody}>
            <h3 className={styles.orderCardTitle}>
              {title.length > 20 ? `${title.substring(0, 21)}...` : title}
            </h3>
            <h3 className={styles.orderCardBodyTitle}>
              {volume ? (
                <>
                  {formatCommaNum.formatNumber(volume)} <small>kg</small>
                </>
              ) :volumeSumm? (
                <>
                  {formatCommaNum.formatNumber(volumeSumm)} <small>so'm</small>
                </>
              ):''}
            </h3>
          </div>
          <div className={styles.orderCardFooter}>
            <div>
              <p className={styles.orderCardCaptionTitle}>Massa: 
                {
                  malumot? (
                    " " + malumot[0].massa 
                  ) : (
                    <></>
                  )
                } 
              </p>
              <p className={styles.orderCardCaptionTitle}>
                Dona:
                {
                  malumot? (
                    " " + malumot[0].massa 
                  ) : (
                    <></>
                  )
                } 
              </p>
              <p className={styles.orderCardCaptionTitle}>
                Yashik:
                {
                  malumot? (
                    " " + malumot[0].yashik 
                  ) : (
                    <></>
                  )
                } 
              </p>
            </div>
            {/* <div className={styles.orderCardDate}>{date}</div> */}
          </div>
          <div className={styles.orderCardFooter}>
            <div>
              <p className={styles.orderCardCaptionTitle}>{user}</p>
              <p className={styles.orderCardCaptionPhone}>{phone}</p>
            </div>
            <div className={styles.orderCardDate}>{date}</div>
          </div>
          
        </div>
      </motion.div>
    </Grid>
  );
};

export default OrderCard;
