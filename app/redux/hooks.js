export const getValueLocalStorate = (key) => {
  const isBrowser = () => typeof window !== "undefined";
  if (isBrowser()) {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
};
