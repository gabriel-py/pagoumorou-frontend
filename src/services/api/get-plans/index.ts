import { BACKEND_URL, BACKEND_TOKEN } from "@/lib/constants";
import { fetchAPI } from "../fetch";
import { PlanResponse } from "./types";

export async function getPlans(): Promise<PlanResponse> {
  try {
    const url = `${BACKEND_URL}/api/codmetrix/plans/?is_default=true`;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${BACKEND_TOKEN}`,
    };

    const data: PlanResponse = await fetchAPI({
      method: "GET",
      url,
      headers
    });

    return data;
  } catch (error) {
    throw new Error(`Erro ao obter planos: ${error}`);
  }
}
