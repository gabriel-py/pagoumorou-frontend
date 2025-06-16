import { BACKEND_URL, BACKEND_TOKEN } from "@/lib/constants";
import { fetchAPI } from "../fetch";
import { CreateUserResponse } from "./types";
import { NewUserFormData } from "@/pages/Register";

export async function createUser(payload: NewUserFormData): Promise<CreateUserResponse> {
  try {
    const url = `${BACKEND_URL}/api/access/user/`;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${BACKEND_TOKEN}`,
    };

    const data: CreateUserResponse = await fetchAPI({
      method: "POST",
      url,
      body: payload,
      headers
    });

    return data;
  } catch (error) {
    throw error;
  }
}
