import { timestamp } from "./time";

export function setItem(name: string, object: any, expires?: number): void {
  try {
    const item = JSON.stringify({
      object,
      expires: expires ? timestamp() + expires : null,
    });
    localStorage.setItem(name, item);
  } catch (error) {
    localStorage.clear();
  }
}

export function getItem(name: string): any {
  const item = localStorage.getItem(name);
  if (!item) {
    return null;
  }

  const { expires, object } = JSON.parse(item);
  if (expires !== null && timestamp() > expires) {
    localStorage.removeItem(name);
    return null;
  }

  return object;
}

export function hasItem(name: string): boolean {
  return !!localStorage.getItem(name);
}

export function removeItem(name: string): void {
  localStorage.removeItem(name);
}

export function removeExpired(): void {
  // todo: delete all expired data
}
