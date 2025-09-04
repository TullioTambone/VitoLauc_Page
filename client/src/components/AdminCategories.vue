<template>
  <div>
    <h2>Categorie</h2>
    <form @submit.prevent="createCategory">
      <input v-model="newName" placeholder="Nome categoria" />
      <label>
        <input type="checkbox" v-model="newShowOnHome" /> Mostra in home
      </label>
      <button type="submit">Crea</button>
    </form>

    <ul>
      <li v-for="cat in categories" :key="cat.id">
        <input v-model="cat.name" />
        <input type="checkbox" v-model="cat.show_on_home" />
        <button @click="updateCategory(cat)">Aggiorna</button>
        <button @click="deleteCategory(cat.id)">Elimina</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/api.js';

export default {
  props: ['token'],
  data() {
    return {
      categories: [],
      newName: '',
      newShowOnHome: false
    };
  },
  async mounted() {
    this.categories = await getCategories();
  },
  methods: {
    async createCategory() {
      const cat = await createCategory({
        name: this.newName,
        show_on_home: this.newShowOnHome,
        token: this.token
      });
      this.categories.push(cat);
      this.newName = '';
      this.newShowOnHome = false;
    },
    async updateCategory(cat) {
      await updateCategory({ id: cat.id, name: cat.name, show_on_home: cat.show_on_home, token: this.token });
      alert('Categoria aggiornata!');
    },
    async deleteCategory(id) {
      await deleteCategory(id, this.token);
      this.categories = this.categories.filter(c => c.id !== id);
    }
  }
};
</script>
