import { BACKEND_URL, BACKEND_TOKEN } from "@/lib/constants";
import { fetchAPI } from "../fetch";
import { UserProfileUpdatePayload, UserProfileUpdateResponse } from "./types";

export async function editProfile(payload: UserProfileUpdatePayload): Promise<UserProfileUpdateResponse> {
  try {
    const url = `${BACKEND_URL}/api/access/user/update/`;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${BACKEND_TOKEN}`,
    };

    const data: UserProfileUpdateResponse = await fetchAPI({
      method: "PUT",
      url,
      body: payload,
      headers
    });

    return data;
  } catch (error) {
    throw new Error(`Erro ao atualizar perfil do usuário: ${error}`);
  }
}
