<template>
  <div>
    <h3>{{ category ? "Modifica Progetto" : "Nuovo Progetto" }}</h3>

    <form @submit.prevent="saveCategory">
      <div class="mb-3">
        <label class="form-label">Nome</label>
        <input type="text" class="form-control" v-model="form.name" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Macrocategoria</label>
        <select v-model="form.macro_category_id" class="form-select">
          <option :value="null">Seleziona macrocategoria</option>
          <option v-for="macro in macroCategories" :key="macro.id" :value="macro.id">
            {{ macro.name }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Foto</label>
        <input type="file" class="form-control" @change="onFileChange" />
        <div v-if="category?.photo && !form.photo" class="mt-2">
          <img :src="`http://localhost:8000/storage/${category.photo}`" alt="Foto progetto" width="120" />
        </div>
      </div>

      <div class="form-check mb-3">
        <input type="checkbox" class="form-check-input" v-model="form.show_on_home" />
        <label class="form-check-label">Mostra in Home</label>
      </div>

      <button type="submit" class="btn btn-primary">Salva</button>
      <button type="button" class="btn btn-secondary ms-2" @click="$emit('back')">Annulla</button>
    </form>
  </div>
</template>

<script>
import { createCategory, updateCategory, getMacroCategories  } from "../../services/api";
const url = import.meta.env.VITE_API_URL;

export default {
  name: "CategoryForm",
  props: ["category"],
  data() {
    return {
      form: {
        name: this.category?.name || "",
        macro_category_id: this.category?.macro_category_id || null,
        show_on_home: this.category?.show_on_home || false,
        photo: null
      },
      macroCategories: []
    };
  },
  watch: {
    category: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form.name = newVal.name || "";
          this.form.macro_category_id = newVal.macro_category_id || null;
          this.form.show_on_home = !!newVal.show_on_home;
        } else {
          this.form.name = "";
          this.form.macro_category_id = null;
          this.form.show_on_home = false;
          this.form.photo = null;
        }
      }
    }
  },
  async mounted() {
    try {
      this.macroCategories = await getMacroCategories();
    } catch (err) {
      console.error("Errore caricamento macrocategorie:", err);
    }
  },
  methods: {
    onFileChange(e) {
      this.form.photo = e.target.files[0];
    },
    async saveCategory() {
      try {
        const payload = {
          name: this.form.name,
          macro_category_id: this.form.macro_category_id,
          show_on_home: this.form.show_on_home,
          photo: this.form.photo
        };

        if (this.category) {
          await updateCategory({ id: this.category.id, ...payload });
        } else {
          await createCategory(payload);
        }

        this.$emit("saved");
      } catch (err) {
        console.error("Errore salvataggio categoria:", err);
      }
    }
  }
};
</script>
