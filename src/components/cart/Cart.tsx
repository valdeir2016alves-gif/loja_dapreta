import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function Cart() {
  const { items, isCartOpen, openCart, closeCart, removeItem, updateQuantity, clearCart } = useCartStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const whatsappMessage = encodeURIComponent(
    `Olá Loja da Preta! Gostaria de finalizar o meu pedido:\n\n${items
      .map((item) => `- ${item.quantity}x ${item.product.name} (R$ ${item.product.price.toFixed(2)})`)
      .join('\n')}\n\n*Total: R$ ${totalPrice.toFixed(2)}*`
  );
  const whatsappUrl = `https://wa.me/5555999911746?text=${whatsappMessage}`;

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          onClick={openCart}
          className="relative h-16 w-16 rounded-full bg-primary text-white shadow-xl hover:bg-primary/90 hover:scale-105 transition-all duration-300"
        >
          <ShoppingBag className="h-7 w-7" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-[12px] font-bold h-6 w-6 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {totalItems}
            </span>
          )}
        </Button>
      </div>

      {/* Cart Dialog */}
      <Dialog open={isCartOpen} onOpenChange={(open) => open ? openCart() : closeCart()}>
        <DialogContent className="max-w-md w-full max-h-[90vh] flex flex-col bg-white rounded-3xl p-6 gap-0">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-2xl font-bold text-primary flex items-center gap-2">
              <ShoppingBag className="h-6 w-6" /> Seu Carrinho
            </DialogTitle>
          </DialogHeader>

          <div className="flex-grow overflow-y-auto py-4 space-y-4 pr-2">
            {items.length === 0 ? (
              <div className="text-center py-10">
                <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Seu carrinho está vazio.</p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-primary text-primary hover:bg-primary/5 rounded-xl"
                  onClick={closeCart}
                >
                  Continuar Comprando
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-3 bg-secondary/20 rounded-2xl">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white flex-shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <h4 className="font-bold text-sm text-primary line-clamp-1">{item.product.name}</h4>
                      <p className="text-primary font-bold">R$ {item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center bg-white rounded-lg border border-primary/20">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-primary hover:bg-primary/10 rounded-l-lg"
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-7 w-7 text-primary hover:bg-primary/10 rounded-r-lg"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="pt-4 border-t mt-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-muted-foreground">Total:</span>
                <span className="text-2xl font-bold text-primary">R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex flex-col gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-lg rounded-xl shadow-lg shadow-green-600/20">
                    Finalizar no WhatsApp
                  </Button>
                </a>
                <Button 
                  variant="outline" 
                  className="w-full h-12 text-destructive border-destructive hover:bg-destructive/10 rounded-xl"
                  onClick={clearCart}
                >
                  Esvaziar Carrinho
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
