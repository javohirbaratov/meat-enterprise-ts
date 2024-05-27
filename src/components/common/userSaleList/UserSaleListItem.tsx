import React from "react";
import { useNavigate } from "react-router-dom";
import UnknownImage from "../../../assets/images/unknown.png";

import { Schedule } from "@mui/icons-material";
import { motion } from "framer-motion";

import styles from "./userSaleList.module.css";
import formatCommaNum from "../../../util/formatCommaNum";

export interface IUserSaleListItem {
  key: string;
  name: string;
  pnomer: string; //partiya nomer
  price: string;
  pricePrefix?: "so'm";
  date: string;
}

interface IUserSalesListItemProps extends IUserSaleListItem {
  to?: string;
}

const UserSaleListItem: React.FC<IUserSalesListItemProps> = ({
  name,
  pnomer,
  price,
  pricePrefix = "so'm",
  date,
  to,
}) => {
  // Navigate
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className={styles.userListItemBtn}
      onClick={() => (to ? navigate(to) : null)}
    >
      <div className={styles.userListItem}>
        <div className={styles.userListItemImage}>
          <img src={UnknownImage} alt="Profile" />
        </div>
        <div className={styles.userListItemBody}>
          <h3 className={styles.listTitle}>{name}</h3>
          <p className={styles.listCaption}>{pnomer}</p>
        </div>
        <div className={styles.userSaleListItemEnd}>
          <div className={styles.price}>
            <h4 className={styles.priceTitle}>
              {!isNaN(Number(price))
                ? formatCommaNum.formatNumber(price)
                : price}
            </h4>
            <span className={styles.pricePrefix}>{pricePrefix}</span>
          </div>
          <div className={styles.dateBody}>
            <Schedule sx={{ fontSize: "14px" }} />
            <p>{date}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserSaleListItem;
