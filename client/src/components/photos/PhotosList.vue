<template>
  <div>
    <h3>Foto per Categoria</h3>
    <button class="btn btn-primary mb-3" @click="$emit('open-form', null)">
      Aggiungi Foto
    </button>

    <div v-for="cat in categories" :key="cat.id" class="mb-4">
      <h5 
        class="bg-light p-2" 
        style="cursor: pointer" 
        @click="toggleCategory(cat.id)">
        {{ cat.name }}
      </h5>

      <div v-if="expandedCategory === cat.id" class="row mt-2">
        <div 
          v-for="photo in photosByCategory[cat.id] || []" 
          :key="photo.id"
          class="col-3 mb-3 text-center"
        >
          <!-- Usa l'accessor url -->
          <img 
            :src="photo.url"
            :alt="photo.title" 
            class="img-thumbnail mb-2" 
            style="height:120px; object-fit:cover; width:100%;"
          />

          <p>{{ photo.title }}</p>
          <button class="btn btn-primary btn-sm me-1" @click="$emit('open-form', photo)">
            Modifica
          </button>
          <button class="btn btn-danger btn-sm" @click="deletePhoto(photo.id)">
            Elimina
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategories, getPhotosByCategory, deletePhoto } from "../../services/api";

export default {
  name: "PhotosList",
  data() {
    return {
      categories: [],
      photosByCategory: {},
      expandedCategory: null
    };
  },
  async mounted() {
    this.categories = await getCategories();
  },
  methods: {
    async toggleCategory(categoryId) {
      if (this.expandedCategory === categoryId) {
        this.expandedCategory = null;
      } else {
        this.expandedCategory = categoryId;
        if (!this.photosByCategory[categoryId]) {
          this.photosByCategory[categoryId] = await getPhotosByCategory(categoryId);
        }
      }
    },
    async deletePhoto(id) {
      if (!confirm("Sei sicuro di eliminare questa foto?")) return;
      try {
        await deletePhoto({ id });
        if (this.expandedCategory) {
          this.photosByCategory[this.expandedCategory] = await getPhotosByCategory(this.expandedCategory);
        }
      } catch (err) {
        console.error("Errore eliminazione foto:", err);
      }
    }
  }
};
</script>
