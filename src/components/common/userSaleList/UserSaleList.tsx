import React from "react";
import styles from "./userSaleList.module.css";

import { AnimatePresence, motion } from "framer-motion";
import UserSaleListItem, { IUserSaleListItem } from "./UserSaleListItem";
import UserSaleListItemLoading from "./UserSaleListItemLoading";

type TUserSaleListProps = {
  data: IUserSaleListItem[];
  isLoading: boolean;
};

const UserSaleList: React.FC<TUserSaleListProps> = ({ data, isLoading }) => {
  return (
    <motion.div layout className={styles.userList}>
      {isLoading
        ? new Array(21)
            .fill("")
            .map((_, index) => <UserSaleListItemLoading key={index} />)
        : data.map((item) => (
            <AnimatePresence key={item.key}>
              <UserSaleListItem {...item} />
            </AnimatePresence>
          ))}
    </motion.div>
  );
};

export default UserSaleList;
