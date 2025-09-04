const API_URL = import.meta.env.VITE_API_URL;

// -------------------- FOTO --------------------
export async function getAllPhotos() {
  const res = await fetch(`${API_URL}/photos`);
  if (!res.ok) throw new Error('Errore caricamento foto');
  return res.json();
}

export async function getPhotosByCategory(categoryId) {
  const res = await fetch(`${API_URL}/photos/category/${categoryId}`);
  if (!res.ok) throw new Error('Errore caricamento foto per categoria');
  return res.json();
}

// Upload foto (admin)
export async function uploadPhoto({ title, category_id, imageFile, token }) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category_id', category_id);
  formData.append('image', imageFile);

  const res = await fetch(`${API_URL}/photos`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!res.ok) throw new Error('Errore upload foto');
  return res.json();
}

// -------------------- CATEGORIE --------------------
export async function getCategories(showOnHome = false) {
  let url = `${API_URL}/categories`;
  if (showOnHome) url += '?show_on_home=true';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Errore caricamento categorie');
  return res.json();
}

// CRUD categorie admin
export async function createCategory({ name, show_on_home, token }) {
  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, show_on_home })
  });
  if (!res.ok) throw new Error('Errore creazione categoria');
  return res.json();
}
