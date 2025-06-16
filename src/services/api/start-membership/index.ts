import { BACKEND_URL, BACKEND_TOKEN } from "@/lib/constants";
import { fetchAPI } from "../fetch";
import { StartMembershipPayload, StartMembershipResponse } from "./types";

export async function startMembership(payload: StartMembershipPayload): Promise<StartMembershipResponse> {
  try {
    const url = `${BACKEND_URL}/api/payment/start-membership/`;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${BACKEND_TOKEN}`,
    };

    const data: StartMembershipResponse = await fetchAPI({
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
