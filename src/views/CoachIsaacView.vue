<script setup>
import { useI18n } from 'vue-i18n'
import CoachTabNav from '../components/CoachTabNav.vue'
const { t, tm, rt } = useI18n()
</script>

<template>
  <div class="profile-container page-container fade-in-up">
    <CoachTabNav />
    
    <div class="profile-card">
        <!-- Header / Name Section -->
        <header class="card-header">
            <h1 class="english-name">ISAAC LU</h1>
            <h2 class="chinese-name">呂 立 欣</h2>
            <p class="role-title">{{ t('coach_isaac.title') }}</p>
        </header>

        <div class="card-layout">
            <!-- Sidebar (Left Column) -->
            <aside class="sidebar">
                <!-- Professional Background -->
                <section class="section-group">
                    <h3 class="sidebar-title">PROFESSIONAL BACKGROUND</h3>
                    <ul class="sidebar-list">
                        <li v-for="(item, index) in tm('coach_isaac.background_list')" :key="index">
                            {{ rt(item) }}
                        </li>
                    </ul>
                </section>

                <!-- Coaching Focus -->
                <section class="section-group">
                    <h3 class="sidebar-title">COACHING FOCUS</h3>
                    <ul class="sidebar-list">
                        <li v-for="(item, index) in tm('coach_isaac.focus_list')" :key="index">
                            {{ rt(item) }}
                        </li>
                    </ul>
                </section>

                 <!-- Coaching Style -->
                 <section class="section-group">
                    <h3 class="sidebar-title">COACHING STYLE</h3>
                    <ul class="sidebar-list">
                        <li v-for="(item, index) in tm('coach_isaac.style_list')" :key="index">
                            {{ rt(item) }}
                        </li>
                    </ul>
                    <p class="sidebar-core">
                        {{ t('coach_isaac.style_core') }}
                    </p>
                </section>
                
                 <section class="section-group contact-info">
                   <div class="contact-row">
                        <a href="mailto:coach.isaac.lu@gmail.com" class="contact-link">
                           <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/></svg>
                           coach.isaac.lu@gmail.com
                        </a>
                   </div>
                   <div class="contact-row">
                        <a href="https://www.instagram.com/coach.isaac.lu/" target="_blank" class="contact-link">
                           <svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> 
                           @coach.isaac.lu
                        </a>
                   </div>
                </section>
            </aside>

            <!-- Main Content (Right Column) -->
            <main class="main-content">
                <!-- About Me -->
                <section class="content-block about">
                    <h3 class="main-title">ABOUT ME</h3>
                    
                    <div class="highlight-quote">
                        <p>{{ t('coach_isaac.about_quote') }}</p>
                    </div>

                    <p class="body-text">{{ t('coach_isaac.about_content') }}</p>
                </section>
                
                <section class="content-block quote-block">
                     <p class="large-quote">{{ t('coach_isaac.focus_quote') }}</p>
                </section>

                 <!-- Practice Coaching / Services -->
                <section class="content-block practice">
                    <h3 class="main-title">PRACTICE COACHING</h3>
                    <p class="body-text">{{ t('coach_isaac.practice_content') }}</p>
                    <ul class="check-list">
                        <li v-for="(item, index) in tm('coach_isaac.practice_list')" :key="index">
                        {{ rt(item) }}
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
    max-width: 1000px;
    margin: 0 auto;
}

.profile-card {
    background: white;
    border-radius: 0; 
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    overflow: hidden;
    color: #333;
}

/* Header */
.card-header {
    background-color: var(--color-primary); 
    color: white;
    padding: 3rem 2rem;
    text-align: center;
}

.english-name {
    font-size: 2.5rem;
    letter-spacing: 4px;
    margin: 0;
    font-weight: 300;
}

.chinese-name {
    font-size: 1.8rem;
    margin: 0.5rem 0;
    font-weight: 500;
    letter-spacing: 8px;
}

.role-title {
    font-size: 1.1rem;
    opacity: 0.9;
    letter-spacing: 2px;
    margin-top: 1rem;
    text-transform: uppercase;
}

/* Layout */
.card-layout {
    display: flex;
    flex-direction: column;
}

@media (min-width: 768px) {
    .card-layout {
        flex-direction: row;
    }
}

/* Sidebar */
.sidebar {
    background-color: #f8f9fa; /* Light grey background */
    padding: 2.5rem;
    flex: 1; /* Approx 33% */
    border-right: 1px solid #eee;
}

@media (min-width: 768px) {
    .sidebar {
        flex: 0 0 320px;
    }
}

.sidebar-title {
    font-size: 0.9rem;
    color: var(--color-secondary);
    letter-spacing: 1.5px;
    border-bottom: 2px solid var(--color-secondary);
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    margin-top: 0;
}

.section-group {
    margin-bottom: 2.5rem;
}

.sidebar-list {
    list-style: none;
    padding: 0;
    font-size: 0.95rem;
    color: #555;
}

.sidebar-list li {
    margin-bottom: 0.8rem;
    line-height: 1.5;
    position: relative;
    padding-left: 1rem;
}
.sidebar-list li::before {
    content: "▪";
    color: var(--color-secondary);
    position: absolute;
    left: -0.2rem;
}

.sidebar-core {
    font-size: 0.9rem;
    font-style: italic;
    color: #666;
    margin-top: 1rem;
    border-top: 1px dotted #ccc;
    padding-top: 0.8rem;
}

/* Contact Links */
.contact-row {
    margin-bottom: 0.8rem;
}

.contact-link {
    display: flex;
    align-items: center;
    color: #555;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
    word-break: break-all;
}

.contact-link:hover {
    color: var(--color-primary);
}

/* Main Content */
.main-content {
    flex: 2;
    padding: 3rem 4rem;
    background: white;
}

.main-title {
    font-size: 1.4rem;
    letter-spacing: 2px;
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-weight: 500;
}

.highlight-quote {
    font-size: 1.25rem;
    color: var(--color-primary); 
    line-height: 1.6;
    margin-bottom: 2rem;
    font-weight: 500;
}

.body-text {
    color: #4a4a4a;
    line-height: 1.8;
    margin-bottom: 2rem;
    font-size: 1.05rem;
}

.quote-block {
    background-color: rgba(66, 185, 131, 0.08);
    padding: 2rem;
    border-radius: 4px;
    margin: 2rem 0;
    border-left: 4px solid var(--color-primary);
}

.large-quote {
    font-size: 1.15rem;
    font-style: italic;
    color: #2c3e50;
    margin: 0;
    text-align: center;
}

.check-list {
    list-style: none;
    padding: 0;
}

.check-list li {
    padding-left: 2rem;
    position: relative;
    margin-bottom: 1rem;
    line-height: 1.6;
}

.check-list li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--color-secondary);
    font-weight: bold;
}

/* Icons */
.icon-svg {
    width: 20px;
    height: 20px;
    margin-right: 0.5rem;
    fill: currentColor;
    flex-shrink: 0;
}
</style>
