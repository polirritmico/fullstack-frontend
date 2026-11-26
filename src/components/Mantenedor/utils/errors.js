export function resolveErrorType(err) {
  const type = err?.isConnectionError ? "connection" : "unexpected";
  if (type === "unexpected") {
    console.error("Unexpected error:", err);
  }

  return type;
}
