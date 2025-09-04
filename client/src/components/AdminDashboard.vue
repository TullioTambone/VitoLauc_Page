<template>
  <div>
    <h1>Dashboard Admin</h1>
    <button @click="logoutAdmin">Logout</button>

    <hr />

    <AdminCategories :token="token" />
    <hr />
    <AdminPhotos :token="token" />
  </div>
</template>

<script>
import AdminCategories from './AdminCategories.vue';
import AdminPhotos from './AdminPhotos.vue';
import { logout } from '../services/auth.js';

export default {
  components: { AdminCategories, AdminPhotos },
  data() {
    return {
      token: localStorage.getItem('admin_token')
    };
  },
  methods: {
    async logoutAdmin() {
      try {
        await logout(this.token);
        localStorage.removeItem('admin_token');
        alert('Logout effettuato!');
        window.location.href = '/login'; // redirect a login
      } catch (err) {
        alert(err.message);
      }
    }
  }
};
</script>
