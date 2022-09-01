import { post } from "./api";

export async function login(formData: any, ...cf: any) {
  return await post("/v1/login", formData, cf);
}

export async function register(formData: any, ...cf: any) {
  return await post("/v1/register", formData, cf);
}
