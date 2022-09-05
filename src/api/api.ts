import { Result } from "@/model/result";
import axios from "axios";
import qs from "qs";
import { cloneDeep } from "lodash-es";

axios.defaults.baseURL = "http://localhost:8000";

// 统一使用相同的请求方法
export async function post(baseUrl: string, formData: any, ...cf: any) {
  var hd = {
    // "content-type": "application/x-www-form-urlencoded",
    // "content-type": "application/json;charset=UTF-8",
    "content-type": "text/plain",
  };
  if (cf) {
    hd = Object.assign(hd, cloneDeep(cf));
  }
  const res = await axios({
    method: "POST",
    url: baseUrl,
    // data: qs.stringify(formData),
    data: JSON.stringify(formData),
    headers: hd,
  });
  const rdata = new Result();
  rdata.initData(res.data);
  return rdata;
}

export async function get(baseUrl: string, params: any, ...handers: any) {
  var hd = {};
  if (handers) {
    hd = Object.assign(hd, cloneDeep(handers));
  }
  const res = await axios({
    method: "GET",
    url: baseUrl,
    params: params,
    headers: hd,
  });
  const rdata = new Result();
  rdata.initData(res.data);
  return rdata;
}
