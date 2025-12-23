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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
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
