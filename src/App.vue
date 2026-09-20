<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';
import Cart from '@/components/cart/Cart.vue';
import BottomNav from '@/components/layout/BottomNav.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-foreground font-sans">
    <Navbar />
    <main class="flex-grow pb-20 md:pb-0">
      <router-view />
    </main>
    <Footer />
    <Cart />
    <BottomNav />
  </div>
</template>
