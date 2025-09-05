const API_URL = import.meta.env.VITE_API_URL + '/api';

// LOGIN
export async function login({ email, password }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Errore login" }));
    throw new Error(error.message || "Errore login");
  }

  const data = await res.json();
  // salva il token in localStorage o sessionStorage
  localStorage.setItem("admin_token", data.token);

  return data;
}


// LOGOUT
export async function logout() {
  try {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Errore logout:", err);
  } finally {
    localStorage.removeItem("admin_token");
  }
}

// CONTROLLA LOGIN
export function isAdminLoggedIn() {
  return !!localStorage.getItem("admin_token");
}
