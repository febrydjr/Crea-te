// src/utils/auth.js

// Function to set the authentication status in localStorage
export const setAuthStatus = (isAuthenticated) => {
  localStorage.setItem("isAuthenticated", isAuthenticated);
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated === "true";
};
