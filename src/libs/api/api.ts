import { Result } from "@/model/result";
import axios from "axios";
import qs from "qs";

axios.defaults.baseURL = "http://localhost:6200"

// 统一使用相同的请求方法
export async function post(baseUrl:string,formData:any) {
  const res = await axios({
        method: "POST",
        url: baseUrl,
        data: qs.stringify(formData),
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      }) 
  const rdata = new Result()
  rdata.initData(res.data)
  return rdata
}