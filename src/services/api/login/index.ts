import { BACKEND_URL, BACKEND_TOKEN } from "@/lib/constants";
import { fetchAPI } from "../fetch";
import { LoginPayload, LoginResponse } from "./types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  try {
    const url = `${BACKEND_URL}/api/access/user/login/`;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${BACKEND_TOKEN}`,
    };

    const data: LoginResponse = await fetchAPI({
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
