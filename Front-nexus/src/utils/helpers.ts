export const getUser = () => {
  const userString = localStorage.getItem("user");
  if (userString) {
    return JSON.parse(userString);
  }
  return null;
};
