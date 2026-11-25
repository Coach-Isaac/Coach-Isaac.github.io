<script setup>
// Stepflect logo: the "one step on" grid mark plus the wordmark. Colors come from the --brand-logo-*
// variables in style.css, so it follows light/dark with the rest of the page; the parent sets its
// height with --brand-size. The mark is decorative: the visible words (or the parent link's
// aria-label) name the brand. Rules for use are in docs/design-spec.md.
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

// English pages show the English wordmark only; Chinese pages add the Chinese name.
const chineseName = computed(() => {
  if (locale.value === 'en') return null
  return locale.value === 'zh-CN' ? '进一程' : '進一程'
})

// 64-unit grid. Filled cells are steps taken (the last one in the accent color);
// outlined cells are places not taken, and not required.
const filled = [
  { x: 5, y: 44, accent: false },
  { x: 24.5, y: 24.5, accent: false },
  { x: 44, y: 5, accent: true },
]
const open = [
  { x: 45.25, y: 25.75 },
  { x: 25.75, y: 45.25 },
  { x: 45.25, y: 45.25 },
]
</script>

<template>
  <span class="brand-logo">
    <svg class="mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect
        v-for="c in filled" :key="`f${c.x}`"
        :x="c.x" :y="c.y" width="15" height="15" rx="3.5"
        :fill="c.accent ? 'var(--brand-logo-accent)' : 'var(--brand-logo-primary)'"
      />
      <rect
        v-for="c in open" :key="`o${c.x}${c.y}`"
        :x="c.x" :y="c.y" width="12.5" height="12.5" rx="3.5"
        fill="none" stroke="var(--brand-logo-muted)" stroke-width="2.4"
      />
    </svg>
    <span class="words">
      <span class="en" lang="en">Stepflect</span>
      <template v-if="chineseName">
        <span class="sep" aria-hidden="true"></span>
        <span class="zh">{{ chineseName }}</span>
      </template>
    </span>
  </span>
</template>

<style scoped>
.brand-logo {
  --s: var(--brand-size, 32px);
  display: inline-flex;
  align-items: center;
  gap: calc(var(--s) * 0.3);
  line-height: 1;
  white-space: nowrap;
}

.words {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--s) * 0.24);
}

.mark {
  display: block;
  flex: none;
  width: var(--s);
  height: var(--s);
}

.en {
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-weight: 700;
  font-size: calc(var(--s) * 0.6);
  letter-spacing: -0.025em;
  color: var(--brand-wordmark);
}

.sep {
  width: 1.5px;
  height: calc(var(--s) * 0.5);
  background: var(--brand-wordmark-sub);
  opacity: 0.55;
}

.zh {
  font-weight: 600;
  font-size: calc(var(--s) * 0.42);
  letter-spacing: 0.14em;
  color: var(--brand-wordmark-sub);
}
</style>
