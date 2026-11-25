export function getInType(type) {
  return (
    {
      string: "text",
      email: "email",
      int: "number",
      money: "number",
      number: "number",
      date: "date",
    }[type] ?? "text"
  );
}

export function parseValue(field, value) {
  if (value === "") return value;
  if (!field) return value;

  if (["int", "number", "money"].includes(field.type)) {
    return Number(value);
  }

  if (field.type === "boolean") {
    return value === "true";
  }

  return value;
}

export function resolveErrorType(err) {
  const type = err?.isConnectionError ? "connection" : "unexpected";
  if (type === "unexpected") {
    console.error("Unexpected error:", err);
  }

  return type;
}
