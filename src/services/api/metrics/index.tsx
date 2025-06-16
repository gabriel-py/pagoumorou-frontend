import { BACKEND_URL, BACKEND_TOKEN } from "@/lib/constants";
import { fetchAPI } from "../fetch";

export interface IGetMetricsInterface {
  product?: string;
  type?: 'dropi-pro' | 'dropi' | 'rocketfy';
}

export async function getMetrics({ type = 'dropi-pro', product = '' }: IGetMetricsInterface): Promise<DropiProMetrics> {
  try {
    let url = `${BACKEND_URL}/api/spreadsheet/${type}/metrics`;

    if (product && product.trim() !== '') {
      const encodedProduct = encodeURIComponent(product);
      url = `${url}?product=${encodedProduct}`;
    }

    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Token ${BACKEND_TOKEN}`,
    };

    const data: DropiProMetrics = await fetchAPI({
      method: "GET",
      url,
      headers,
    });

    return data;
  } catch (error) {
    throw new Error(`Erro ao obter métricas: ${error}`);
  }
}
