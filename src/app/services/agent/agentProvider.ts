import { agent_api } from "../../../constants/api";
import { IApiRes } from "../../../types/api";
import { api } from "../api";

export interface IAgentProvider {
  fio: string;
  korxona: string;
  balans: string;
  telefon: string;
  manzil: string | null;
  lokatsiya: string | null;
  latitude: string | null;
  registertime: string | null;
  viloyat: string | null;
  tuman: string | null;
  viloyat_id: string | null;
  davriylik: string | null;
  qancha_kun_qoldi: number;
  qancha_kun_oldin: string;
}
export interface IAgentProviderAdd {
  fio: string;
  telefon: string;
  telefon2: string;
  telefon3: string;
  korxona: string;
  manzil: string;
  lokatsiya?: string;
  latitude?: string;
  longitude?: string;
  viloyat_id: string;
  tuman_id: string;
  davriylik: number;
}

interface IAgentProviderListResItem extends IAgentProvider {
  id: string;
}

interface IAgentProviderItemRes extends IApiRes {
  data: IAgentProviderListResItem
}

interface IAgentProviderListRes extends IApiRes {
  data: IAgentProviderListResItem[]; 
}

interface IAgentProviderAddRes {
  message: string;
  success: boolean;
}

interface IAgentProviderAddBody {
  providerId: string;
  body: IAgentProvider;
}

const AGENT_REGION_TAG = "AGENT_REGION";

export const agentProviderApi = api
  .enhanceEndpoints({ addTagTypes: [AGENT_REGION_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // Index
      getAgentProvider: build.query<IAgentProviderListRes, void>({
        query: () => agent_api.provider_get,
        providesTags: [AGENT_REGION_TAG],
      }),
      // Show
      getAgentProviderGetById: build.query<IAgentProviderItemRes, string>({
        query: (providerId) => agent_api.provider_get_by_id(providerId),
        providesTags: [AGENT_REGION_TAG],
      }),
      // Add
      addAgentProvider: build.mutation<IAgentProviderAddRes, IAgentProviderAdd>(
        {
          query: (body: IAgentProviderAdd) => ({
            url: agent_api.provider_add,
            method: "POST",
            body,
          }),
          invalidatesTags: [AGENT_REGION_TAG],
        }
      ),
      // Put
      putAgentProvider: build.mutation<
        IAgentProviderAddRes,
        IAgentProviderAddBody
      >({
        query: ({ providerId, body }: IAgentProviderAddBody) => ({
          url: agent_api.provider_put(providerId),
          method: "PUT",
          body,
        }),
        invalidatesTags: [AGENT_REGION_TAG],
      }),
    }),
  });

export const {
  useGetAgentProviderQuery,
  useGetAgentProviderGetByIdQuery,
  useAddAgentProviderMutation,
  usePutAgentProviderMutation,
} = agentProviderApi;
