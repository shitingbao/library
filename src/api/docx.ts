import { post } from "./api";

export async function createDocxHeader(formData: any) {
  return await post("/code_header/create", formData);
}

export async function createDocxcontent(formData: any) {
  return await post("/code/create", formData);
}

export async function createDocxFile(formData: any) {
  return await post("/code/docx", formData);
}
