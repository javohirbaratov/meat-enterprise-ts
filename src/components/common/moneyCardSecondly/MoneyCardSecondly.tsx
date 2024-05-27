import React from "react";
import styles from "./moneyCardSecondlt.module.css";
import formatCommaNum from "../../../util/formatCommaNum";

interface IMoneyCardSecondly {
  title: number;
}

const MoneyCardSecondly: React.FC<IMoneyCardSecondly> = ({ title }) => {
  return (
    <div className={styles.card}>
      <h1 className={styles.cardTitle}>
        {formatCommaNum.formatNumber(title)}
        <small>so'm</small>
      </h1>
      <p className={styles.cardCaption}>Yukning umumiy qiymati</p>
    </div>
  );
};

export default MoneyCardSecondly;
