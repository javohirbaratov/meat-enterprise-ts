import React from "react";
import styles from "./moneyCard.module.css";
import CoinImage from "../../../assets/images/coin-bg-image.png";
import { Skeleton, Stack } from "@mui/material";

type MoneyCardTitle = {
  title: string|number;
  caption?: string;
  prefix?: string;
  isLoading?: boolean;
};

const MoneyCard: React.FC<MoneyCardTitle> = ({
  title,
  caption,
  prefix = "so'm",
  isLoading,
}) => {
  return (
    <div className={styles.moneyCard}>
      <h2 className={styles.moneyCardTitle}>
        {isLoading ? (
          <Stack direction={"row"} gap={1} alignItems={"end"}>
            <Skeleton variant="text" width={140} height={40} />
            <Skeleton variant="text" width={32} height={20} />
          </Stack>
        ) : (
          <>
            {title} <span className={styles.prefix}>{prefix}</span>
          </>
        )}
      </h2>

      {caption ? <h4 className={styles.caption}>{caption}</h4> : null}

      <div className={styles.moneyCardBg}></div>
      <img className={styles.moneyCardImage} src={CoinImage} alt="Coin" />
    </div>
  );
};

export default MoneyCard;
