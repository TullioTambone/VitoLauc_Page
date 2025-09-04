// src/services/auth.js
const API_URL = import.meta.env.VITE_API_URL; // esempio: http://localhost:8000

export async function login({ email, password }) {
  try {
    // 1️⃣ Prendi il CSRF cookie prima del login
    await fetch(`${API_URL}/sanctum/csrf-cookie`, {
      credentials: "include",
    });

    const xsrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("XSRF-TOKEN="))
      ?.split("=")[1];

    // 2️⃣ Invia la richiesta di login
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(xsrfToken),
      },
      body: JSON.stringify({ email, password }),
      credentials: "include", // fondamentale per cookie/sessione
    });

    if (!res.ok) {
      // Prova a leggere l’errore dal JSON, altrimenti messaggio generico
      const error = await res.json().catch(() => ({ message: "Errore login" }));
      throw new Error(error.message || "Errore login");
    }

    // 3️⃣ Ritorna la risposta JSON
    return await res.json(); // { user, token }
  } catch (err) {
    throw new Error(err.message || "Errore login");
  }
}

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
