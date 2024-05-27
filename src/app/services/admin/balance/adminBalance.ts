import { admin_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

const ADMIN_BALANCE_TAG = "ADMIN_BALANCE";

// Balance
interface IAdminBalance {
  naqdsum: string;
  naqdusd: string;
  bank: string;
  karta: string;
}

interface IAdminBalanceRes extends IApiRes {
  data: IAdminBalance;
}

export const adminBalanceApi = api
  .enhanceEndpoints({
    addTagTypes: [ADMIN_BALANCE_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getAdminBalance: build.query<IAdminBalanceRes, void>({
        query: () => admin_api.balance_get,
        providesTags: [ADMIN_BALANCE_TAG],
      }),
    }),
  });

export const { useGetAdminBalanceQuery } = adminBalanceApi;
