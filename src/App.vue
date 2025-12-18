<script setup>
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const changeLanguage = (lang) => {
  locale.value = lang
}
</script>

<template>
  <div class="app-container">
    <header>
      <nav>
        <button @click="changeLanguage('en')">English</button>
        <button @click="changeLanguage('zh-TW')">繁體中文</button>
        <button @click="changeLanguage('zh-CN')">简体中文</button>
      </nav>
    </header>
    <main>
      <h1>{{ t('hello') }}</h1>
    </main>
  </div>
</template>

<style scoped>
.app-container {
  font-family: 'Inter', sans-serif;
  text-align: center;
  padding: 2rem;
}
nav button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
