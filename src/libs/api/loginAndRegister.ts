import { post } from "./api";

function login(formData:any) {
  return post("/v1/login",formData) 
}

function register(formData:any) {
  return post("/v1/register",formData) 
}