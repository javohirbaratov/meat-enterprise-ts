import { Button } from "@mui/material";
import React, { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import UserListItem, { IUserListItem, IUserListItemEdit } from "./UserListItem";
import UserListItemLoading from "./UserListItemLoading";
import styles from "./userList.module.css";

import { AnimatePresence, motion } from "framer-motion";

type TUserListProps = {
  data: IUserListItem[];
  showMoreUrl?: string;
  isLoading: boolean;
  setEdit?: ({ editId }: IUserListItemEdit) => void;
  onPress?: Dispatch<string>;
};

const UserList: React.FC<TUserListProps> = ({
  data,
  showMoreUrl = "",
  isLoading,
  setEdit,
  onPress,
}) => {
  // Navigate
  const navigate = useNavigate();

  // Handle navigate
  const handleNavigate = (to: string) => navigate(to);

  return (
    <motion.div layout className={styles.userList}>
      {isLoading
        ? new Array(21)
            .fill("")
            .map((_, index) => <UserListItemLoading key={index} />)
        : data.map((item) => (
            <AnimatePresence key={item.key}>
              <UserListItem
                {...item}
                key={item.key}
                setEdit={setEdit}
                onPress={onPress}
              />
            </AnimatePresence>
          ))}
      {showMoreUrl !== "" ? (
        <Button onClick={() => handleNavigate(showMoreUrl)}>
          Hammsini ko'rish
        </Button>
      ) : null}
    </motion.div>
  );
};

export default UserList;
