import {
  AccountCircle,
  Logout,
  Menu as MenuIcon,
  Notifications,
  Settings,
} from "@mui/icons-material";
import {
  Badge,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";

interface IMyAppBar {
  toggleDrawer: () => void;
  open: boolean;
  title: string;
}

const MyAppBar: React.FC<IMyAppBar> = ({ toggleDrawer, open, title }) => {
  // State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openDropdown = Boolean(anchorEl);

  // Dispatch
  const dispatch = useDispatch();

  // handle logout
  const handleLogout = () => dispatch(logout());

  // Dropdown
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (val: string | null) => {
    if (val === "logout") {
      handleLogout();
    }

    setAnchorEl(null);
  };

  return (
    <Toolbar
      sx={{
        pr: "24px", // keep right padding when drawer closed
      }}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: "36px",
          ...(open && { display: "none" }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        {title}
      </Typography>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <Notifications />
        </Badge>
      </IconButton>
      <IconButton
        color="inherit"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openDropdown}
        onClose={() => handleClose(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("logout")}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Chiqish
        </MenuItem>
        <MenuItem onClick={() => handleClose("settings")}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          Sozlamalar
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

export default MyAppBar;
