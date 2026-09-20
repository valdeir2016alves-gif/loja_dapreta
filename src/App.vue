<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';
import Cart from '@/components/cart/Cart.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground font-sans">
    <Navbar />
    <main class="flex-grow">
      <router-view />
    </main>
    <Footer />
    <Cart />
  </div>
</template>
