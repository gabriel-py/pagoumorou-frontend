import { BACKEND_URL, BACKEND_TOKEN } from "@/lib/constants";
import { fetchAPI } from "../../fetch";

export interface IGetComponentsMetricsInterface {
  body?: GetComponentsResponseBody;
  type?: 'dropi-pro' | 'dropi' | 'rocketfy';
}

export async function getComponents({ type = 'dropi-pro', body }: IGetComponentsMetricsInterface): Promise<GetComponentsResponse> {
  try {
    let url = `${BACKEND_URL}/api/cms/components/metrics/`;

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${BACKEND_TOKEN}`,
    };

    const data: GetComponentsResponse = await fetchAPI({
      method: "POST",
      url,
      body,
      headers,
    });

    return data;
  } catch (error) {
    throw new Error(`Erro ao obter componentes com as métricas: ${error}`);
  }
}
