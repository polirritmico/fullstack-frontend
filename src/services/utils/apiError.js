import axios from "axios";

export function getApiErrorMessage(error) {
  const data = error.response?.data;
  const metaKeys = ["timestamp", "status", "path", "kind"];

  if (typeof data === "string" && data) {
    return data;
  }

  if (typeof data?.message === "string" && data.message) {
    return data.message;
  }

  if (typeof data?.error === "string" && data.error) {
    return data.error;
  }

  if (data && typeof data === "object") {
    const validationMessage = Object.entries(data).find(
      ([key, value]) =>
        typeof value === "string" && value && !metaKeys.includes(key),
    )?.[1];

    if (validationMessage) {
      return validationMessage;
    }
  }

  if (error.response) {
    return "Error del servidor";
  }

  if (axios.isAxiosError(error)) {
    return "Error de conexión";
  }

  return "Error inesperado";
}
