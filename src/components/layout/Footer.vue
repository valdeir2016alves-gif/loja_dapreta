<script setup lang="ts">
import { MessageCircle, Lock } from 'lucide-vue-next';
</script>

<template>
  <footer class="bg-[#243b4f] pt-12 pb-6 text-gray-200 font-sans">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <!-- Coluna 1: Sobre a Loja -->
        <div>
          <h4 class="font-bold text-white mb-4 pb-2 border-b border-[#3d5a73] inline-block pr-8">
            Sobre a Loja
          </h4>
          <p class="text-sm leading-relaxed text-gray-300">
            Trabalhamos com produtos de qualidade, oferecendo um atendimento rápido e de confiança para você.
          </p>
        </div>

        <!-- Coluna 2: Atendimento -->
        <div>
          <h4 class="font-bold text-white mb-4 pb-2 border-b border-[#3d5a73] inline-block pr-8">
            Atendimento
          </h4>
          <ul class="flex flex-col gap-3 text-sm text-gray-300">
            <li>
              <a
                href="https://api.whatsapp.com/send/?phone=5555999911746&text=Ol%C3%A1%21+Vim+pelo+site+da+loja.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-white transition-colors flex items-center gap-1"
              >
                WhatsApp: (55) 99991-1746 <MessageCircle class="h-4 w-4" />
              </a>
            </li>
            <li>Atendimento online e entregas</li>
            <li>São Gabriel - RS</li>
          </ul>
        </div>

        <!-- Coluna 3: Redes Sociais -->
        <div>
          <h4 class="font-bold text-white mb-4 pb-2 border-b border-[#3d5a73] inline-block pr-8">
            Redes Sociais
          </h4>
          <div class="text-sm">
            <a
              href="https://www.facebook.com/people/Loja-da-Preta/61575780244892/?rdid=dA766IfOt12Zt6cf&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1NHuw1rSzF%2F"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white transition-colors flex items-center gap-1 text-gray-300"
            >
              Acompanhe nossa página no Facebook
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div class="border-t border-[#3d5a73] pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
        <p>© 2026 Loja da Preta. Todos os direitos reservados.</p>
        <router-link to="/admin" class="mt-4 sm:mt-0 hover:text-white transition-colors flex items-center gap-1">
          <Lock class="h-3 w-3" />
          Acesso Restrito
        </router-link>
      </div>
    </div>
  </footer>
</template>
