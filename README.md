# 🎀 Bella Glow Cosméticos

Um e-commerce moderno e elegante de cosméticos, focado em alta performance e pronto para hospedagem estática no GitHub Pages.

## ✨ Funcionalidades

- 🛍️ **Catálogo de Produtos**: Grade responsiva com filtros por categoria e busca em tempo real.
- 🔍 **Busca e Ordenação**: Encontre produtos por nome e ordene por preço ou ordem alfabética.
- 📱 **Mobile First**: Design totalmente responsivo e otimizado para todos os dispositivos.
- 🛠️ **Painel Admin Local**: Gerenciamento completo de produtos (CRUD) salvo no seu navegador via LocalStorage.
- 🚀 **Performance**: Imagens com Lazy Loading e componentes leves.
- 💬 **Contato Direto**: Botão de WhatsApp dinâmico na página de cada produto.

## 🛠️ Tecnologias Utilizadas

- **React 18/19** + **TypeScript**
- **Vite** (Build tool rápida)
- **Tailwind CSS** (Estilização moderna)
- **shadcn/ui** (Componentes de interface premium)
- **Zustand** (Gerenciamento de estado leve)
- **Lucide React** (Ícones elegantes)
- **React Router DOM** (Navegação dinâmica)
- **React Helmet Async** (Otimização SEO)

## 🚀 Como Executar Localmente

1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse `http://localhost:5173` no seu navegador.

## 📦 Como Publicar no GitHub Pages

1. Certifique-se de que o campo `base` no arquivo `vite.config.ts` corresponde ao nome do seu repositório.
2. Execute o comando de deploy:
   ```bash
   npm run deploy
   ```
3. O projeto será buildado e enviado automaticamente para o branch `gh-pages`.

## 📁 Estrutura de Pastas

```
src/
  components/  # Componentes reutilizáveis e UI
  pages/       # Telas principais da aplicação
  data/        # Mock de dados iniciais
  hooks/       # Hooks personalizados (Lazy Image, etc)
  store/       # Gerenciamento de estado (Zustand)
  types/       # Definições de tipos TypeScript
  utils/       # Funções utilitárias
```

## 🧴 Bella Glow Cosméticos
Realçando sua beleza natural com sofisticação.
