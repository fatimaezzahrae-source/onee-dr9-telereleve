export function getStoredValue<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(`onee_dr9_${key}`);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return defaultValue;
  }
}

export function setStoredValue<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`onee_dr9_${key}`, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing localStorage key "${key}":`, err);
  }
}

export function removeStoredValue(key: string): void {
  try {
    localStorage.removeItem(`onee_dr9_${key}`);
  } catch (err) {
    console.warn(`Error removing localStorage key "${key}":`, err);
  }
}
