import { useParams, Link } from 'react-router-dom';
import { useProductStore } from '@/store/useProductStore';
import { useCartStore } from '@/store/useCartStore';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ArrowLeft, Truck, ShieldCheck, RefreshCw, ShoppingBag } from 'lucide-react';
import { useLazyImage } from '@/hooks/useLazyImage';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = useProductStore((state) => state.getProductById(id || ""));
  const addItem = useCartStore((state) => state.addItem);
  const { imgRef, isInView, isLoaded, setIsLoaded } = useLazyImage(product?.image || "");

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Produto não encontrado</h2>
        <Link to="/catalog">
          <Button variant="default" className="bg-primary text-white">Voltar para o catálogo</Button>
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Olá Loja da Preta! Tenho interesse no produto: ${product.name} (R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}).`
  );
  const whatsappUrl = `https://wa.me/5555999911746?text=${whatsappMessage}`;

  return (
    <>
      <SEO 
        title={product.name} 
        description={product.shortDescription}
        image={product.image}
      />
      
      <div className="container mx-auto px-4 py-12">
        <Link to="/catalog" className="inline-flex items-center text-sm text-primary font-medium hover:underline mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para o catálogo
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Image Gallery */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-secondary/10 border border-primary/10 group">
            {isInView ? (
              <img
                ref={imgRef}
                src={product.image}
                alt={product.name}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                } group-hover:scale-105`}
              />
            ) : (
              <div ref={imgRef} className="w-full h-full" />
            )}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-secondary/20">
                <span className="text-muted-foreground">Carregando imagem...</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <Badge className="w-fit mb-4 bg-primary/10 text-primary border-none font-bold">
              {product.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-primary mb-6">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            
            <div className="prose prose-pink mb-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.fullDescription}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button 
                onClick={() => {
                  if (product) {
                    addItem(product);
                    alert("Produto adicionado ao carrinho com sucesso!");
                  }
                }}
                className="flex-1 h-14 bg-primary text-white hover:bg-primary/90 text-lg rounded-2xl shadow-lg shadow-primary/20"
              >
                <ShoppingBag className="mr-2 h-5 w-5" /> Adicionar ao Carrinho
              </Button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full h-14 border-primary/20 text-primary hover:bg-primary/5 text-lg rounded-2xl">
                  <MessageCircle className="mr-2 h-5 w-5" /> Contato WhatsApp
                </Button>
              </a>
            </div>


          </div>
        </div>
      </div>
    </>
  );
}
