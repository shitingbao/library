import { post } from "./api";

export async function submitUpload(formData: any) {
  return await post("/image", formData);
}
