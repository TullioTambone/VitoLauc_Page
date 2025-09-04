<template>
  <div>
    <h2>Upload foto</h2>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="title" placeholder="Titolo foto" />
      <select v-model="categoryId">
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
      <input type="file" @change="handleFile" />
      <button type="submit">Carica</button>
    </form>
  </div>
</template>

<script>
import { getCategories, uploadPhoto } from '../services/api.js';

export default {
  data() {
    return {
      title: '',
      categoryId: null,
      file: null,
      categories: [],
      token: 'INSERISCI_IL_TOKEN_ADMIN', // token ricevuto al login
    };
  },
  beforeCreate() {
    const savedToken = localStorage.getItem('admin_token');
    if (!savedToken) {
      this.$router.push({ name: 'unauthorized' });
    } else {
      this.token = savedToken;
    }
  },
  async mounted() {
    this.categories = await getCategories();
    if (this.categories.length > 0) this.categoryId = this.categories[0].id;
  },
  methods: {
    handleFile(event) {
      this.file = event.target.files[0];
    },
    async submitForm() {
      if (!this.file || !this.categoryId) return alert('Seleziona file e categoria');
      try {
        await uploadPhoto({
          title: this.title,
          category_id: this.categoryId,
          imageFile: this.file,
          token: this.token,
        });
        alert('Foto caricata con successo!');
      } catch (err) {
        alert(err.message);
      }
    }
  }
};
</script>
