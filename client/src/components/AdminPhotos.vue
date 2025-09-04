<template>
  <div>
    <h2>Foto</h2>

    <form @submit.prevent="uploadPhoto">
      <input type="text" v-model="title" placeholder="Titolo" />
      <select v-model="categoryId">
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
      <input type="file" @change="handleFile" />
      <button type="submit">Carica</button>
    </form>

    <ul>
      <li v-for="photo in photos" :key="photo.id">
        <img :src="`${API_BASE.replace('/api','')}/storage/${photo.filename}`" width="100" />
        {{ photo.title }}
        <button @click="deletePhoto(photo.id)">Elimina</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getAllPhotos, getCategories, uploadPhoto, deletePhoto } from '../services/api.js';
const API_BASE = import.meta.env.VITE_API_URL;

export default {
  props: ['token'],
  data() {
    return {
      photos: [],
      categories: [],
      title: '',
      categoryId: null,
      file: null
    };
  },
  async mounted() {
    this.photos = await getAllPhotos();
    this.categories = await getCategories();
    if (this.categories.length > 0) this.categoryId = this.categories[0].id;
  },
  methods: {
    handleFile(event) {
      this.file = event.target.files[0];
    },
    async uploadPhoto() {
      if (!this.file || !this.categoryId) return alert('Seleziona file e categoria');
      const photo = await uploadPhoto({
        title: this.title,
        category_id: this.categoryId,
        imageFile: this.file,
        token: this.token
      });
      this.photos.push(photo);
      this.title = '';
      this.file = null;
    },
    async deletePhoto(id) {
      await deletePhoto(id, this.token);
      this.photos = this.photos.filter(p => p.id !== id);
    }
  }
};
</script>
