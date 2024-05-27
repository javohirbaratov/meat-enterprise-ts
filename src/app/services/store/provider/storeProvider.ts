import { store_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

// Provider
export interface IStoreProvider {
  fio: string;
  telefon: string;
}

// get
interface IStoreProviderResItem extends IStoreProvider {
  id: string;
  balans: string;
}
interface IStoreProviderRes extends IApiRes {
  data: IStoreProviderResItem[];
}

// add
interface IStoreProviderAdd extends IStoreProvider {}
interface IStoreProviderUpdate {
  body: IStoreProvider;
  providerId: string;
}

const STORE_PROVIDER_TAG = "STORE_PROVIDER_TAG";

export const storeProviderApi = api
  .enhanceEndpoints({
    addTagTypes: [STORE_PROVIDER_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getStoreProvider: build.query<IStoreProviderRes, void>({
        query: () => store_api.provider_get,
        providesTags: [STORE_PROVIDER_TAG],
      }),
      // add
      addStoreProvider: build.mutation<IApiRes, IStoreProviderAdd>({
        query: (body) => ({
          url: store_api.provider_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [STORE_PROVIDER_TAG],
      }),
      // put
      putStoreProvider: build.mutation<IApiRes, IStoreProviderUpdate>({
        query: ({ body, providerId }) => ({
          url: store_api.provider_update(providerId),
          method: "PUT",
          body,
        }),
        invalidatesTags: [STORE_PROVIDER_TAG],
      }),
    }),
  });

export const {
  useGetStoreProviderQuery,
  useAddStoreProviderMutation,
  usePutStoreProviderMutation,
} = storeProviderApi;
