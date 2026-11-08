import { jwtDecode } from "jwt-decode";

import { authApi } from "@/services/api.js";
import {
  readSession,
  storeSession,
  closeStoredSession,
  isExpired,
} from "@/services/session.js";

const EXPECTED_ISSUER = import.meta.env.VITE_JWT_ISSUER;
if (!EXPECTED_ISSUER) throw new Error("VITE_JWT_ISSUER env is not set");

const ROLE_MAP = {
  admin: "Administrador",
  user: "Cliente",
};

function parseJWT(token) {
  try {
    const decoded = jwtDecode(token);
    console.log("Raw decoded token:", decoded);
    convertTimestampsToMilliseconds(decoded);
    return decoded;
  } catch (err) {
    console.error(err);
    throw new Error("Token inválido o malformado");
  }
}

function convertTimestampsToMilliseconds(payload) {
  if (payload.iat) payload.iat *= 1000;
  if (payload.exp) payload.exp *= 1000;
}

function validateTokenPayload(payload) {
  if (!payload) {
    throw new Error("Token vacío");
  }

  if (!payload.sub) {
    throw new Error("El token no contiene subject");
  }

  if (payload.iss !== EXPECTED_ISSUER) {
    throw new Error("El token no es de un issuer válido");
  }

  if (!Array.isArray(payload.roles) || payload.roles.length === 0) {
    throw new Error("El token no contiene roles");
  }

  if (!Number.isFinite(payload.iat)) {
    throw new Error("El token no contiene timestamp de creación");
  }

  if (!Number.isFinite(payload.exp)) {
    throw new Error("El token no contiene timestamp de expiración");
  }

  if (isExpired(payload.exp)) {
    throw new Error("Se recibió un token ya expirado");
  }
}

function mapUser(session) {
  const role = ROLE_MAP[session.roles[0]];
  if (!role) {
    throw new Error("Tipo de usuario desconocido");
  }

  return {
    id: session.sub,
    role: role,
  };
}

const authService = {
  async login(credentials) {
    const res = await authApi.post("api/v1/auth", credentials);

    const token = typeof res.data === "string" ? res.data : res.data?.token;
    if (!token) {
      throw new Error("Respuesta inválida: Sin token");
    }

    const payload = parseJWT(token);
    validateTokenPayload(payload);

    const session = {
      ...payload,
      token,
    };

    const user = mapUser(session);
    storeSession(session);

    return user;
  },

  logout() {
    closeStoredSession();
  },

  getCurrentUser() {
    const session = readSession();
    return session ? mapUser(session) : null;
  },

  getSessionExp() {
    return readSession()?.exp ?? null;
  },
};

export default authService;
