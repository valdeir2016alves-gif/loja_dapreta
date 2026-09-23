<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Search } from 'lucide-vue-next';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/product/ProductCard.vue';
import type { SortOption } from '@/types/product';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();

const search = ref('');
const selectedCategory = ref<string>('All');
const sortBy = ref<SortOption>('alphabetical');

const categories = computed(() => ['All', ...productStore.categories]);
const allProducts = computed(() => productStore.products);

onMounted(() => {
  if (route.query.cat) {
    selectedCategory.value = String(route.query.cat);
  }
  if (route.query.sort) {
    sortBy.value = route.query.sort as SortOption;
  }
  if (route.query.q) {
    search.value = String(route.query.q);
  }
});

watch([selectedCategory, sortBy], () => {
  const query: Record<string, string> = {};
  if (selectedCategory.value !== 'All') query.cat = selectedCategory.value;
  if (sortBy.value !== 'alphabetical') query.sort = sortBy.value;
  if (search.value) query.q = search.value;
  router.replace({ query });
});

const filteredProducts = computed(() => {
  const term = search.value.toLowerCase().trim();
  const cat = selectedCategory.value;

  const result = allProducts.value.filter((p) => {
    const matchesSearch =
      !term ||
      p.name.toLowerCase().includes(term) ||
      p.shortDescription.toLowerCase().includes(term);
    const matchesCat = cat === 'All' || p.category === cat;
    return matchesSearch && matchesCat;
  });

  result.sort((a, b) => {
    const aRevista = a.name.toLowerCase().includes('revista');
    const bRevista = b.name.toLowerCase().includes('revista');
    if (aRevista && !bRevista) return -1;
    if (!aRevista && bRevista) return 1;

    if (sortBy.value === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy.value === 'price-desc') {
      return b.price - a.price;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return result;
});
</script>

<template>
  <div class="container mx-auto px-4 py-6 sm:py-12">
    <!-- Header -->
    <div class="mb-6 sm:mb-8">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-2">Nossos Produtos</h1>
      <p class="text-sm sm:text-base text-gray-700 font-medium">Encontre cosméticos, maquiagens, revistas Avon e produtos ideais para você.</p>
    </div>

    <!-- Filters & Search Bar -->
    <div class="flex flex-col md:flex-row gap-3.5 items-stretch md:items-center justify-between mb-6">
      <!-- Search Input -->
      <div class="relative flex-1 max-w-md">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
        <input
          v-model="search"
          type="text"
          placeholder="Buscar produtos ou revistas..."
          class="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-primary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-base shadow-sm font-medium"
        />
      </div>

      <!-- Sort Dropdown -->
      <div class="flex items-center gap-2.5">
        <label class="text-xs sm:text-sm text-gray-700 font-bold whitespace-nowrap">Ordenar por:</label>
        <select
          v-model="sortBy"
          class="py-3 px-4 rounded-2xl border-2 border-primary/20 bg-white text-sm sm:text-base font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/40 shadow-sm cursor-pointer"
        >
          <option value="alphabetical">Nome (A - Z)</option>
          <option value="price-asc">Menor Preço</option>
          <option value="price-desc">Maior Preço</option>
        </select>
      </div>
    </div>

    <!-- Category Pills -->
    <div class="flex items-center gap-2.5 overflow-x-auto pb-4 mb-6 scrollbar-none py-1">
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        @click="selectedCategory = cat"
        class="px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all duration-200 active:scale-95 shadow-2xs"
        :class="
          selectedCategory === cat
            ? 'bg-primary text-white shadow-md border-2 border-primary'
            : 'bg-white text-gray-850 hover:bg-secondary/40 border-2 border-primary/15'
        "
      >
        {{ cat === 'All' ? '✨ Todos' : cat }}
      </button>
    </div>

    <!-- Counter -->
    <div class="mb-5 text-xs sm:text-sm text-gray-700 font-bold">
      Mostrando {{ filteredProducts.length }} de {{ allProducts.length }} produtos
    </div>

    <!-- Products Grid -->
    <div
      v-if="filteredProducts.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <ProductCard
        v-for="prod in filteredProducts"
        :key="prod.id"
        :product="prod"
      />
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="text-center py-20 bg-white rounded-3xl border border-primary/10 shadow-sm p-8"
    >
      <p class="text-xl font-bold text-primary mb-2">Nenhum produto encontrado</p>
      <p class="text-sm text-muted-foreground mb-6">Tente ajustar os filtros ou a sua busca.</p>
      <button
        type="button"
        @click="search = ''; selectedCategory = 'All'"
        class="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 text-sm font-semibold transition-colors"
      >
        Limpar Filtros
      </button>
    </div>
  </div>
</template>
