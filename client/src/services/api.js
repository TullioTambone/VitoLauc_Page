const API_URL = import.meta.env.VITE_API_URL + '/api';

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
export async function uploadPhoto({ title, category_id, imageFile }) {
  const token = getToken();
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

export async function uploadMultiplePhotos({ title, category_id, imageFiles }) {
  const token = getToken();
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category_id", category_id);
  imageFiles.forEach(file => formData.append("images[]", file));

  const res = await fetch(`${API_URL}/photos/multi-upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });

  if (!res.ok) throw new Error("Errore upload multiplo foto");
  return res.json();
}

// Update foto (admin)
export async function updatePhoto({ id, title, category_id, imageFile }) {
  const token = getToken();
  const formData = new FormData();
  formData.append('title', title);
  formData.append('category_id', category_id);
  if (imageFile) {
    formData.append('image', imageFile); // aggiorna solo se c’è una nuova immagine
  }

  const res = await fetch(`${API_URL}/photos/${id}`, {
    method: 'POST', // alcuni backend usano PATCH/PUT, ma con formData conviene POST + _method
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: (() => {
      formData.append('_method', 'PUT'); // necessario se usi POST
      return formData;
    })()
  });

  if (!res.ok) throw new Error('Errore aggiornamento foto');
  return res.json();
}

// Delete foto (admin)
export async function deletePhoto({ id }) {
  const token = getToken();
  const res = await fetch(`${API_URL}/photos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Errore eliminazione foto');
  return res.json();
}


// -------------------- CATEGORIE --------------------

// READ
export async function getCategories() {
  const token = getToken();

  const res = await fetch(`${API_URL}/categories`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Errore caricamento categorie');
  return res.json();
}

// CREATE
export async function createCategory({ name, macro_category_id, show_on_home, photo }) {
  const token = getToken();
  const formData = new FormData();
  formData.append('name', name);
  formData.append('macro_category_id', macro_category_id);
  formData.append('show_on_home', show_on_home ? 1 : 0);
  if (photo) formData.append('photo', photo);

  const res = await fetch(`${API_URL}/categories`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('RISPOSTA NON JSON:', text);
    throw new Error('Errore creazione categoria');
  }

  return res.json();
}

// UPDATE
export async function updateCategory({ id, name, macro_category_id,   show_on_home, photo }) {
  const token = getToken();
  const formData = new FormData();
  formData.append('name', name);
  formData.append('macro_category_id', macro_category_id);
  formData.append('show_on_home', show_on_home ? 1 : 0);
  if (photo) formData.append('photo', photo);
  formData.append('_method', 'PUT'); // necessario perché fetch usa POST con FormData

  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'POST', // Laravel legge _method=PUT
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('RISPOSTA NON JSON:', text);
    throw new Error('Errore aggiornamento categoria');
  }

  return res.json();
}


// DELETE
export async function deleteCategory(id) {
  const token = getToken();

  const res = await fetch(`${API_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error('Errore cancellazione categoria');
  return res.json();
}

// -------------------- MACRO CATEGORIE --------------------

export async function getMacroCategories() {
  const res = await fetch(`${API_URL}/macrocategories`);
  if (!res.ok) {
    const text = await res.text();
    console.error('Errore API:', text);
    throw new Error('Errore caricamento macrocategorie');
  }
  return res.json();
}


// -------------------- UTILI --------------------

function getToken() {
  return localStorage.getItem("admin_token");
}
