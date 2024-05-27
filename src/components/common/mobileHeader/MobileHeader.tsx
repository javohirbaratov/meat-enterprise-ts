import { AppBar, Button, CssBaseline, useScrollTrigger } from "@mui/material";
import React from "react";
import styles from "./mobileHeader.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

type TMobileHeaderProps = {
  title: string | number | boolean;
  to?: string;
  toTitle?: string;
};

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 2 : 0,
  });
}

const MobileHeader: React.FC<TMobileHeaderProps> = ({ title, to, toTitle }) => {
  // Navigate
  const navigate = useNavigate();

  const onTo = (to: string) => navigate(to);

  return (
    <ElevationScroll>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{ bgcolor: "#fff", px: 1, py: 1 }}
      >
        <CssBaseline />
        <div className={styles.headerContent}>
          <div className={styles.headerContentItem}>
            {title && <h4 className={styles.headerContentTitle}>{title}</h4>}
          </div>
          <div className={styles.headerContentItem}>
            {
              to? (
                <Button
                  sx={{
                    textAlign: "right",
                    color: "#5473FF",
                    fontWeight: "bold",
                    textTransform: "unset",
                    fontSize: "16px",
                  }}
                  onClick={() => onTo(to)}
                >
                  {toTitle || "Qo'shish"}
                </Button>
              ) :(
                <></>
              )
            }
            
          </div>
        </div>
      </AppBar>
    </ElevationScroll>
  );
};

export default MobileHeader;
