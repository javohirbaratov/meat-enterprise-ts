import { AppBar, Button, CssBaseline, useScrollTrigger } from "@mui/material";
import React from "react";
import styles from "./mobileHeader.module.css";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

type TMobileHeaderProps = {
  onCancel: () => void;
  cancelLabel?: string;
  onSave?: () => void;
  onSaveHidden?: boolean;
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

const MobileSaveHeader: React.FC<TMobileHeaderProps> = ({
  onCancel,
  cancelLabel = "Orqaga",
  onSave,
  onSaveHidden,
}) => {
  return (
    <ElevationScroll>
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: "#fff", px: 1 }}>
        <CssBaseline />
        <div className={styles.headerContent}>
          <div className={styles.headerContentItem}>
            <Button
              color="error"
              sx={{
                textAlign: "right",
                fontWeight: "bold",
                textTransform: "unset",
                fontSize: "16px",
              }}
              onClick={onCancel}
            >
              {cancelLabel}
            </Button>
          </div>
          <div className={styles.headerContentItem}>
            {!onSaveHidden ? (
              <Button
                sx={{
                  textAlign: "right",
                  color: "#5473FF",
                  fontWeight: "bold",
                  textTransform: "unset",
                  fontSize: "16px",
                }}
                type="submit"
                // onClick={onSave}
              >
                Saqlash
              </Button>
            ) : null}
          </div>
        </div>
      </AppBar>
    </ElevationScroll>
  );
};

export default MobileSaveHeader;
