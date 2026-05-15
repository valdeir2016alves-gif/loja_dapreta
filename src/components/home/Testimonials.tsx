import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ana Silva",
    text: "Os produtos da Bella Glow transformaram minha rotina de skincare. O sérum é simplesmente divino!",
    rating: 5,
    role: "Cliente fiel"
  },
  {
    id: 2,
    name: "Mariana Costa",
    text: "Entrega super rápida e embalagem caprichada. O perfume Midnight Rose é meu novo favorito.",
    rating: 5,
    role: "Cliente desde 2024"
  },
  {
    id: 3,
    name: "Julia Pereira",
    text: "Melhor custo-benefício que já encontrei. A pigmentação das sombras é de nível profissional.",
    rating: 4,
    role: "Maquiadora"
  }
];

export function Testimonials() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">O que dizem nossas clientes</h2>
          <p className="text-muted-foreground">Depoimentos reais de quem já usa e ama Bella Glow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="bg-secondary/20 p-8 rounded-3xl relative animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < t.rating ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`} 
                  />
                ))}
              </div>
              <p className="italic mb-6 text-muted-foreground leading-relaxed">"{t.text}"</p>
              <div>
                <h4 className="font-bold text-primary">{t.name}</h4>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
