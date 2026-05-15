import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import { ProductCard } from '@/components/product/ProductCard';
import { SEO } from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { type Category, type SortOption } from '@/types/product';
import { Search, FilterX } from 'lucide-react';


export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useProductStore((state) => state.products);
  const storeCategories = useProductStore((state) => state.categories);
  const CATEGORIES = ["All", ...storeCategories];
  
  const [search, setSearch] = useState("");
  const currentCategory = (searchParams.get("cat") as Category | "All") || "All";
  const sortBy = (searchParams.get("sort") as SortOption) || "alphabetical";

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = currentCategory === "All" || p.category === currentCategory;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "alphabetical") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, search, currentCategory, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setSearchParams((prev) => {
      if (cat === "All") prev.delete("cat");
      else prev.set("cat", cat);
      return prev;
    });
  };

  const handleSortChange = (sort: SortOption) => {
    setSearchParams((prev) => {
      prev.set("sort", sort);
      return prev;
    });
  };

  const resetFilters = () => {
    setSearch("");
    setSearchParams({});
  };

  return (
    <>
      <SEO title="Catálogo - Todos os Produtos" />
      
      <section className="py-12 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-8">Nossos Produtos</h1>
          
          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-10 items-end lg:items-center">
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar produtos..." 
                className="pl-10 rounded-xl border-primary/20 bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={currentCategory === cat ? "default" : "outline"}
                  className={`rounded-full whitespace-nowrap px-6 h-10 ${
                    currentCategory === cat ? 'bg-primary text-white' : 'border-primary/20 text-primary hover:bg-primary/5'
                  }`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat === "All" ? "Todos" : cat}
                </Button>
              ))}
            </div>

            <div className="ml-auto w-full lg:w-48">
              <Select value={sortBy} onValueChange={(val: SortOption | null) => { if (val) handleSortChange(val) }}>
                <SelectTrigger className="rounded-xl border-primary/20 bg-white text-primary">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alphabetical">Ordem Alfabética</SelectItem>
                  <SelectItem value="price-asc">Menor Preço</SelectItem>
                  <SelectItem value="price-desc">Maior Preço</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredProducts.length} de {products.length} produtos
            </p>
            {(search || currentCategory !== "All" || sortBy !== "alphabetical") && (
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-primary hover:text-primary/80">
                <FilterX className="mr-2 h-3 w-3" /> Limpar filtros
              </Button>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-primary/20">
              <h3 className="text-xl font-bold text-primary mb-2">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground">Tente ajustar sua busca ou filtros.</p>
              <Button onClick={resetFilters} variant="link" className="text-primary mt-4">
                Voltar para o catálogo completo
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
