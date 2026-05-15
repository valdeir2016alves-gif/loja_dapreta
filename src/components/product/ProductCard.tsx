import { Link } from 'react-router-dom';
import { type Product } from '@/types/product';
import { useLazyImage } from '@/hooks/useLazyImage';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { imgRef, isInView, isLoaded, setIsLoaded } = useLazyImage(product.image);

  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-300 group rounded-2xl bg-white">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-secondary/20">
        {isInView ? (
          <img
            ref={imgRef}
            src={product.image}
            alt={product.name}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ) : (
          <div ref={imgRef} className="w-full h-full" />
        )}
        
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/10 animate-pulse">
            <span className="text-xs text-muted-foreground">Carregando...</span>
          </div>
        )}

        <Badge className="absolute top-3 left-3 bg-white/90 text-primary border-none text-[10px] uppercase font-bold py-0.5 px-2">
          {product.category}
        </Badge>
      </Link>

      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-base mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-xs line-clamp-2 mb-3 h-8">
          {product.shortDescription}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link to={`/product/${product.id}`} className="flex-1">
          <Button variant="outline" className="w-full text-xs rounded-xl h-9 border-primary/20 hover:bg-primary/10 hover:text-primary">
            Ver detalhes
          </Button>
        </Link>
        <Button className="bg-primary text-white hover:bg-primary/90 h-9 w-9 p-0 rounded-xl">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
