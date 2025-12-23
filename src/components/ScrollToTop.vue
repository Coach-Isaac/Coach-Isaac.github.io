<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const checkScroll = () => {
    isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

onMounted(() => {
    window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
    <button 
        class="scroll-to-top" 
        :class="{ 'is-visible': isVisible }" 
        @click="scrollToTop"
        aria-label="Scroll to top"
    >
        <span class="top-text">TOP</span>
    </button>
</template>

<style scoped>
.scroll-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: var(--color-primary);
    color: white;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all 0.3s ease;
    z-index: 99;
    font-family: inherit; /* Ensure font matches */
}

.top-text {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.5px;
}

.scroll-to-top:hover {
    background-color: var(--color-secondary);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.scroll-to-top.is-visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

@media (max-width: 768px) {
    .scroll-to-top {
        bottom: 1.5rem;
        right: 1.5rem;
        width: 40px;
        height: 40px;
    }
}
</style>
