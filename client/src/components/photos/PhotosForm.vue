<template>
  <div>
    <h3>{{ photo ? "Modifica Foto" : "Nuova Foto" }}</h3>

    <form @submit.prevent="savePhoto" v-if="this.categories.length > 0">
      <div class="mb-3">
        <label class="form-label">Titolo</label>
        <input type="text" class="form-control" v-model="form.title" />
      </div>

      <div class="mb-3">
        <label class="form-label">Categoria</label>
        <select v-model="form.category_id" class="form-select" required>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label class="form-label">Immagine</label>
        <input 
            type="file" 
            class="form-control" 
            @change="handleFiles" 
            multiple 
        />
        <div v-if="photo && photo.url" class="mt-2">
          <img :src="photo.url" :alt="photo.title" style="height:120px; object-fit:cover;" />
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Salva</button>
      <button type="button" class="btn btn-secondary ms-2" @click="$emit('back')">Annulla</button>
    </form>
    <div v-else>
        <p class="mark">Devi prima creare una categoria per poter aggiungere foto.</p>
        <button type="button" class="btn btn-secondary ms-2" @click="$emit('back')">Annulla</button>
    </div>
  </div>
</template>

<script>
import { uploadPhoto, uploadMultiplePhotos, getCategories } from "../../services/api";

export default {
    name: "PhotoForm",
    props: ["photo"],
    data() {
        return {
            categories: [],
            form: {
                title: "",   // puoi usare un titolo generico oppure generarlo
                category_id: null,
                imageFiles: []  // array invece che singolo file
            }
        };
    },
    async mounted() {
        this.categories = await getCategories();
    },
    watch: {
      photo: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.form.title = newVal.title || "";
            this.form.category_id = newVal.category_id || null;
          } else {
            this.form.title = "";
            this.form.category_id = null;
            this.form.imageFiles = [];
          }
        }
      }
    },
    methods: {
        handleFiles(e) {
            this.form.imageFiles = Array.from(e.target.files);
        },
        async savePhoto() {
            try {
                if (this.form.imageFiles.length > 1) {
                    await uploadMultiplePhotos({
                        title: this.form.title,
                        category_id: this.form.category_id,
                        imageFiles: this.form.imageFiles
                    });
                } else {
                    await uploadPhoto({
                        title: this.form.title,
                        category_id: this.form.category_id,
                        imageFile: this.form.imageFiles[0]
                    });
                }
                this.$emit("saved");
            } catch (err) {
                console.error("Errore salvataggio foto:", err);
            }
        }
    }
};
</script>
