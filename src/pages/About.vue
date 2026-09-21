<script setup lang="ts">
import {
  MessageCircle,
  Heart,
  ShieldCheck,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  BookOpen,
} from 'lucide-vue-next';
import SpecularCard from '@/components/ui/SpecularCard.vue';
import AvonLogo from '@/components/icons/AvonLogo.vue';

const logoUrl = import.meta.env.BASE_URL + 'logo.jpg';
const whatsappUrl =
  'https://api.whatsapp.com/send/?phone=5555999911746&text=Ol%C3%A1%21+Vim+pela+p%C3%A1gina+Sobre+a+Loja+e+gostaria+de+fazer+um+pedido+Avon.&type=phone_number&app_absent=0';
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
    <section class="max-w-2xl mx-auto">
      <SpecularCard inner-class="p-6 sm:p-10 text-center space-y-4 shadow-md">
        <div class="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
          <Heart class="h-7 w-7 text-rose-500 fill-rose-500/20" />
        </div>

        <blockquote class="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed">
          “Trabalhamos com produtos de qualidade, oferecendo um atendimento rápido e de confiança para você.”
        </blockquote>

        <p class="text-sm sm:text-base text-gray-600 font-medium pt-2 border-t border-gray-100">
          Nosso compromisso é fazer você se sentir em casa, tirando todas as dúvidas com carinho e paciência.
        </p>
      </SpecularCard>
    </section>

    <!-- Card Consultora Avon Oficial -->
    <section class="max-w-2xl mx-auto">
      <SpecularCard
        inner-class="p-6 sm:p-8 text-center space-y-4 shadow-md bg-gradient-to-b from-rose-50/40 via-white to-white"
        primary-color="#ff2469"
      >
        <div class="flex justify-center mb-1">
          <div class="h-10 sm:h-12 w-36 sm:w-44 flex items-center justify-center">
            <AvonLogo class="h-full w-auto" />
          </div>
        </div>

        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-[#ff2469] font-bold text-xs sm:text-sm tracking-wide">
          <CheckCircle2 class="h-4 w-4" />
          <span>Consultora Oficial Avon</span>
        </div>

        <h2 class="text-xl sm:text-2xl font-black text-gray-900 leading-tight">
          Maria Iara (Preta) é Consultora Avon
        </h2>

        <p class="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto font-medium">
          Compre maquiagens, perfumaria, cuidados diários e produtos Avon 100% originais com quem tem experiência e oferece consultoria personalizada com todo o carinho e dedicação em São Gabriel - RS.
        </p>

        <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto h-12 sm:h-13 px-6 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-bold text-base shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <MessageCircle class="h-5 w-5 flex-shrink-0" />
            <span>Fazer Pedido no WhatsApp</span>
          </a>

          <router-link
            to="/catalog?cat=Kits%20Promocionais"
            class="w-full sm:w-auto h-12 sm:h-13 px-6 rounded-2xl border-2 border-primary/20 hover:bg-primary/5 text-primary font-bold text-base flex items-center justify-center gap-2 transition-colors"
          >
            <BookOpen class="h-5 w-5 flex-shrink-0" />
            <span>Ver Revista Avon</span>
          </router-link>
        </div>
      </SpecularCard>
    </section>

    <!-- Pilares de Confiança -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SpecularCard inner-class="p-6 text-center space-y-3" :initial-angle="0">
        <div class="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto">
          <ShieldCheck class="h-6 w-6 text-primary" />
        </div>
        <h3 class="text-lg font-bold text-primary">Produtos 100% Originais</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          Trabalhamos apenas com produtos originais e selecionados das melhores marcas de cosméticos e utilidades.
        </p>
      </SpecularCard>

      <SpecularCard inner-class="p-6 text-center space-y-3" :initial-angle="120">
        <div class="w-12 h-12 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mx-auto">
          <PhoneCall class="h-6 w-6 text-green-700" />
        </div>
        <h3 class="text-lg font-bold text-primary">Atendimento Humanizado</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          Sem robôs ou mensagens automáticas difíceis. Você fala diretamente conosco no WhatsApp de forma rápida e segura.
        </p>
      </SpecularCard>

      <SpecularCard inner-class="p-6 text-center space-y-3" :initial-angle="240">
        <div class="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto">
          <Sparkles class="h-6 w-6 text-amber-700" />
        </div>
        <h3 class="text-lg font-bold text-primary">Feito com Amor</h3>
        <p class="text-sm text-gray-600 leading-relaxed">
          Cada produto e entrega é preparado com todo o carinho e dedicação especialmente para nossos clientes.
        </p>
      </SpecularCard>
    </section>
  </div>
</template>
