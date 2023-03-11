const KEY = "__tiramisu__";

export const readToken = (): string | null => localStorage.getItem(KEY);

export const saveToken = (token: string) => localStorage.setItem(KEY, token);
export const deleteToken = () => localStorage.removeItem(KEY);
