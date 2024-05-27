import { Alert } from "@mui/material";
import React, { useEffect, useState } from "react";

type TStatus = "warning" | "success" | "error" | "info" | null;
type TMyAlertProps = {
  status: TStatus;
  children: React.ReactNode;
  isErrNetwork: boolean;
};

const MyAlert: React.FC<TMyAlertProps> = ({ status, children, isErrNetwork }) => {
  const [severity, setSeverity] = useState<TStatus>(null);

  useEffect(() => {
    if (status) setSeverity(status);
  }, [status]);

  if(isErrNetwork){
    return <Alert severity="warning">Ulanishda xatolik!</Alert>
  }
  
  return severity && children ? (
    <Alert severity={severity}>{children}</Alert>
  ) : null;
};

export default MyAlert;
