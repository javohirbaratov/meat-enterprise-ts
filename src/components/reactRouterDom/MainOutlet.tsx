import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import PageLoader from "../page/loader/PageLoader";

const MainOutlet: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
};

export default MainOutlet;
