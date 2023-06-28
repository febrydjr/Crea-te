
// export const setAuthStatus = (isAuthenticated) => {
//   localStorage.setItem("isAuthenticated", isAuthenticated);
// };
export const setAuthStatus = (isAuthenticated) => {
  localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
};

export const isAuthenticated = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated === "true";
};
