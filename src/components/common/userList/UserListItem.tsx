import { MoreVert, Schedule } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import React, { Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import UnknownImage from "../../../assets/images/unknown.png";
import styles from "./userList.module.css";

import { motion } from "framer-motion";

export interface IUserListItem {
  key: string;
  to?: string;
  name: string;
  phone: string;
  date?: string | null;
  editId?: string;
  qancha_kun_qoldi?: number;
  company?: string;
}

export interface IUserListItemEdit {
  editId: string | null;
}

interface IUserListItemProps extends IUserListItem {
  setEdit?: ({ editId }: IUserListItemEdit) => void;
  onPress?: Dispatch<string>;
}

const ITEM_HEIGHT = 48;

const options = [
  {
    label: "Tahrirlash",
    value: "edit",
  },
];

const UserListItem: React.FC<IUserListItemProps> = ({
  to,
  name,
  phone,
  date,
  company,
  editId,
  setEdit,
  onPress,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Navigate
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (val: string | null, id: string | null) => {
    setAnchorEl(null);
    if (!val) return;

    if (setEdit) setEdit({ editId: id });
  };

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
      <div
        className={[
          styles.userListItem,
          onPress || to ? styles.clickAction : "",
        ].join(" ")}
        onClick={() => (onPress ? onPress(editId || "") : null)}
      >
        <div className={styles.userListItemImage}>
          <img src={UnknownImage} alt="Profile" />
        </div>
        <div className={styles.userListItemBody}>
          <h3 className={styles.listTitle}>{name}</h3>
          <p className={styles.listCaption}>{phone}</p>
        </div>
        <div className={styles.userListItemEnd}>
          {company ? <div className={styles.dateBody}>{company}</div> : null}
          {date ? (
            <div className={styles.date}>
              <div className={styles.dateBody}>
                <Schedule sx={{ fontSize: "14px" }} />
                <span>{date}</span>
              </div>
            </div>
          ) : null}

          {setEdit ? (
            <>
              <IconButton aria-label="edit" size="small" onClick={handleClick}>
                <MoreVert />
              </IconButton>
              <Menu
                onClick={(e) => e.stopPropagation()}
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose(null, null)}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {options.map((option) => (
                  <Button
                    LinkComponent={MenuItem}
                    key={option.value}
                    onClick={() => handleClose(option.value, editId || null)}
                    fullWidth
                    variant="contained"
                  >
                    {option.label}
                  </Button>
                ))}
              </Menu>
            </>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default UserListItem;
