import { useState } from 'react';
import { useCustomerStore } from '@/store/useCustomerStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, ShoppingBag } from 'lucide-react';
import { SEO } from '@/components/SEO';

interface CustomerGateProps {
  children: React.ReactNode;
}

export function CustomerGate({ children }: CustomerGateProps) {
  const { isIdentified, identifyCustomer } = useCustomerStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      identifyCustomer(name.trim(), phone.trim());
    }
  };

  if (isIdentified) {
    return <>{children}</>;
  }

  return (
    <>
      <SEO title="Identifique-se" />
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-4 shadow-lg">
                <img src="/loja_dapreta/logo.jpg" alt="Loja da Preta" className="w-full h-full rounded-full object-cover" />
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2 flex items-center justify-center gap-2">
                Loja da Preta <Sparkles className="h-6 w-6 text-primary" />
              </h1>
              <p className="text-muted-foreground text-sm">
                Para acessar nosso catálogo e fazer seus pedidos de forma mais rápida, por favor, identifique-se abaixo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary font-bold">Qual o seu nome?</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Digite seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border-primary/20 h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-primary font-bold">Seu WhatsApp</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl border-primary/20 h-12"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-primary text-white hover:bg-primary/90 text-lg rounded-2xl shadow-lg shadow-primary/20"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Acessar a Loja
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Seus dados ficarão salvos apenas no seu dispositivo para facilitar futuras compras.
              </p>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
