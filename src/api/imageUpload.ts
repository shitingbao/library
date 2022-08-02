import { post } from "./api";

export function submitUpload(formData:any) {
  post("/image",formData) 
}
