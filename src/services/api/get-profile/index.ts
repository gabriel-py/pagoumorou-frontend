import { BACKEND_URL, BACKEND_TOKEN } from "@/lib/constants";
import { fetchAPI } from "../fetch";

export async function getProfile(): Promise<UserDetailResponse> {
  try {
    const url = `${BACKEND_URL}/api/access/user/details/`;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${BACKEND_TOKEN}`,
    };

    const data: UserDetailResponse = await fetchAPI({
      method: "GET",
      url,
      headers
    });

    return data;
  } catch (error) {
    throw new Error(`Erro ao obter perfil do usuário: ${error}`);
  }
}
