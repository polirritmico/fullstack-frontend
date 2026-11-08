export const SESSION_EXPIRED_EVENT = "expired-session";
const SESSION_STORAGE_KEY = "jKiltro-session";

export function closeStoredSession() {
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

export function readSession() {
  const storedData = sessionStorage.getItem(SESSION_STORAGE_KEY);

  if (!storedData) {
    return null;
  }

  try {
    const session = JSON.parse(storedData);
    if (!isValidSession(session)) {
      closeStoredSession();
      return null;
    }

    return session;
  } catch {
    closeStoredSession();
    return null;
  }
}

function isValidSession(session) {
  if (!session) {
    return false;
  }

  if (typeof session.token !== "string" || session.token.length === 0) {
    return false;
  }

  if (!Number.isFinite(session.exp)) {
    return false;
  }

  if (isExpired(session.exp)) {
    return false;
  }

  return true;
}

export function isExpired(exp) {
  return exp <= Date.now();
}

export function storeSession(session) {
  // NOTE: session unix timestamps should be in ms
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}
