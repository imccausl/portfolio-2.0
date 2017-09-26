export default function isLocalStorageAvailable() {
  const test = "test";

  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

export function saveToLocalStorage(key, newData, oldData) {
  if (isLocalStorageAvailable() && newData !== oldData) {
    localStorage.setItem(key, newData);
    return true;
  }
  return false;
}
