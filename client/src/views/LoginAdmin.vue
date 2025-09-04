<template>
  <div class="login-admin">
    <h2>Login Admin</h2>
    <form @submit.prevent="submitForm">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { login } from '../services/auth.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    async submitForm() {
      this.error = null;
      try {
        const { user, token } = await login({
          email: this.email,
          password: this.password
        });

        // Salva token su localStorage (opzionale se usi cookie)
        localStorage.setItem('admin_token', token);

        console.log(`Login OK: ${user.email}`);
        // Redirect alla dashboard admin
        this.$router.push({ name: 'upload' });

      } catch (err) {
        console.error('Errore login:', err);
        this.error = err.message || 'Errore sconosciuto';
      }
    }
  }
};
</script>

<style scoped>
.login-admin {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
input {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
}
.error {
  color: red;
  margin-top: 1rem;
}
</style>
