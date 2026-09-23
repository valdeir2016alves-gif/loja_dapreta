<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  ArrowRight,
  MessageCircle,
  Search,
  CheckCircle2,
  Heart,
  PhoneCall,
} from 'lucide-vue-next';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/product/ProductCard.vue';
import SpecularCard from '@/components/ui/SpecularCard.vue';

const router = useRouter();
const productStore = useProductStore();

const searchQuery = ref('');

const logoUrl = import.meta.env.BASE_URL + 'logo.jpg';
const whatsappUrl =
  'https://api.whatsapp.com/send/?phone=5555999911746&text=Ol%C3%A1%21+Vim+pelo+site+da+Loja+da+Preta+e+gostaria+de+tirar+uma+d%C3%BAvida.&type=phone_number&app_absent=0';

const products = computed(() => productStore.products.slice(0, 8));

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push(`/catalog?q=${encodeURIComponent(searchQuery.value.trim())}`);
  } else {
    router.push('/catalog');
  }
}

</script>

<template>
  <div class="space-y-10 sm:space-y-16">
    <!-- Bloco de Boas-Vindas Acolhedor (Mobile-First) -->
    <section class="bg-gradient-to-b from-secondary/40 via-secondary/20 to-transparent pt-8 pb-10 sm:py-14 border-b border-primary/10">
      <div class="container mx-auto px-4 max-w-4xl text-center">
        <!-- Foto da Proprietária com Efeito Acolhedor -->
        <div class="inline-block relative mb-5">
          <img
            :src="logoUrl"
            alt="Preta - Proprietária da Loja da Preta"
            class="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto shadow-md border-4 border-white ring-4 ring-primary/20"
          />
          <span
            class="absolute bottom-0 right-0 bg-green-500 text-white p-1.5 rounded-full border-2 border-white shadow-sm"
            title="Atendimento online"
          >
            <MessageCircle class="h-4 w-4" />
          </span>
        </div>

        <!-- Título e Saudação -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-primary mb-6 leading-tight tracking-tight">
          Bem Vindos à <br class="sm:hidden" />
          <span class="text-primary underline decoration-primary/30">Loja da Preta</span> ❤️
        </h1>

        <!-- Destaques de Confiança -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mt-10 pt-6 border-t border-primary/10 text-xs sm:text-sm text-gray-700 font-semibold">
          <div class="flex items-center justify-center gap-2 bg-white/80 py-2.5 px-3 rounded-xl border border-primary/10 shadow-2xs">
            <CheckCircle2 class="h-4 w-4 text-green-600 flex-shrink-0" />
            <span>Produtos 100% Originais</span>
          </div>
          <div class="flex items-center justify-center gap-2 bg-white/80 py-2.5 px-3 rounded-xl border border-primary/10 shadow-2xs">
            <PhoneCall class="h-4 w-4 text-primary flex-shrink-0" />
            <span>Atendimento no WhatsApp</span>
          </div>
          <div class="flex items-center justify-center gap-2 bg-white/80 py-2.5 px-3 rounded-xl border border-primary/10 shadow-2xs">
            <Heart class="h-4 w-4 text-rose-500 flex-shrink-0" />
            <span>Entrega com Carinho</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Barra de Pesquisa com Efeito Specular Card -->
    <section class="container mx-auto px-4 max-w-3xl">
      <SpecularCard>
        <label for="busca-home" class="block text-base sm:text-lg font-black text-gray-900 mb-2">
          🔍 O que você gostaria de encontrar hoje?
        </label>
        <form @submit.prevent="handleSearch" class="flex gap-2.5">
          <input
            id="busca-home"
            v-model="searchQuery"
            type="text"
            placeholder="Ex: revista, perfume, sabonete, hidratante..."
            class="flex-1 px-4 py-3.5 sm:py-4 rounded-2xl border-2 border-primary/20 bg-secondary/10 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
          />
          <button
            type="submit"
            class="px-5 sm:px-8 py-3.5 sm:py-4 bg-primary text-white font-extrabold rounded-2xl hover:bg-primary/90 flex items-center justify-center gap-2 text-base sm:text-lg transition-transform active:scale-95 shadow-sm min-w-[56px] min-h-[52px]"
          >
            <Search class="h-6 w-6 sm:h-5 sm:w-5" />
            <span class="hidden sm:inline">Buscar</span>
          </button>
        </form>
      </SpecularCard>
    </section>


    <!-- Vitrine de Produtos (Direto na Página Inicial!) -->
    <section id="vitrine-produtos" class="container mx-auto px-4 max-w-6xl scroll-mt-24">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <h2 class="text-2xl sm:text-3xl font-black text-primary">Nossos Produtos</h2>
          <p class="text-sm sm:text-base text-gray-700 font-medium">Confira alguns dos nossos itens e revistas disponíveis:</p>
        </div>
        <router-link
          to="/catalog"
          class="h-11 sm:h-12 px-5 py-2.5 rounded-2xl border-2 border-primary/20 text-primary hover:bg-primary/5 font-extrabold text-sm sm:text-base transition-colors flex items-center justify-center w-fit"
        >
          Ver Catálogo Completo
        </router-link>
      </div>

      <!-- Grade de Produtos com Cards Grandes -->
      <div
        v-if="products.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
      >
        <ProductCard
          v-for="prod in products"
          :key="prod.id"
          :product="prod"
        />
      </div>

      <!-- Caso ainda não tenha produtos -->
      <div
        v-else
        class="bg-white p-8 rounded-3xl border border-primary/15 text-center shadow-sm"
      >
        <p class="text-lg font-bold text-primary mb-2">Nosso catálogo está sendo atualizado!</p>
        <p class="text-sm text-muted-foreground mb-4">Fale conosco no WhatsApp para conferir a pronta-entrega.</p>
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-green-600 text-white font-bold"
        >
          <MessageCircle class="h-5 w-5" /> Chamar no WhatsApp
        </a>
      </div>

      <!-- Botão para ver mais produtos -->
      <div v-if="products.length > 0" class="text-center mt-10">
        <router-link
          to="/catalog"
          class="inline-flex items-center justify-center h-14 sm:h-15 px-8 sm:px-10 rounded-2xl bg-primary text-white hover:bg-primary/90 font-extrabold text-base sm:text-lg shadow-md transition-transform active:scale-95 gap-3"
        >
          <span>Explorar Todos os Produtos</span>
          <ArrowRight class="h-5 w-5" />
        </router-link>
      </div>
    </section>

    <!-- Seção de Ajuda Simples: Como Comprar (Pensada para Terceira Idade) -->
    <section class="bg-secondary/30 py-10 sm:py-14 border-y border-primary/10">
      <div class="container mx-auto px-4 max-w-4xl">
        <h2 class="text-2xl sm:text-3xl font-black text-center text-primary mb-2">
          Como Comprar na Loja da Preta?
        </h2>
        <p class="text-center text-gray-700 font-semibold text-sm sm:text-base mb-8">
          É muito fácil, rápido e você conversa direto com a gente!
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          <SpecularCard inner-class="p-6 text-center" :initial-angle="0">
            <div class="w-14 h-14 bg-primary/10 text-primary rounded-full font-black text-2xl flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 class="text-lg sm:text-xl font-black text-gray-900 mb-2">Escolha o Produto</h3>
            <p class="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              Veja as fotos, preços e detalhes dos cosméticos e itens que você mais gostar.
            </p>
          </SpecularCard>

          <SpecularCard inner-class="p-6 text-center" :initial-angle="120">
            <div class="w-14 h-14 bg-green-100 text-green-700 rounded-full font-black text-2xl flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 class="text-lg sm:text-xl font-black text-gray-900 mb-2">Chame no WhatsApp</h3>
            <p class="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              Clique no botão verde do WhatsApp em qualquer produto para tirar dúvidas ou fazer seu pedido.
            </p>
          </SpecularCard>

          <SpecularCard inner-class="p-6 text-center" :initial-angle="240">
            <div class="w-14 h-14 bg-primary/10 text-primary rounded-full font-black text-2xl flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 class="text-lg sm:text-xl font-black text-gray-900 mb-2">Receba com Carinho</h3>
            <p class="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              Combinamos o melhor dia e forma de entrega diretamente com você em São Gabriel!
            </p>
          </SpecularCard>
        </div>

      </div>
    </section>
  </div>
</template>
