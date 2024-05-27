import { admin_api } from "../../../../constants/api";
import { IApiRes, IDate } from "../../../../types/api";
import { api } from "../../api";

const ADMIN_BENIFIT_TAG = "ADMIN_BENIFIT_TAG";

// Benifit
export interface IAdminReportsBenifitItem {
    jami_krim_massa: number | string,
    jami_krim_summa: number,
    jami_dona: number,
    xolodelnik_massa: number,
    jami_sotuv_summa: number,
    xolodelnik_summa: number,
    foiz: number,
    qassob_harajat: number,
    bugungi_foyda: number,
    jami_harajat: number
  }

interface IAdminReportsBenifitRes extends IApiRes {
  data: IAdminReportsBenifitItem;
}


export const adminBenifitApi = api
  .enhanceEndpoints({
    addTagTypes: [ADMIN_BENIFIT_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getAdminReportsBenifit: build.query<
        IAdminReportsBenifitRes,
        { date: IDate }
      >({
        query: ({ date }) =>
          admin_api.reports_all_benifit__get(date),
        providesTags: [ADMIN_BENIFIT_TAG],
      }),
    }),
  });

export const {
  useGetAdminReportsBenifitQuery,
} = adminBenifitApi;
