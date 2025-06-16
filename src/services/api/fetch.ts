import { getItem, setItem } from "@/utils/storage";

export interface IFetchAPI {
  method: string;
  url: string;
  body?: any;
  headers?: HeadersInit;
  cache?: ICache;
}

interface ICache {
  cacheLifetime: number;
  cacheKey: string;
}

export const SESSION_KEY = "session";

export const fetchAPI = async ({ method, url, body, headers = {}, cache }: IFetchAPI): Promise<any> => {
  const session = getItem(SESSION_KEY);
  if (session) {
    headers = {
      ...headers,
      'Session': session.session
    }
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (cache) {
    const cachedResponse = getItem(cache.cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw { message: "Erro na requisição", response: errorData };
  }

  const data = await response.json();

  if (cache) {
    setItem(cache.cacheKey, data, cache.cacheLifetime);
  }

  return data;
};
