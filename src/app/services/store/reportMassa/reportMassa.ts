import { store_api } from "../../../../constants/api";
import { IApiRes, IDate } from "../../../../types/api";
import { api } from "../../api";

const STORE_REPORT_MASSA_TAG = "STORE_REPORT_MASSA_TAG";

// index
interface IStoreMassaResParams {
  date: IDate;
}

export interface IStoreReportMassaResListItem {
    id: string,
    sana: string,
    krim_massa: number | string,
    sotuv_massa:number |string,
    xolodelnik_massa: number | string,
    foiz: number
}

interface IStoreReportMassaRes extends IApiRes {
  data: IStoreReportMassaResListItem[];
}


export const storeDebtApi = api
  .enhanceEndpoints({ addTagTypes: [STORE_REPORT_MASSA_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // Index
      getReportMassa: build.query<IStoreReportMassaRes, IStoreMassaResParams>({
        query: ({ date }) => store_api.report_massa_get(date),
        providesTags: [STORE_REPORT_MASSA_TAG],
      }),
     
    }),
  });

export const { useGetReportMassaQuery } = storeDebtApi;
