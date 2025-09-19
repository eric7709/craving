export function snakeToCamel<T extends Record<string, any>>(obj: T): any {
  if (!obj) return obj;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace("-", "").replace("_", "")
      ),
      value,
    ])
  );
}

export function camelToSnake<T extends Record<string, any>>(obj: T): any {
  if (!obj) return obj;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key
        .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
        .replace(/^_/, ""),
      value === null ? null : value, // Ensure null is preserved
    ])
  );
}
