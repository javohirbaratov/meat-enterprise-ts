import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import React, { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";

export type TMobileDrawerListItem = {
  icon: React.ReactNode;
  label: string;
  to: string;
};

type TMobileDrawer = {
  open: boolean;
  onClose: Dispatch<null>;
  onOpen: Dispatch<null>;
  list: TMobileDrawerListItem[];
};

const MobileDrawer: React.FC<TMobileDrawer> = ({
  open,
  onClose,
  onOpen,
  list,
}) => {
  // Navigate
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // handle logout
  const handleLogout = () => dispatch(logout());

  const handleNavigate = (to: string) => {
    navigate(to);
    onClose(null)
  };

  return (
    <SwipeableDrawer
      anchor={"left"}
      open={open}
      onClose={() => onClose(null)}
      onOpen={() => onOpen(null)}
      PaperProps={{
        sx: { width: "80vw", display:'flex', flexDirection:'column' },
      }}
      sx={{ zIndex: 10000 }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          {list.map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton onClick={() => handleNavigate(item.to)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>

      <Box sx={{flexGrow:1}} /> 

      <Button sx={{mb:4, p: 2, display: "-webkit-inline-box",WebkitBoxPack: "inherit"}} color="error" onClick={handleLogout}>Chiqish</Button>
    </SwipeableDrawer>
  );
};

export default MobileDrawer;
