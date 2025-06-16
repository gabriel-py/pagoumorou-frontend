import { BACKEND_URL, BACKEND_TOKEN } from "@/lib/constants";
import { fetchAPI } from "../fetch";
import { LoginResponse } from "../login/types";

export async function checkLogin(): Promise<LoginResponse> {
  try {
    const url = `${BACKEND_URL}/api/access/user/login/check/`;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${BACKEND_TOKEN}`,
    };

    const data: LoginResponse = await fetchAPI({
      method: "GET",
      url,
      headers
    });

    return data;
  } catch (error) {
    throw new Error(`Erro ao checar login: ${error}`);
  }
}
