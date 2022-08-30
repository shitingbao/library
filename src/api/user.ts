import { get } from "./api";

export function userStat(params: any, hds: any) {
  return get("/app/ping", params, hds);
}
