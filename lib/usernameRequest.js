"use strict";
export const usernameValidate = async (username) => {
  const response = await fetch("api/auth/username", {
    method: "POST",
    body: JSON.stringify({username}),
  });
  const res = await response.json();
  return res;
};
