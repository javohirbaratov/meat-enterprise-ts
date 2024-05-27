import React, { memo } from "react";
import styles from "./myCardList.module.css";
import { Skeleton } from "@mui/material";

export type TMyCardListItem = {
  label: string | number;
  value: string | number;
};

type TMyCardListProps = {
  list: TMyCardListItem[];
  rowCount?: number;
  isLoading?: boolean;
};

const MyCardList: React.FC<TMyCardListProps> = ({
  list,
  rowCount = 3,
  isLoading = false,
}) => {
  return (
    <div className={styles.card}>
      {isLoading ? (
        <ul className={styles.list}>
          {Array(rowCount)
            .fill("")
            .map((_, index) => (
              <li key={index}>
                <Skeleton width={"100%"} />
              </li>
            ))}
        </ul>
      ) : (
        <ul className={styles.list}>
          {list.map((item, index) => (
            <li key={index}>
              <span>{item.label}</span>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default memo(MyCardList);
