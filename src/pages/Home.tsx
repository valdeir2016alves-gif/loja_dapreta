import { Link } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';


import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Home() {
  const products = useProductStore((state) => state.products);


  const storeCategories = useProductStore((state) => state.categories);

  return (
    <>
      <SEO title="Início - Realce sua beleza" />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden bg-background">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left duration-700">
            <h1 className="text-5xl md:text-7xl font-bold text-primary leading-tight mb-6">
              Sua beleza <br /> merece brilhar
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Revendedora de produtos Avon, oferecendo cosméticos, perfumes, maquiagens e itens de cuidados pessoais
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-full px-8 h-14 text-lg">
                  Explorar Catálogo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg border-primary text-primary hover:bg-primary/10">
                Sobre Nós
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-primary">Nossas Categorias</h2>
            <Link to="/catalog" className="text-primary font-medium hover:underline flex items-center gap-1">
              Ver todas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {storeCategories.slice(0, 4).map((catName) => (
              <Link 
                key={catName} 
                to={`/catalog?cat=${catName}`}
                className="group flex flex-col items-center p-8 rounded-3xl bg-secondary/20 hover:bg-primary/10 transition-all duration-300"
              >
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  <Sparkles />
                </div>
                <h3 className="font-bold text-primary text-center">{catName}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
