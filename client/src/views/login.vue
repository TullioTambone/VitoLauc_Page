<script>

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
  }
};
</script>

<template>
  <div class="login">
    <h2>Login</h2>
    <form>
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>
