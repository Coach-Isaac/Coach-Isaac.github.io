import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { localePath } from '../locale-paths'

// For components: lp('/coaches') gives the link in the page's language, and basePath is the
// current page without its language prefix (for "which tab is active" checks).
export function useLocalePath() {
  const { locale } = useI18n()
  const route = useRoute()
  const lp = (path) => localePath(path, locale.value)
  // Empty on pages without a language-neutral path (404), so no tab shows as active there.
  const basePath = computed(() => route.meta.basePath ?? '')
  return { lp, basePath }
}
