import { store_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";


// get
export interface IStoreTransferToFreezerResItem{
  id: string;
  partiya_kun: string;
  partiya_id: string;
  product: string;
  massa: string
  javobgar: string
  vaqt: string
}
interface IStoreTransferToFreezerRes extends IApiRes {
  data: IStoreTransferToFreezerResItem[]
}

// add
export interface IStoreTransferToFreezerAdd {
  product_id: number | string;
  massa: number | string;
}

const STORE_TRANSFER_TO_FREEZER_TAG = "STORE_TRANSFER_TO_FREEZER";

export const StoreTransferToFreezerApi = api
  .enhanceEndpoints({
    addTagTypes: [STORE_TRANSFER_TO_FREEZER_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getStoreTransferToFreezer: build.query<IStoreTransferToFreezerRes, void>({
        query: () => store_api.transfer_to_freezer_get,
        providesTags: [STORE_TRANSFER_TO_FREEZER_TAG],
      }),
      // add
      addStoreTransferToFreezer: build.mutation<
        IApiRes,
        IStoreTransferToFreezerAdd
      >({
        query: (body) => ({
          url: store_api.transfer_to_freezer_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [STORE_TRANSFER_TO_FREEZER_TAG],
      }),
    }),
  });

export const {
  useGetStoreTransferToFreezerQuery,
  useAddStoreTransferToFreezerMutation,
} = StoreTransferToFreezerApi;
