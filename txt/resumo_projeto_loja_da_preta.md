# Resumo Geral do Projeto - Loja da Preta
Data de Registro: 20/09/2026

## 1. Visão Geral e Arquitetura
- **Nome Oficial da Loja:** Loja da Preta
- **Público-Alvo:** Focado em celular e acessibilidade para pessoas com mais idade (meia-idade e terceira idade).
- **Localização:** São Gabriel - RS
- **WhatsApp Oficial:** (55) 99991-1746
- **Tecnologia Atual:** Vue 3 (Composition API com `<script setup>`, Vite, Vue Router com HashMode, Pinia Stores, Tailwind CSS).
  - *Redução de peso:* Bundle JS de apenas 148 kB (redução de 69% em relação ao React anterior).
  - *Velocidade:* Build em ~3-4 segundos.

## 2. Hospedagem & Cloudflare
- **Plataforma:** Cloudflare Workers & Pages (100% Gratuito, tráfego ilimitado e SSL automático).
- **Nome do Projeto no Cloudflare:** `lojadapreta-oficial`
- **Arquivo de Configuração:** `wrangler.toml` configurado para SPA apontando para `./dist`.

## 3. Painel Administrativo
- **Rota:** `/#/admin`
- **Senha de Acesso Padrão:** `lojapreta2026`
- **Funcionalidades:**
  - Cadastro, edição e exclusão de produtos e categorias.
  - Upload direto de fotos do computador/celular com redimensionamento e compressão automática em Canvas para não pesar a memória.
  - Pré-visualização da imagem em tempo real.
  - Botões **Exportar Dados** e **Importar Dados** (Backup JSON) para transferir facilmente os produtos entre localhost e Cloudflare.

## 4. Recursos Visuais & Acessibilidade
- **Tipografia:** Fontes grandes com alto contraste para facilitar leitura.
- **Barra Fixa Inferior no Celular (`BottomNav.vue`):** Início, Produtos, Botão Central do WhatsApp e Carrinho sempre ao alcance do polegar.
- **Botões Grandes:** Áreas de toque com altura mínima de 48px a 64px.
- **Imagens Padronizadas no Estúdio:**
  - `public/produtos/sabonete-encanto-mix.jpg`
  - `public/produtos/sabonete-encanto-azul.jpg`
  - `public/produtos/locao-erva-doce.jpg`
  - `public/produtos/jarra-eletrica.jpg`
  - Novas imagens do usuário salvas: Corton, Desodorantes Roll-on, Lixeira Plasvale, Revista Ciclo 16 e Banner Dia das Crianças.
- **Foto da Logo:** Atualizada com a foto acolhedora da Preta (`public/logo.jpg`).

## 5. Instruções para o Estúdio de Fotos
- Arquivo de diretrizes salvo em: `txt/instrucoes_estudio_fotos.txt`.
- Para gerar novas fotos de produtos no mesmo fundo, basta abrir uma nova conversa e anexar a foto solicitando o padrão de estúdio.

## 6. Próximo Passo ao Retornar
- Enviar os 2 commits locais pendentes para o GitHub:
  `git push origin main`
- Validar se o Cloudflare atualizou com a nova versão Vue 3 e as fotos novas.
