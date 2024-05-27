import { agent_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

interface IRegion {
  id: string;
  nomi: string;
}

interface IRegionRes extends IApiRes {
  data: IRegion[];
}

interface IDistrict {
  id: string;
  nomi: string;
  vil_id: string;
}

interface IDistrictRes extends IApiRes {
  data: IDistrict[];
}

export const agentRegion = api.injectEndpoints({
  endpoints: (build) => ({
    // Region
    getAgentRegion: build.query<IRegionRes, void>({
      query: () => agent_api.region_get,
    }),
    getAgentDistrict: build.query<IDistrictRes, string>({
      query: (regionId: string) => agent_api.district_get_by_region(regionId),
    }),
  }),
});

export const { useGetAgentRegionQuery, useGetAgentDistrictQuery } = agentRegion;
