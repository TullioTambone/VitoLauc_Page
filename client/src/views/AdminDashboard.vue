<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><h2>Dashboard</h2></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="activeSection = 'home'">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="activeSection = 'categories'">Progetti</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="activeSection = 'photos'">Foto</a>
                    </li>
                    <li class="nav-item">
                        <RouterLink :to="{ name: 'home'}" class="nav-link">
                            Vai sul sito
                        </RouterLink>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click.prevent="logoutAdmin">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

  <div class="container mt-4">
    <div v-if="activeSection === 'home'">
        <h3>Benvenuto nella Dashboard Vito C</h3>
    </div>

    <div v-if="activeSection === 'categories'">
        <CategoriesList 
            v-if="!showCategoryForm"
            @open-form="openCategoryForm" 
        />
        <CategoryForm 
            v-else
            :category="selectedCategory" 
            @saved="closeCategoryForm" 
            @back="closeCategoryForm" 
        />
    </div>


    <div v-if="activeSection === 'photos'">
        <PhotosList 
            v-if="!showPhotoForm"
            @open-form="openPhotoForm" 
        />
        <PhotoForm 
            v-else
            :photo="selectedPhoto" 
            @saved="closePhotoForm" 
            @back="closePhotoForm" 
        />
    </div>
  </div>
</template>

<script>
import CategoriesList from '../components/categories/CategoryList.vue';
import CategoryForm from '../components/categories/CategoryForm.vue';
import PhotosList from '../components/photos/PhotosList.vue';
import PhotoForm from '../components/photos/PhotosForm.vue';

import { logout } from '../services/auth.js';
import { getCategories } from '../services/api.js';
export default {
  components: { CategoriesList, CategoryForm, PhotosList, PhotoForm },
  name: 'dashboard',
  data() {
    return {
        token: localStorage.getItem('admin_token'),
        activeSection: 'home',
        showCategoryForm: false,
        selectedCategory: null,
        showPhotoForm: false,
        selectedPhoto: null,
    };
  },
  async mounted() {
    try {
      this.categories = await getCategories();
    } catch (err) {
      console.error("Errore nel recupero categorie:", err);
    }
  },
  methods: {
    openCategoryForm(category) {
        this.selectedCategory = category;
        this.showCategoryForm = true;
    },
    closeCategoryForm() {
        this.selectedCategory = null;
        this.showCategoryForm = false;
    },
    openPhotoForm(photo) {
        this.selectedPhoto = photo;
        this.showPhotoForm = true;
    },
    closePhotoForm() {
        this.selectedPhoto = null;
        this.showPhotoForm = false;
    },
    async logoutAdmin() {
        try {
            await logout(this.token);
            localStorage.removeItem('admin_token');
            window.location.href = '/login';
        } catch (err) {
            console.error(err.message);
        }
    }
  }
};
</script>

<style scoped>
.pointer {
    cursor: pointer;
    color: rgb(3, 71, 102);
    text-decoration: underline;
}
</style>