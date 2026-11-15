import axios from "axios";

function add_period_if_missing(msg) {
  const ADD_PERIOD_PATTERN = /([^.])$/;
  return msg.replace(ADD_PERIOD_PATTERN, "$1.");
}

export function getApiErrorMessage(error) {
  const data = error.response?.data;
  const metaKeys = ["timestamp", "status", "path", "kind"];

  if (typeof data === "string" && data) {
    return add_period_if_missing(data);
  }

  if (typeof data?.message === "string" && data.message) {
    return add_period_if_missing(data.message);
  }

  if (typeof data?.error === "string" && data.error) {
    return add_period_if_missing(data.error);
  }

  if (data && typeof data === "object") {
    const validationMessage = Object.entries(data).find(
      ([key, value]) =>
        typeof value === "string" && value && !metaKeys.includes(key),
    )?.[1];

    if (validationMessage) {
      return add_period_if_missing(validationMessage);
    }
  }

  if (error.response) {
    return "Error en el servidor.";
  }

  if (axios.isAxiosError(error)) {
    return "Error de conexión con el servidor.";
  }

  return "Error inesperado.";
}
