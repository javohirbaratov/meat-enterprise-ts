import React from "react";
import Router from "./Router";
import MainProvider from "./provider/MainProvider";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App: React.FC = () => {
  return (
    <MainProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router />
        <ToastContainer />
      </LocalizationProvider>
    </MainProvider>
  );
};

export default App;