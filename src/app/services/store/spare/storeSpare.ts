import { store_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

const STORE_SPARE_TAG = "STORE_SPARE_TAG";
// Spare
interface SpareItem {
  id: number;
  article: string;
  barcode: string;
  name: string;
  massa: number;
}

interface Refrigerator {
  id: number;
  article: string;
  barcode: string;
  name: string;
  massa: number;
  foiz: number;
}

interface IStoreSpareRes extends IApiRes {
  data: {
    jami_krim_mass: number;
    svejiy: SpareItem[];
    xolodelnik: Refrigerator[];
    foiz: number
  };
}

export const storeSpareApi = api
  .enhanceEndpoints({ addTagTypes: [STORE_SPARE_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // Index
      getStoreSpare: build.query<IStoreSpareRes, void>({
        query: () => store_api.spare_get,
        providesTags: [STORE_SPARE_TAG],
      }),
    }),
  });

export const { useGetStoreSpareQuery } = storeSpareApi;
