export function resolveErrorType(err, setErrorType) {
  const type = err?.isConnectionError ? "connection" : "unexpected";
  setErrorType(type);

  if (type === "unexpected") {
    console.error("Unexpected error:", err);
  }
}
