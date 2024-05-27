import { Stack } from "@mui/material";
import React from "react";
import styles from "./addOrderFinish.module.css"


const AddOrderFinish: React.FC = () => {
  return (
    <Stack alignItems={'center'} justifyContent={'center'} height={'100%'}>
      <div className={styles.checkedIcon}>
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="60" cy="60" r="60" fill="#3BBE92" />
          <g clipPath="url(#clip0_139_5829)">
            <path
              d="M48.75 75.6374L33.1125 59.9999L27.7875 65.2874L48.75 86.2499L93.75 41.2499L88.4625 35.9624L48.75 75.6374Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_139_5829">
              <rect
                width="90"
                height="90"
                fill="white"
                transform="translate(15 15)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>

      <h2 className={styles.finishTitle}>Muvaffaqqiyatli</h2>
      <h2 className={styles.finishCaption}>Buyurtma muvaffaqiyatli <br /> amalgan oshirildi.</h2>
    </Stack>
  );
};

export default AddOrderFinish;
