import { agent_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

// Balance
interface IAgentBalance {
  balans: number;
  massa: number;
}

interface IAgentBalanceRes extends IApiRes {
  data: IAgentBalance;
}

// Prodcts
interface IAgentBalanceProductsResItem {
  product_id: string;
  product_name: string;
  massa: number;
  foiz: number;
}

interface IAgentBalanceProductsRes extends IApiRes {
  data: IAgentBalanceProductsResItem[];
}

export const agentBalanceApi = api.injectEndpoints({
  endpoints: (build) => ({
    // index
    getAgentBalance: build.query<IAgentBalanceRes, void>({
      query: () => agent_api.balance_get,
    }),
    // products index
    getAgentProducts: build.query<IAgentBalanceProductsRes, void>({
      query: () => agent_api.balance_products_get,
    }),
  }),
});

export const { useGetAgentBalanceQuery, useGetAgentProductsQuery } =
  agentBalanceApi;
