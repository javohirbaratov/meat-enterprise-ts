import { auth_api } from "../../../constants/api";
import { api } from "../api";

export interface IUser {
  rol: string;
  familya: string;
  ism: string;
  telefon: string;
  email: string;
  token: string;
  status: string;
}

export interface IUserResponse {
  data: IUser;
  message: string;
  success: boolean;
}

export interface ILogin {
  login: string;
  parol: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<IUserResponse, void>({
      query: () => auth_api.show,
    }),
    login: build.mutation<IUserResponse, ILogin>({
      query: (credentials: ILogin) => ({
        url: auth_api.login,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery } = authApi;

export const {
  endpoints: { login },
} = authApi;
