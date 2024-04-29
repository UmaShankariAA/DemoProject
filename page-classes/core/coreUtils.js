export function getBooleanFromString(str) {
  if (str == 1 || String(str).toUpperCase() === "TRUE")
    return true;
  else if (str == 0 || String(str).toUpperCase() === "FALSE")
    return false;
}