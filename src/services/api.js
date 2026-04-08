const BASE_URL = "http://localhost:5000/api/v1";

export async function loginUser(data) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: 'include'
  });

  return response.json();
}

export async function registerUser(data) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function checkAuth() {
  const res = await fetch(`${BASE_URL}/me`, {
    credentials: "include",
  });

  return res.json();
}

export async function logoutUser() {
  const res = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  return res.json();
}

export async function getAllStores() {
  const res = await fetch(`${BASE_URL}/stores`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
}