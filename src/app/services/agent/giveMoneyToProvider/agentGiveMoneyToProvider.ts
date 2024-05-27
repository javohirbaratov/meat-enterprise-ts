import { agent_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

export interface IAgentGiveToMoneyItem {
  taminotchi_id: string;
  massa: string;
  price: string;
  product_id: string;
}

interface IAgentGiveMoneyToProviderResItem extends IAgentGiveToMoneyItem {
  id: string;
  summa: string;
  naqdsum: string;
  naqdusd: string;
  valyuta: string;
  bank: string;
  karta: string;
  izoh: string;
  taminotchi: string;
  taminotchi_id: string;
  status: "checked" | "nochecked";
  vaqt: string;
}
interface IAgentPurchaseRes extends IApiRes {
  data: IAgentGiveMoneyToProviderResItem[];
}

export interface IAgentGiveMoneyToProviderAdd {
  taminotchi_id: string;
  naqdsum: string;
  izoh: string;
}

export interface IAgentGiveMoneyToProviderCheckSMS {
  taminotchi_id: string;
  code: string;
}

const AGENT_GIVE_MONEY_TAG = "AGENT_GIVE_MONEY";

export const agentGiveMoneyToProvider = api
  .enhanceEndpoints({ addTagTypes: [AGENT_GIVE_MONEY_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // Index
      getAgentGiveMoneyToProvider: build.query<IAgentPurchaseRes, void>({
        query: () => agent_api.give_money_to_provider_get,
        providesTags: [AGENT_GIVE_MONEY_TAG],
      }),
      // Add
      addAgentGiveMoneyToProvider: build.mutation<
        IApiRes,
        IAgentGiveMoneyToProviderAdd
      >({
        query: (body: IAgentGiveMoneyToProviderAdd) => ({
          url: agent_api.give_money_to_provider_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [AGENT_GIVE_MONEY_TAG],
      }),
      // check SMS
      addAgentGiveMoneyToProviderCheckSMS: build.mutation<
        IApiRes,
        IAgentGiveMoneyToProviderCheckSMS
      >({
        query: (body) => ({
          url: agent_api.give_money_to_provider_check_sms_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [AGENT_GIVE_MONEY_TAG],
      }),
    }),
  });

export const {
  useGetAgentGiveMoneyToProviderQuery,
  useAddAgentGiveMoneyToProviderMutation,
  useAddAgentGiveMoneyToProviderCheckSMSMutation,
} = agentGiveMoneyToProvider;
