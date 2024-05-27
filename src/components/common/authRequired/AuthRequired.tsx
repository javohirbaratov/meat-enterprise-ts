import React from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../../app/store";
import { auth_routes } from "../../../constants/path";
import {
  selectedCurrentRole,
  selectedIsAuthenticated,
} from "../../../features/auth/authSlice";
import MainOutlet from "../../reactRouterDom/MainOutlet";

type TAuthRequiredProps = {
  allowRoles: string[];
};

const AuthRequired: React.FC<TAuthRequiredProps> = ({ allowRoles }) => {
  /* User Data */
  const isAuthenticated = useTypedSelector(selectedIsAuthenticated);
  const currentRole = useTypedSelector(selectedCurrentRole);

  return isAuthenticated && allowRoles.includes(currentRole) ? (
    <MainOutlet />
  ) : (
    <Navigate to={auth_routes.login} replace={true} />
  );
};

export default AuthRequired;
