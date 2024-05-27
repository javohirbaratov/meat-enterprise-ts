import { admin_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

const ADMIN_USERS_TAG = "ADMIN_USERS";

interface IAdminUser {
  id: string;
  login: string;
  parol: string;
  rol: string;
  familya: string;
  ism: string;
  rasm: string;
  telefon: string;
  email: string;
  tashkilot_id: string;
  dukon_id: string;
  token: string;
  tokentime: string;
  status: string;
}

interface IAdminUserRes extends IApiRes {
  data: IAdminUser[];
}

// Add
interface IAdminUserAdd {
  login: string;
  parol: string;
  rol: string;
  telefon: string;
  familya: string;
  ism: string;
}

export const adminUsersApi = api
  .enhanceEndpoints({
    addTagTypes: [ADMIN_USERS_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getAdminUser: build.query<IAdminUserRes, void>({
        query: () => admin_api.users_get,
        providesTags: [ADMIN_USERS_TAG],
      }),
      // put
      updateAdminUser: build.mutation<IApiRes, IAdminUserAdd>({
        query: (body) => ({
          url: admin_api.users_update,
          method: "PUT",
          body,
        }),
        invalidatesTags: [ADMIN_USERS_TAG],
      }),
      // add
      addAdminUser: build.mutation<IApiRes, IAdminUserAdd>({
        query: (body) => ({
          url: admin_api.users_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [ADMIN_USERS_TAG],
      }),
    }),
  });

export const {
  useGetAdminUserQuery,
  useUpdateAdminUserMutation,
  useAddAdminUserMutation,
} = adminUsersApi;
