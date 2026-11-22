export function findCategory(categories, id) {
  return categories?.find((cat) => cat.id === id);
}

export function findState(states, id) {
  return states?.find((state) => state.id === id);
}

export function getDisplayValue(
  field,
  entry,
  categories,
  states,
  categoryField,
) {
  const id = entry[field.key];

  if (field.key === categoryField) {
    return findCategory(categories, id)?.value ?? id ?? "n/d";
  }

  if (field.isState) {
    return findState(states, id)?.label ?? id ?? "n/d";
  }

  return id ?? "n/d";
}
