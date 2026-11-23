<script setup>
defineProps({
  type: { type: String, required: true }, // 'email' | 'instagram' | 'linkedin'
})
</script>

<template>
  <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="type === 'email'">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </template>
    <template v-else-if="type === 'instagram'">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </template>
    <template v-else-if="type === 'linkedin'">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </template>
  </svg>
</template>

<style scoped>
.contact-icon {
  width: 18px;
  height: 18px;
  flex: none;
}
</style>
