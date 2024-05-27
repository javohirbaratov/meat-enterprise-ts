import React, { Dispatch, useEffect } from "react";
import { useGetUserQuery } from "../app/services/auth/auth";

type TAuthProviderProps = {
  setLoading: Dispatch<boolean>;
  children: React.ReactNode;
};

const AuthProvider: React.FC<TAuthProviderProps> = ({
  setLoading,
  children,
}) => {
  const { isLoading } = useGetUserQuery();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return <div>{children}</div>;
};

export default AuthProvider;
