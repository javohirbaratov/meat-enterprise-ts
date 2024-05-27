import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./bottomBar.module.css";

type TIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};

export type TBottomBarItem = {
  label: string;
  icon: TIcon;
  activeIcon: TIcon;
  key: string;
  customRoute?: string;
  onClick?: React.Dispatch<TBottomBarItem>;
};

export type BotttomBarProps = {
  list: TBottomBarItem[];
};

const BottomBar: React.FC<BotttomBarProps> = ({ list }) => {
  // location
  const { pathname } = useLocation();

  // Navigate
  const navigate = useNavigate();

  // Memo
  const activeVal = React.useMemo(() => {
    const res = list.findIndex(
      (item) => item.key === pathname || item.customRoute === pathname
    );
    return res;
  }, [list, pathname]);

  // Navigate
  const handleNavigate = (index: number) => {
    if (!list[index].onClick) navigate(list[index].key);
  };

  return (
    <div className={styles.bottomBarContent}>
      <Paper className={styles.bottomBarInner} elevation={3}>
        <BottomNavigation
          showLabels
          value={activeVal}
          onChange={(_, newValue: number) => handleNavigate(newValue)}
        >
          {list.map((item, index) => (
            <BottomNavigationAction
              centerRipple={true}
              className={styles.actionButton}
              label={item.label}
              icon={
                <div
                  className={[
                    styles.actionButtonIcon,
                    activeVal === index ? styles.activeIcon : "",
                  ].join(" ")}
                >
                  <Box
                    component={
                      activeVal === index ? item.activeIcon : item.icon
                    }
                    sx={{ fontSize: "22px" }}
                  />
                </div>
              }
              onClick={(e) => {
                if (item.onClick) item?.onClick(item);
              }}
              key={item.key}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default BottomBar;
