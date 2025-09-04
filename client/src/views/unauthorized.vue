<template>
  <div class="unauthorized">
    <h1>🚫 Accesso Negato</h1>
    <p>Non hai i permessi per accedere a questa pagina.</p>
    <router-link to="/">Torna alla Home</router-link>
  </div>
</template>

<script setup>
// Nessuna logica necessaria per ora
</script>

<style scoped>
.unauthorized {
  text-align: center;
  padding: 2rem;
  color: #c00;
}
</style>
