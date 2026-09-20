<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import {
  Plus,
  Pencil,
  Trash2,
  LayoutDashboard,
  Package,
  Lock,
  Upload,
  Image as ImageIcon,
  Download,
  X,
} from 'lucide-vue-next';
import { useProductStore } from '@/store/useProductStore';
import { compressImage } from '@/lib/imageUtils';
import type { Product } from '@/types/product';

const ADMIN_PASSWORD = 'lojapreta2026';

const productStore = useProductStore();

// Auth State
const isAuthenticated = ref(sessionStorage.getItem('adminAuth') === 'true');
const passwordInput = ref('');
const loginError = ref(false);

// Dialog State
const isDialogOpen = ref(false);
const editingProductId = ref<string | null>(null);
const isUploading = ref(false);

// Category State
const newCategoryName = ref('');

// Product Form State
const formData = reactive<Omit<Product, 'id'>>({
  name: '',
  category: 'Maquiagem',
  price: 0,
  image: '',
  shortDescription: '',
  fullDescription: '',
  isFeatured: false,
});

const products = computed(() => productStore.products);
const categories = computed(() => productStore.categories);

function handleLogin(e: Event) {
  e.preventDefault();
  if (passwordInput.value === ADMIN_PASSWORD) {
    isAuthenticated.value = true;
    sessionStorage.setItem('adminAuth', 'true');
    loginError.value = false;
  } else {
    loginError.value = true;
  }
}

function handleLogout() {
  isAuthenticated.value = false;
  sessionStorage.removeItem('adminAuth');
}

function handleOpenAdd() {
  editingProductId.value = null;
  formData.name = '';
  formData.category = categories.value[0] || 'Sem Categoria';
  formData.price = 0;
  formData.image = '';
  formData.shortDescription = '';
  formData.fullDescription = '';
  formData.isFeatured = false;
  isDialogOpen.value = true;
}

function handleOpenEdit(product: Product) {
  editingProductId.value = product.id;
  formData.name = product.name;
  formData.category = product.category;
  formData.price = product.price;
  formData.image = product.image;
  formData.shortDescription = product.shortDescription;
  formData.fullDescription = product.fullDescription;
  formData.isFeatured = product.isFeatured || false;
  isDialogOpen.value = true;
}

function handleCloseDialog() {
  isDialogOpen.value = false;
}

async function handleFileUpload(e: Event) {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  try {
    isUploading.value = true;
    const compressed = await compressImage(file);
    formData.image = compressed;
  } catch (err) {
    console.error('Erro ao processar imagem:', err);
    alert('Não foi possível carregar esta imagem. Tente outro arquivo.');
  } finally {
    isUploading.value = false;
    target.value = '';
  }
}

function handleSubmit() {
  if (!formData.image.trim()) {
    alert('Por favor, adicione uma foto para o produto (escolhendo do dispositivo ou inserindo o link).');
    return;
  }

  if (editingProductId.value) {
    productStore.updateProduct(editingProductId.value, {
      ...formData,
      id: editingProductId.value,
    });
  } else {
    const newProduct: Product = {
      ...formData,
      id: Math.random().toString(36).substring(2, 11),
    };
    productStore.addProduct(newProduct);
  }

  isDialogOpen.value = false;
}

function handleDeleteProduct(id: string, name: string) {
  if (confirm(`Deseja realmente excluir o produto "${name}"?`)) {
    productStore.deleteProduct(id);
  }
}

function handleAddCategory() {
  const name = newCategoryName.value.trim();
  if (name) {
    productStore.addCategory(name);
    newCategoryName.value = '';
  }
}

function handleDeleteCategory(cat: string) {
  if (confirm(`Deseja excluir a categoria "${cat}"? Os produtos associados ficarão como "Sem Categoria".`)) {
    productStore.deleteCategory(cat);
  }
}

function handleExportBackup() {
  const data = localStorage.getItem('bella-glow-products');
  if (!data) {
    alert('Nenhum dado encontrado para exportar.');
    return;
  }
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `loja_dapreta_produtos_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function handleImportBackup(e: Event) {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const content = event.target?.result as string;
      const parsed = JSON.parse(content);
      if (parsed && (parsed.state || parsed.products)) {
        const dataToSave = parsed.state ? content : JSON.stringify({ state: parsed, version: 0 });
        localStorage.setItem('bella-glow-products', dataToSave);
        alert('Produtos e categorias importados com sucesso! A página será recarregada.');
        window.location.reload();
      } else {
        alert('Arquivo de catálogo inválido.');
      }
    } catch (err) {
      console.error('Erro ao importar arquivo:', err);
      alert('Erro ao processar o arquivo selecionado.');
    }
  };
  reader.readAsText(file);
  target.value = '';
}
</script>

<template>
  <div>
    <!-- Login Screen -->
    <div
      v-if="!isAuthenticated"
      class="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]"
    >
      <div class="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm max-w-md w-full text-center">
        <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock class="h-8 w-8" />
        </div>
        <h1 class="text-2xl font-bold text-primary mb-2">Acesso Restrito</h1>
        <p class="text-muted-foreground mb-8 text-sm">Digite a senha administrativa para gerenciar o catálogo.</p>

        <form @submit="handleLogin" class="space-y-4 text-left">
          <div class="space-y-2">
            <label for="password" class="text-xs font-semibold text-muted-foreground">Senha</label>
            <input
              id="password"
              type="password"
              v-model="passwordInput"
              class="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
              placeholder="••••••••"
              required
            />
            <p v-if="loginError" class="text-destructive text-sm mt-1">Senha incorreta.</p>
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-xl font-semibold transition-colors"
          >
            Acessar Painel
          </button>
        </form>
      </div>
    </div>

    <!-- Authenticated Admin Dashboard -->
    <div v-else class="container mx-auto px-4 py-12">
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
        <div>
          <h1 class="text-4xl font-bold text-primary flex items-center gap-3">
            <LayoutDashboard class="h-8 w-8" /> Dashboard Administrativo
          </h1>
          <p class="text-muted-foreground mt-1">Gerencie seu catálogo de produtos Loja da Preta.</p>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <!-- Exportar Dados -->
          <button
            type="button"
            @click="handleExportBackup"
            class="rounded-xl h-12 px-4 border border-primary/20 hover:bg-primary/10 text-primary font-semibold text-sm transition-colors flex items-center gap-2"
            title="Baixar arquivo com todos os produtos"
          >
            <Download class="h-4 w-4" /> Exportar Dados
          </button>

          <!-- Importar Dados -->
          <label
            class="inline-flex items-center justify-center rounded-xl h-12 px-4 border border-primary/20 hover:bg-primary/10 text-primary font-semibold text-sm cursor-pointer transition-colors gap-2"
          >
            <Upload class="h-4 w-4" /> Importar Dados
            <input
              type="file"
              accept=".json"
              class="hidden"
              @change="handleImportBackup"
            />
          </label>

          <!-- Novo Produto -->
          <button
            type="button"
            @click="handleOpenAdd"
            class="bg-primary text-white hover:bg-primary/90 rounded-xl h-12 px-6 font-semibold flex items-center gap-2 transition-colors shadow-md"
          >
            <Plus class="h-5 w-5" /> Novo Produto
          </button>

          <!-- Logout -->
          <button
            type="button"
            @click="handleLogout"
            class="rounded-xl h-12 px-4 text-xs font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>

      <!-- Stats Summary -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div class="bg-white p-6 rounded-3xl border border-primary/10 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-muted-foreground text-sm font-medium">Total de Produtos</p>
            <h3 class="text-3xl font-bold text-primary mt-1">{{ products.length }}</h3>
          </div>
          <Package class="h-10 w-10 text-primary/20" />
        </div>

        <div class="bg-white p-6 rounded-3xl border border-primary/10 shadow-sm flex items-center justify-between">
          <div>
            <p class="text-muted-foreground text-sm font-medium">Total de Categorias</p>
            <h3 class="text-3xl font-bold text-primary mt-1">{{ categories.length }}</h3>
          </div>
          <LayoutDashboard class="h-10 w-10 text-primary/20" />
        </div>
      </div>

      <!-- Category Management Section -->
      <div class="bg-white p-6 rounded-3xl border border-primary/10 shadow-sm mb-12">
        <h2 class="text-xl font-bold text-primary mb-4">Gerenciar Categorias</h2>
        <div class="flex flex-wrap gap-2 mb-6">
          <div
            v-for="cat in categories"
            :key="cat"
            class="flex items-center gap-2 bg-secondary/30 text-primary px-3 py-1.5 rounded-xl text-sm font-medium border border-primary/10"
          >
            <span>{{ cat }}</span>
            <button
              type="button"
              @click="handleDeleteCategory(cat)"
              class="text-muted-foreground hover:text-destructive transition-colors"
              title="Excluir categoria"
            >
              <Trash2 class="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <form @submit.prevent="handleAddCategory" class="flex gap-3 max-w-md">
          <input
            v-model="newCategoryName"
            type="text"
            placeholder="Nova categoria..."
            class="flex-1 px-4 py-2.5 rounded-xl border border-primary/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            class="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Adicionar
          </button>
        </form>
      </div>

      <!-- Products Table / List -->
      <div class="bg-white rounded-3xl border border-primary/10 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-border">
          <h2 class="text-xl font-bold text-primary">Produtos Cadastrados</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-secondary/20 text-xs uppercase font-bold text-muted-foreground border-b border-border">
              <tr>
                <th class="p-4 pl-6">Produto</th>
                <th class="p-4">Categoria</th>
                <th class="p-4">Preço</th>
                <th class="p-4 text-right pr-6">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-border">
              <tr v-if="products.length === 0">
                <td colspan="4" class="p-8 text-center text-muted-foreground">
                  Nenhum produto cadastrado ainda. Clique em "+ Novo Produto".
                </td>
              </tr>
              <tr v-for="prod in products" :key="prod.id" class="hover:bg-secondary/10 transition-colors">
                <td class="p-4 pl-6 flex items-center gap-3">
                  <img
                    :src="prod.image"
                    :alt="prod.name"
                    class="w-12 h-12 rounded-xl object-cover bg-secondary/20 border border-border flex-shrink-0"
                  />
                  <div>
                    <div class="font-bold text-primary">{{ prod.name }}</div>
                    <div class="text-xs text-muted-foreground line-clamp-1">{{ prod.shortDescription }}</div>
                  </div>
                </td>
                <td class="p-4">
                  <span class="px-2.5 py-1 rounded-md bg-secondary/40 text-primary text-xs font-semibold">
                    {{ prod.category }}
                  </span>
                </td>
                <td class="p-4 font-bold text-primary whitespace-nowrap">
                  R$ {{ prod.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
                </td>
                <td class="p-4 text-right pr-6 whitespace-nowrap">
                  <button
                    type="button"
                    @click="handleOpenEdit(prod)"
                    class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors mr-1"
                    title="Editar produto"
                  >
                    <Pencil class="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    @click="handleDeleteProduct(prod.id, prod.name)"
                    class="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    title="Excluir produto"
                  >
                    <Trash2 class="h-4 w-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Product Modal (Add / Edit) -->
    <div
      v-if="isDialogOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      @click.self="handleCloseDialog"
    >
      <div
        class="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200"
      >
        <div class="flex items-center justify-between pb-4 border-b">
          <h3 class="text-2xl font-bold text-primary">
            {{ editingProductId ? 'Editar Produto' : 'Cadastrar Novo Produto' }}
          </h3>
          <button
            type="button"
            @click="handleCloseDialog"
            class="p-2 text-muted-foreground hover:bg-secondary/40 rounded-xl"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <!-- Nome -->
          <div class="space-y-2">
            <label class="text-xs font-semibold text-muted-foreground">Nome do Produto *</label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="w-full px-4 py-3 rounded-xl border border-primary/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Ex: Perfume Floral 100ml"
            />
          </div>

          <!-- Categoria -->
          <div class="space-y-2">
            <label class="text-xs font-semibold text-muted-foreground">Categoria *</label>
            <select
              v-model="formData.category"
              class="w-full px-4 py-3 rounded-xl border border-primary/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer bg-white"
            >
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <!-- Preço -->
          <div class="space-y-2 md:col-span-2">
            <label class="text-xs font-semibold text-muted-foreground">Preço (R$) *</label>
            <input
              v-model.number="formData.price"
              type="number"
              step="0.01"
              required
              class="w-full px-4 py-3 rounded-xl border border-primary/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="0,00"
            />
          </div>

          <!-- Foto do Produto (Upload direto + Preview) -->
          <div class="space-y-2 md:col-span-2">
            <label class="text-xs font-semibold text-muted-foreground">Foto do Produto *</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start border border-primary/15 bg-primary/[0.02] p-4 rounded-2xl">
              <!-- Upload e URL alternativo -->
              <div class="space-y-3">
                <label
                  class="flex flex-col items-center justify-center border-2 border-dashed border-primary/30 hover:border-primary/60 bg-white hover:bg-primary/5 transition-colors rounded-2xl p-4 cursor-pointer text-center group shadow-sm"
                >
                  <Upload class="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <span class="text-sm font-semibold text-primary">
                    {{ isUploading ? 'Otimizando foto...' : 'Escolher Foto do Dispositivo' }}
                  </span>
                  <span class="text-[11px] text-muted-foreground mt-1">
                    Selecionar do computador ou celular
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    :disabled="isUploading"
                    @change="handleFileUpload"
                  />
                </label>

                <div class="flex items-center gap-2">
                  <div class="h-px bg-border flex-1" />
                  <span class="text-[11px] text-muted-foreground">ou cole um link</span>
                  <div class="h-px bg-border flex-1" />
                </div>

                <input
                  v-model="formData.image"
                  type="text"
                  placeholder="https://... ou caminho local"
                  class="w-full px-3 py-2 rounded-xl border border-primary/20 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <!-- Preview da Imagem -->
              <div class="border border-border rounded-2xl p-3 bg-white flex flex-col items-center justify-center min-h-[160px] text-center">
                <div v-if="formData.image" class="w-full flex flex-col items-center gap-2">
                  <img
                    :src="formData.image"
                    alt="Pré-visualização"
                    class="h-32 w-auto max-w-full object-contain rounded-xl shadow-sm border border-border bg-muted/10"
                  />
                  <button
                    type="button"
                    @click="formData.image = ''"
                    class="text-xs text-destructive hover:underline flex items-center gap-1 font-medium"
                  >
                    <Trash2 class="h-3 w-3" /> Remover foto
                  </button>
                </div>
                <div v-else class="text-muted-foreground p-3 flex flex-col items-center">
                  <ImageIcon class="h-8 w-8 mb-1 opacity-40 text-primary" />
                  <p class="text-xs font-medium">Nenhuma foto selecionada</p>
                  <p class="text-[11px] text-muted-foreground mt-0.5">Faça upload ou cole um link</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Descrição Curta -->
          <div class="space-y-2 md:col-span-2">
            <label class="text-xs font-semibold text-muted-foreground">Descrição Curta *</label>
            <input
              v-model="formData.shortDescription"
              type="text"
              required
              class="w-full px-4 py-3 rounded-xl border border-primary/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Breve resumo para o card do produto"
            />
          </div>

          <!-- Descrição Completa -->
          <div class="space-y-2 md:col-span-2">
            <label class="text-xs font-semibold text-muted-foreground">Descrição Completa *</label>
            <textarea
              v-model="formData.fullDescription"
              rows="4"
              required
              class="w-full px-4 py-3 rounded-xl border border-primary/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Informações detalhadas sobre o produto, modo de uso, benefícios..."
            />
          </div>

          <!-- Modal Footer -->
          <div class="md:col-span-2 mt-4 flex items-center justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              @click="handleCloseDialog"
              class="px-5 py-2.5 rounded-xl border border-border text-muted-foreground hover:bg-secondary/40 font-medium text-sm transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-6 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 font-semibold text-sm transition-colors shadow-sm"
            >
              {{ editingProductId ? 'Salvar Alterações' : 'Cadastrar Produto' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
