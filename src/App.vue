<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const authStore = useAuthStore()

// Determine which layout to use based on the current route
const isAuthPage = computed(() => {
  return route.name === 'auth' || route.path.startsWith('/auth')
})

onMounted(() => {
  authStore.initializeAuth()
})
</script>

<template>
  <!-- Use AuthLayout for authentication pages -->
  <AuthLayout v-if="isAuthPage">
    <router-view />
  </AuthLayout>

  <!-- Use DefaultLayout for all other pages -->
  <DefaultLayout v-else>
    <router-view />
  </DefaultLayout>
</template>

<style scoped></style>
