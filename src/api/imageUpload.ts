import { post } from "./api";

export function submitUpload(formData:any) {
  return post("/image",formData) 
}
