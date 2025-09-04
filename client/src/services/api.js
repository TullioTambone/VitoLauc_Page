const API_URL = import.meta.env.VITE_API_URL;

export async function getPhotosByCategory(categoryId) {
  const res = await fetch(`${API_URL}/photos/category/${categoryId}`);
  if (!res.ok) throw new Error('Errore caricamento foto');
  return res.json();
}

export async function getAllPhotos() {
  const res = await fetch(`${API_URL}/photos`);
  if (!res.ok) throw new Error('Errore caricamento foto');
  return res.json();
}

export async function getCategories(showOnHome = false) {
  let url = `${API_URL}/categories`;
  if (showOnHome) url += '?show_on_home=true';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Errore caricamento categorie');
  return res.json();
}
