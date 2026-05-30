<template>
  <div class="layout">
    <header class="header">
      <div class="logo">中华万年历</div>
      <nav class="nav">
        <router-link to="/bazi" :class="{ active: route.path === '/bazi' }">查干支</router-link>
        <router-link to="/calendar" :class="{ active: route.path === '/calendar' }">万年历</router-link>
        <router-link to="/almanac" :class="{ active: route.path === '/almanac' }">老黄历</router-link>
      </nav>
    </header>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #f7c261;
}

.nav {
  display: flex;
  gap: 32px;

  a {
    text-decoration: none;
    color: #999;
    font-size: 15px;
    padding: 8px 16px;
    border-radius: 20px;
    transition: all 0.3s;

    &:hover {
      color: #333;
      background: #f5f5f5;
    }

    &.active {
      color: #f7c261;
      background: #fff8e6;
    }
  }
}

.main {
  flex: 1;
  overflow: auto;
  padding: 20px;
}
</style>
