import { post } from "./api";

export function login(formData: any, ...cf: any) {
  return post("/v1/login", formData, cf);
}

export function register(formData: any, ...cf: any) {
  return post("/v1/register", formData, cf);
}
