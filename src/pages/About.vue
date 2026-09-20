<script setup lang="ts">
import {
  MessageCircle,
  ArrowRight,
  Heart,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  Clock,
  MapPin,
} from 'lucide-vue-next';

const logoUrl = import.meta.env.BASE_URL + 'logo.jpg';
const whatsappUrl =
  'https://api.whatsapp.com/send/?phone=5555999911746&text=Ol%C3%A1%21+Vim+pela+p%C3%A1gina+Sobre+a+Loja+e+gostaria+de+conversar.&type=phone_number&app_absent=0';
</script>

<template>
  <div class="container mx-auto px-4 py-8 sm:py-12 max-w-4xl space-y-10 sm:space-y-14">
    <!-- Cabeçalho de Apresentação -->
    <header class="text-center space-y-4">
      <div class="inline-block relative">
        <img
          :src="logoUrl"
          alt="Foto da Preta - Proprietária"
          class="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover mx-auto shadow-md border-4 border-white ring-4 ring-primary/20"
        />
        <span
          class="absolute bottom-1 right-1 bg-green-500 text-white p-2 rounded-full border-2 border-white shadow-sm"
          title="Atendimento online"
        >
          <MessageCircle class="h-5 w-5" />
        </span>
      </div>

      <div class="space-y-2">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-primary tracking-tight">
          Sobre a Loja da Preta ❤️
        </h1>
        <p class="text-base sm:text-lg text-gray-600 font-medium max-w-xl mx-auto">
          Cosméticos, cuidados especiais e utilidades com atendimento acolhedor e próximo de você.
        </p>
      </div>
    </header>

    <!-- Card Principal de Destaque com o Texto Oficial -->
    <section class="bg-white rounded-3xl p-6 sm:p-10 border-2 border-primary/20 shadow-md text-center max-w-2xl mx-auto space-y-4">
      <div class="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
        <Heart class="h-7 w-7 text-rose-500 fill-rose-500/20" />
      </div>

      <blockquote class="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed">
        “Trabalhamos com produtos de qualidade, oferecendo um atendimento rápido e de confiança para você.”
      </blockquote>

      <p class="text-sm sm:text-base text-gray-600 font-medium pt-2 border-t border-gray-100">
        Nosso compromisso é fazer você se sentir em casa, tirando todas as dúvidas com carinho e paciência.
      </p>
    </section>

    <!-- Pilares de Confiança -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-3xl border border-primary/15 shadow-sm text-center space-y-3">
        <div class="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
          <ShieldCheck class="h-6 w-6 text-primary" />
        </div>
        <h3 class="text-lg font-bold text-primary">Produtos 100% Originais</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          Trabalhamos apenas com produtos originais e selecionados das melhores marcas de cosméticos e utilidades.
        </p>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-primary/15 shadow-sm text-center space-y-3">
        <div class="w-12 h-12 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mx-auto">
          <PhoneCall class="h-6 w-6 text-green-700" />
        </div>
        <h3 class="text-lg font-bold text-primary">Atendimento Humanizado</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          Sem robôs ou mensagens automáticas difíceis. Você fala diretamente conosco no WhatsApp de forma rápida e segura.
        </p>
      </div>

      <div class="bg-white p-6 rounded-3xl border border-primary/15 shadow-sm text-center space-y-3">
        <div class="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto">
          <Sparkles class="h-6 w-6 text-amber-700" />
        </div>
        <h3 class="text-lg font-bold text-primary">Feito com Amor</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          Cada produto e entrega é preparado com todo o carinho e dedicação especialmente para nossos clientes.
        </p>
      </div>
    </section>

    <!-- Contato e Localização -->
    <section class="bg-secondary/30 rounded-3xl p-6 sm:p-8 border border-primary/10 text-center space-y-6">
      <h2 class="text-2xl font-bold text-primary">
        Fale Conosco Sempre que Precisar
      </h2>

      <div class="flex flex-wrap justify-center gap-6 text-sm sm:text-base font-semibold text-gray-700">
        <div class="flex items-center gap-2">
          <MapPin class="h-5 w-5 text-primary flex-shrink-0" />
          <span>São Gabriel - RS</span>
        </div>
        <div class="flex items-center gap-2">
          <Clock class="h-5 w-5 text-primary flex-shrink-0" />
          <span>Atendimento Diário via WhatsApp</span>
        </div>
      </div>

      <!-- Botões de Ação -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto h-14 px-8 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-md flex items-center justify-center gap-3 transition-transform active:scale-95"
        >
          <MessageCircle class="h-6 w-6 flex-shrink-0" />
          <span>Chamar no WhatsApp</span>
        </a>

        <router-link
          to="/catalog"
          class="w-full sm:w-auto h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-md flex items-center justify-center gap-3 transition-transform active:scale-95"
        >
          <span>Ver Nossos Produtos</span>
          <ArrowRight class="h-5 w-5 flex-shrink-0" />
        </router-link>
      </div>
    </section>
  </div>
</template>
