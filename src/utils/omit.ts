export function omit(
  data: { [key: string]: unknown },
  keys: Array<string>
): { [key: string]: unknown } {
  const result = {};

  Object.entries(data).forEach(([key, value]) => {
    if (!keys.includes(key)) {
      result[key] = value;
    }
  });

  return result;
}
