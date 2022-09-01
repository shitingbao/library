import { get } from "./api";

export async function userStat(params: any, hds: any) {
  return await get("/app/ping", params, hds);
}
