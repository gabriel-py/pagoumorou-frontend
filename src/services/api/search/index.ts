import { BACKEND_URL, BACKEND_TOKEN } from "@/lib/constants";
import { fetchAPI } from "../fetch";
import { SearchResponse, SearchServicePayload } from "./types";

export async function searchService(payload: SearchServicePayload): Promise<SearchResponse> {
  const url = `${BACKEND_URL}/api/pagoumorou/search`;

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Token ${BACKEND_TOKEN}`,
  };

  const data: SearchResponse = await fetchAPI({
    method: "POST",
    url,
    body: payload,
    headers
  });

  return data;
}
