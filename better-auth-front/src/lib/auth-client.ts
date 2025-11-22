import { createAuthClient } from "better-auth/react";
const api_url = import.meta.env.VITE_API_URL;
if (!api_url) {
  console.log("😖😖😖😖😖api url missing");
}
export const authClient = createAuthClient({
  baseURL: api_url, // The base URL of your auth server
});
