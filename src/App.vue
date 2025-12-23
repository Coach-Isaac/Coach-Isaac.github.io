<script setup>
import NavBar from './components/NavBar.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <header>
      <NavBar />
    </header>

    <main>
      <RouterView />
    </main>

    <footer>
      <p>&copy; 2025 Coach Isaac. All rights reserved.</p>
    </footer>

    <ScrollToTop />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

footer {
  text-align: center;
  padding: 2rem;
  background-color: var(--bg-card);
  color: var(--text-muted);
  border-top: 1px solid var(--border-color);
}
</style>
