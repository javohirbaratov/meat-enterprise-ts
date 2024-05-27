import { agent_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

export interface IAgentPurchase {
  taminotchi_id: string;
  massa: string;
  price: string;
  product_id: string;
}

interface IAgentPurchaseResItem extends IAgentPurchase {
  id: string;
  taminotchi: string;
  partiyanomer: string;
  sana: string;
  summa: string;
  status: string;
}
interface IAgentPurchaseRes extends IApiRes {
  data: {
    krim_list: IAgentPurchaseResItem[];
    jamisumma: number | string;
    jamimassa: number | string;
  };
}

interface IAgentPurchaseAdd extends IAgentPurchase {}

interface IAgentPurchaseAddRes extends IApiRes {
  data: IAgentPurchase[];
}

const AGENT_PURCHASE_TAG = "AGENT_PURCHASE_TAG";

export const agentPurchaseApi = api
  .enhanceEndpoints({ addTagTypes: [AGENT_PURCHASE_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // Index
      getAgentPurchase: build.query<IAgentPurchaseRes, void>({
        query: () => agent_api.purchase_get,
        providesTags: [AGENT_PURCHASE_TAG],
      }),
      // Add
      addAgentPurchase: build.mutation<IAgentPurchaseAddRes, IAgentPurchaseAdd>(
        {
          query: (body: IAgentPurchaseAdd) => ({
            url: agent_api.purchase_add,
            method: "POST",
            body,
          }),
          invalidatesTags: [AGENT_PURCHASE_TAG],
        }
      ),
    }),
  });

export const { useGetAgentPurchaseQuery, useAddAgentPurchaseMutation } =
  agentPurchaseApi;
