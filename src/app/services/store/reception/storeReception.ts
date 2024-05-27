import { store_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

export interface TStoreReceptionParam {
  start: string | null;
  end: string | null;
}

type TDataVolume = {
  yashik: number | string;
  dona: number | string;
  massa: number | string;
};

export interface IStoreReceptionAdd {
  taminotchi_id: string | number;
  product_id: string | number;
  qassob_id: string | number;
  dona: string | number;
  massa: string | number;
  price: string | number;
  malumot: TDataVolume[];
}

interface IStoreReceptionItem {
  taminotchi: string;
  qassob: string;
  partiyanomer: string;
  sana: string;
  dona: string;
  massa: string;
  price: string;
  summa: string;
  status: string;
  malumot: string;
}

interface IStoreReceptionResItem extends IStoreReceptionItem {
  id: string;
}

interface IStoreReceptionRes extends IApiRes {
  data: {
    jamisumma: number;
    jamimassa: number;
    jamidona: number;
    krim_list: IStoreReceptionResItem[];
  };
}

// Agent
interface IStoreAgent {
  id: string;
  zakupchik: string;
}
interface IStoreAgentRes extends IApiRes {
  data: IStoreAgent[];
}

// Provider
interface IStoreProvider {
  id: string;
  fio: string;
  telefon: string;
  balans: string;
}
interface IStoreProviderRes extends IApiRes {
  data: IStoreProvider[];
}

// Butcher
interface IStoreButcher {
  id: string;
  fio: string;
  telefon: string;
  balans: string;
  dona: string;
  status: string;
  kpi: string;
}
interface IStoreButcherRes extends IApiRes {
  data: IStoreButcher[];
}

const STORE_RECEPTION_TAG = "STORE_RECEPTION";

export const storeReceptionApi = api
  .enhanceEndpoints({
    addTagTypes: [STORE_RECEPTION_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getStoreReception: build.query<IStoreReceptionRes, TStoreReceptionParam>({
        query: ({ start, end }) =>
          store_api.reception_cargo_get({ start, end }),
        providesTags: [STORE_RECEPTION_TAG],
      }),
      // index agent
      getStoreAgent: build.query<IStoreAgentRes, void>({
        query: () => store_api.agent_get,
      }),

      // index butcher
      getStoreButcher: build.query<IStoreButcherRes, void>({
        query: () => store_api.butcher_get,
      }),
      // post
      addStoreReception: build.mutation<IApiRes, IStoreReceptionAdd>({
        query: (body) => ({
          url: store_api.reception_cargo_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [STORE_RECEPTION_TAG],
      }),

      //delete
      deleteStoreReception: build.mutation<IApiRes, {receptionId: string}>({
        query: ({receptionId: id}) => ({
          url: store_api.reception_delete(id),
          method: "DELETE",
          
        }),
        invalidatesTags: [STORE_RECEPTION_TAG],
      }),
    }),
  });

export const {
  useGetStoreReceptionQuery,
  useGetStoreAgentQuery,
  useGetStoreButcherQuery,
  useAddStoreReceptionMutation,
  useDeleteStoreReceptionMutation
} = storeReceptionApi; 
