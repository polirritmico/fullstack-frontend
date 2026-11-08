import axios from "axios";

import {
  closeStoredSession,
  readSession,
  SESSION_EXPIRED_EVENT,
} from "@/services/session.js";

function createGatewayClient() {
  return axios.create({
    baseURL: import.meta.env.VITE_JKILTRO_API,
    timeout: 10000,
  });
}

export const authApi = createGatewayClient();
export const jkiltroApi = createGatewayClient();

jkiltroApi.interceptors.request.use((config) => {
  const session = readSession();

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }

  return config;
});

jkiltroApi.interceptors.response.use(
  (res) => res,
  (err) => {
    const sentToken = Boolean(err.config?.headers?.get?.("Authorization"));

    if (sentToken && err.response?.status === 401) {
      closeStoredSession();
      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
    }

    return Promise.reject(err);
  },
);
