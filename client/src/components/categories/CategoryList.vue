<template>
  <div>
    <h3>Progetti</h3>
    <button class="btn btn-primary mb-3" @click="$emit('open-form', null)">
      Nuovo Progetto
    </button>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Immagine</th>
          <th>Mostra in Home</th>
          <th>Macrocategoria</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categories" :key="cat.id">
          <td>{{ cat.name }}</td>
          <td>
            <img v-if="cat.photo_url" :src="cat.photo_url" alt="Foto categoria" width="50" />
          </td>
          <td>{{ cat.show_on_home ? '✅' : '❌' }}</td>
          <td>{{ cat.macro_category?.name }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="$emit('open-form', cat)">
              Modifica
            </button>
            <button class="btn btn-danger btn-sm" @click="deleteCategory(cat.id)">
              Elimina
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getCategories, deleteCategory } from "../../services/api";

export default {
  name: "CategoriesList",
  data() {
    return {
      categories: []
    };
  },
  async mounted() {
    await this.loadCategories();
  },
  methods: {
    async loadCategories() {
      try {
        this.categories = await getCategories();
      } catch (err) {
        console.error("Errore caricamento categorie:", err);
      }
    },
    async deleteCategory(id) {
      if (!confirm("Sei sicuro di eliminare questa categoria?")) return;
      try {
        await deleteCategory(id);
        await this.loadCategories();
      } catch (err) {
        console.error("Errore eliminazione:", err);
      }
    }
  }
};
</script>
