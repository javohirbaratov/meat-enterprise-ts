import { admin_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

const ADMIN_USERS_TAG = "ADMIN_USERS";

// get gived money
interface IAdminGivingMoneyToAgentItem {
  id: string;
  xaridchi: string;
  pul_beruvchi: string;
  naqdsum: string;
  oldin: string;
  keyin: string;
  sana: string;
  holat: string;
}
interface IAdminGivingMoneyToAgentRes extends IApiRes {
  data: IAdminGivingMoneyToAgentItem[];
}

// get balance
export interface IAdminAgentBalanceItem {
  id: string;
  xaridchi: string;
  balans: string;
}

interface IAdminAgentBalanceRes extends IApiRes {
  data: IAdminAgentBalanceItem[];
}

// Add
export interface IAdminGivingMoneyToAgentAdd {
  zakup_id: number | string;
  summa: number | string;
  izoh: string;
}

// Get money Add
export interface IAdminGetMoneyFromAgentAdd {
  zakup_id: number | string;
  summa: number | string;
  izoh: string;
}

export const adminGivingMoneyToAgentApi = api
  .enhanceEndpoints({
    addTagTypes: [ADMIN_USERS_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getAdminGivingMoneyToAgent: build.query<
        IAdminGivingMoneyToAgentRes,
        void
      >({
        query: () => admin_api.giving_money_to_agent_get,
        providesTags: [ADMIN_USERS_TAG],
      }),
      // balance index
      getAdminAgentBalance: build.query<IAdminAgentBalanceRes, void>({
        query: () => admin_api.agent_balance_get,
        providesTags: [ADMIN_USERS_TAG],
      }),
      // add
      addAdminGivingMoneyToAgent: build.mutation<
        IApiRes,
        IAdminGivingMoneyToAgentAdd
      >({
        query: (body) => ({
          url: admin_api.giving_money_to_agent_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [ADMIN_USERS_TAG],
      }),
      // add get money
      addAdminGetMoneyFromAgent: build.mutation<
        IApiRes,
        IAdminGetMoneyFromAgentAdd
      >({
        query: (body) => ({
          url: admin_api.get_money_from_agent_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [ADMIN_USERS_TAG],
      }),
    }),
  });

export const {
  useGetAdminGivingMoneyToAgentQuery,
  useGetAdminAgentBalanceQuery,
  useAddAdminGivingMoneyToAgentMutation,
  useAddAdminGetMoneyFromAgentMutation,
} = adminGivingMoneyToAgentApi;
