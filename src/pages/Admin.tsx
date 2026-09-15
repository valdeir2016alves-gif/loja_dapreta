import { useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { type Product, type Category } from '@/types/product';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Pencil, Trash2, LayoutDashboard, Package, Lock, Upload, Image as ImageIcon } from 'lucide-react';
import { compressImage } from '@/lib/imageUtils';

const ADMIN_PASSWORD = "lojapreta2026"; // Senha padrão simples


export function Admin() {
  const { products, addProduct, updateProduct, deleteProduct, categories, addCategory, deleteCategory } = useProductStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [newCategoryName, setNewCategoryName] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const compressed = await compressImage(file);
      setFormData((prev) => ({ ...prev, image: compressed }));
    } catch (err) {
      console.error('Erro ao processar imagem:', err);
      alert('Não foi possível carregar esta imagem. Tente outro arquivo.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };
  
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('adminAuth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    category: 'Maquiagem',
    price: 0,
    image: '',
    shortDescription: '',
    fullDescription: '',
    isFeatured: false,
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: categories[0] || 'Sem Categoria',
      price: 0,
      image: '',
      shortDescription: '',
      fullDescription: '',
      isFeatured: false,
    });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      isFeatured: product.isFeatured || false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image.trim()) {
      alert('Por favor, adicione uma foto para o produto (escolhendo do dispositivo ou informando o link).');
      return;
    }
    if (editingProduct) {
      updateProduct(editingProduct.id, { ...formData, id: editingProduct.id });
    } else {
      const newProduct: Product = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      };
      addProduct(newProduct);
    }
    setIsDialogOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <SEO title="Login Administrativo" />
        <div className="container mx-auto px-4 py-20 flex justify-center items-center min-h-[60vh]">
          <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm max-w-md w-full text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-primary mb-2">Acesso Restrito</h1>
            <p className="text-muted-foreground mb-8 text-sm">Digite a senha administrativa para gerenciar o catálogo.</p>
            
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="rounded-xl border-primary/20"
                  placeholder="••••••••"
                />
                {loginError && <p className="text-destructive text-sm mt-1">Senha incorreta.</p>}
              </div>
              <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90 h-12 rounded-xl">
                Acessar Painel
              </Button>
            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Painel Administrativo" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary flex items-center gap-3">
              <LayoutDashboard className="h-8 w-8" /> Dashboard Administrativo
            </h1>
            <p className="text-muted-foreground mt-1">Gerencie seu catálogo de produtos Bella Glow.</p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger
              render={
                <Button onClick={handleOpenAdd} className="bg-primary text-white hover:bg-primary/90 rounded-xl h-12 px-6">
                  <Plus className="mr-2 h-5 w-5" /> Novo Produto
                </Button>
              }
            />
            <DialogContent className="max-w-2xl bg-white rounded-3xl sm:rounded-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-primary">
                  {editingProduct ? 'Editar Produto' : 'Cadastrar Novo Produto'}
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="rounded-xl border-primary/20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(val: Category | null) => { if (val) setFormData({...formData, category: val}) }}
                  >
                    <SelectTrigger className="rounded-xl border-primary/20">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    step="0.01" 
                    required 
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                    className="rounded-xl border-primary/20"
                  />
                </div>

                {/* Seção da Imagem / Upload */}
                <div className="space-y-2 md:col-span-2">
                  <Label>Foto do Produto *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start border border-primary/15 bg-primary/[0.02] p-4 rounded-2xl">
                    {/* Botão de Upload e campo alternativo de URL */}
                    <div className="space-y-3">
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-primary/30 hover:border-primary/60 bg-white hover:bg-primary/5 transition-colors rounded-2xl p-4 cursor-pointer text-center group shadow-sm">
                        <Upload className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-primary">
                          {isUploading ? 'Otimizando foto...' : 'Escolher Foto do Dispositivo'}
                        </span>
                        <span className="text-[11px] text-muted-foreground mt-1">
                          Selecionar do computador ou celular
                        </span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          disabled={isUploading}
                          onChange={handleFileUpload} 
                        />
                      </label>

                      <div className="flex items-center gap-2">
                        <div className="h-px bg-border flex-1" />
                        <span className="text-[11px] text-muted-foreground">ou cole um link</span>
                        <div className="h-px bg-border flex-1" />
                      </div>

                      <Input 
                        id="image" 
                        placeholder="https://... ou caminho local"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="rounded-xl border-primary/20 text-xs h-9"
                      />
                    </div>

                    {/* Preview da Imagem */}
                    <div className="border border-border rounded-2xl p-3 bg-white flex flex-col items-center justify-center min-h-[160px] text-center">
                      {formData.image ? (
                        <div className="w-full flex flex-col items-center gap-2">
                          <img 
                            src={formData.image} 
                            alt="Pré-visualização do produto" 
                            className="h-32 w-auto max-w-full object-contain rounded-xl shadow-sm border border-border bg-muted/10"
                          />
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, image: '' })}
                            className="text-xs text-destructive hover:underline flex items-center gap-1 font-medium"
                          >
                            <Trash2 className="h-3 w-3" /> Remover foto
                          </button>
                        </div>
                      ) : (
                        <div className="text-muted-foreground p-3 flex flex-col items-center">
                          <ImageIcon className="h-8 w-8 mb-1 opacity-40 text-primary" />
                          <p className="text-xs font-medium">Nenhuma foto selecionada</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">Faça upload ou cole um link para pré-visualizar</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="shortDesc">Descrição Curta</Label>
                  <Input 
                    id="shortDesc" 
                    required 
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                    className="rounded-xl border-primary/20"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="fullDesc">Descrição Completa</Label>
                  <Textarea 
                    id="fullDesc" 
                    required 
                    rows={4}
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                    className="rounded-xl border-primary/20"
                  />
                </div>

                <DialogFooter className="md:col-span-2 mt-4">
                  <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
                    {editingProduct ? 'Salvar Alterações' : 'Cadastrar Produto'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-primary/10 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-muted-foreground text-sm">Total de Produtos</p>
                <h3 className="text-3xl font-bold text-primary mt-1">{products.length}</h3>
              </div>
              <Package className="h-10 w-10 text-primary/20" />
            </div>
          </div>
          
          {/* Gerenciador de Categorias */}
          <div className="bg-white p-6 rounded-3xl border border-primary/10 shadow-sm flex flex-col h-[250px]">
            <p className="text-muted-foreground text-sm mb-2">Gerenciar Categorias ({categories.length})</p>
            <div className="flex gap-2 mb-4">
              <Input 
                placeholder="Nova categoria" 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="rounded-xl"
              />
              <Button 
                onClick={() => {
                  if(newCategoryName.trim()){
                    addCategory(newCategoryName.trim());
                    setNewCategoryName("");
                  }
                }}
                className="rounded-xl bg-primary text-white"
              >
                Adicionar
              </Button>
            </div>
            <div className="flex-grow overflow-y-auto pr-2 space-y-2">
              {categories.map(cat => (
                <div key={cat} className="flex justify-between items-center bg-secondary/30 px-3 py-2 rounded-lg">
                  <span className="text-sm font-medium">{cat}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:bg-destructive/10" onClick={() => deleteCategory(cat)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl border border-primary/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-secondary/20 border-b border-primary/10">
                <tr>
                  <th className="px-6 py-4 font-bold text-primary text-sm">Produto</th>
                  <th className="px-6 py-4 font-bold text-primary text-sm">Categoria</th>
                  <th className="px-6 py-4 font-bold text-primary text-sm">Preço</th>
                  <th className="px-6 py-4 font-bold text-primary text-sm text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-primary/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg overflow-hidden bg-secondary/30 flex-shrink-0">
                          <img src={product.image} alt="" className="h-full w-full object-cover" />
                        </div>
                        <span className="font-medium text-sm line-clamp-1">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-secondary px-2 py-1 rounded-full text-primary font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">
                      R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleOpenEdit(product)}
                          className="h-8 w-8 text-muted-foreground hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteProduct(product.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {products.length === 0 && (
            <div className="py-20 text-center">
              <Package className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum produto cadastrado.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
