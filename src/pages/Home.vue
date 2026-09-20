<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRight, Sparkles } from 'lucide-vue-next';
import { useProductStore } from '@/store/useProductStore';

const router = useRouter();
const productStore = useProductStore();

const categories = computed(() => productStore.categories.slice(0, 4));
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative h-[600px] flex items-center overflow-hidden bg-secondary/30">
      <div class="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&auto=format&fit=crop"
          alt="Hero Background"
          class="w-full h-full object-cover opacity-30"
        />
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-2xl animate-in fade-in slide-in-from-left duration-700">
          <h1 class="text-5xl md:text-7xl font-bold text-primary leading-tight mb-6">
            Sua beleza <br /> merece brilhar
          </h1>
          <p class="text-xl text-muted-foreground mb-8">
            Revendedora de produtos Avon, oferecendo cosméticos, perfumes, maquiagens e itens de cuidados pessoais
          </p>
          <div class="flex flex-wrap gap-4">
            <router-link
              to="/catalog"
              class="inline-flex items-center justify-center bg-primary text-white hover:bg-primary/90 rounded-full px-8 h-14 text-lg font-semibold transition-all shadow-md gap-2"
            >
              Explorar Catálogo <ArrowRight class="h-5 w-5" />
            </router-link>
            <a
              href="#about"
              class="inline-flex items-center justify-center rounded-full px-8 h-14 text-lg font-semibold border border-primary text-primary hover:bg-primary/10 transition-colors"
            >
              Sobre Nós
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-3xl font-bold text-primary">Nossas Categorias</h2>
          <router-link
            to="/catalog"
            class="text-primary font-medium hover:underline flex items-center gap-1"
          >
            Ver todas <ArrowRight class="h-4 w-4" />
          </router-link>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <router-link
            v-for="catName in categories"
            :key="catName"
            :to="`/catalog?cat=${encodeURIComponent(catName)}`"
            class="group flex flex-col items-center p-8 rounded-3xl bg-secondary/20 hover:bg-primary/10 transition-all duration-300 shadow-sm"
          >
            <div class="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
              <Sparkles class="h-8 w-8" />
            </div>
            <h3 class="font-bold text-primary text-center">{{ catName }}</h3>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
