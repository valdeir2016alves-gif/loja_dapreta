import { type Product } from '../types/product';

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Batom Matte Elegance",
    category: "Maquiagem",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=800&auto=format&fit=crop",
    shortDescription: "Batom matte de longa duração com acabamento aveludado.",
    fullDescription: "O Batom Matte Elegance oferece uma cor intensa e duradoura, mantendo os lábios hidratados com sua fórmula enriquecida com vitamina E.",
    isFeatured: true
  },
  {
    id: "2",
    name: "Sérum Facial Glow",
    category: "Skincare",
    price: 89.90,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop",
    shortDescription: "Sérum iluminador com Vitamina C e Ácido Hialurônico.",
    fullDescription: "Recupere a luminosidade da sua pele com o Sérum Facial Glow. Sua fórmula potente combate os sinais de fadiga e hidrata profundamente.",
    isFeatured: true
  },
  {
    id: "3",
    name: "Perfume Midnight Rose",
    category: "Perfumes",
    price: 189.00,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop",
    shortDescription: "Fragrância floral intensa e sofisticada.",
    fullDescription: "Midnight Rose é um perfume marcante, com notas de rosa damascena e um toque de baunilha, perfeito para noites inesquecíveis.",
    isFeatured: true
  },
  {
    id: "4",
    name: "Máscara de Hidratação Profunda",
    category: "Cabelos",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1527799822344-42ad8c56272b?w=800&auto=format&fit=crop",
    shortDescription: "Tratamento intenso para cabelos secos e danificados.",
    fullDescription: "Nossa máscara de hidratação devolve o brilho e a maciez aos fios desde a primeira aplicação, com óleo de argan puro.",
    isFeatured: false
  },
  {
    id: "5",
    name: "Loção Corporal Sativa",
    category: "Corpo e Banho",
    price: 39.90,
    image: "https://images.unsplash.com/photo-1556229167-da31d2794696?w=800&auto=format&fit=crop",
    shortDescription: "Hidratação 24h com aroma relaxante.",
    fullDescription: "A Loção Corporal Sativa combina extratos naturais para uma pele macia e perfumada o dia todo. Absorção rápida e toque seco.",
    isFeatured: false
  },
  {
    id: "6",
    name: "Kit Skin Care Completo",
    category: "Kits Promocionais",
    price: 249.90,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&auto=format&fit=crop",
    shortDescription: "Rotina completa: Limpeza, Tonificação e Hidratação.",
    fullDescription: "O Kit Skin Care Completo traz tudo que você precisa para manter sua pele saudável e radiante todos os dias.",
    isFeatured: true
  },
  {
    id: "7",
    name: "Paleta de Sombras Nude",
    category: "Maquiagem",
    price: 79.90,
    image: "https://images.unsplash.com/photo-1512496011931-64157bc67327?w=800&auto=format&fit=crop",
    shortDescription: "12 tons neutros altamente pigmentados.",
    fullDescription: "Crie looks versáteis para o dia e para a noite com nossa paleta Nude, com texturas matte e cintilantes.",
    isFeatured: false
  },
  {
    id: "8",
    name: "Base Líquida HD",
    category: "Maquiagem",
    price: 59.90,
    image: "https://images.unsplash.com/photo-1599733594230-6b823276abcc?w=800&auto=format&fit=crop",
    shortDescription: "Cobertura média a alta com efeito natural.",
    fullDescription: "A Base Líquida HD disfarça imperfeições e poros, proporcionando um acabamento perfeito para fotos e vídeo.",
    isFeatured: false
  },
  {
    id: "9",
    name: "Creme de Olhos Revitalizante",
    category: "Skincare",
    price: 72.00,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop",
    shortDescription: "Reduz olheiras e linhas de expressão.",
    fullDescription: "Fórmula leve com cafeína que ajuda a desinchar e clarear a região dos olhos, combatendo o olhar cansado.",
    isFeatured: false
  },
  {
    id: "10",
    name: "Eau de Parfum Golden Sun",
    category: "Perfumes",
    price: 159.00,
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop",
    shortDescription: "Fragrância cítrica e vibrante.",
    fullDescription: "Golden Sun é a essência do verão em um frasco. Notas de bergamota, jasmim e âmbar.",
    isFeatured: false
  },
  {
    id: "11",
    name: "Óleo Finalizador de Brilho",
    category: "Cabelos",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop",
    shortDescription: "Reduz o frizz e protege as pontas.",
    fullDescription: "Um toque final luxuoso para seus cabelos. Proteção térmica e brilho espelhado sem pesar.",
    isFeatured: false
  },
  {
    id: "12",
    name: "Esfoliante Corporal Café",
    category: "Corpo e Banho",
    price: 34.90,
    image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=800&auto=format&fit=crop",
    shortDescription: "Renovação celular com aroma revigorante.",
    fullDescription: "Esfoliante natural de café que remove células mortas e estimula a circulação, deixando a pele ultra macia.",
    isFeatured: false
  },
  {
    id: "13",
    name: "Kit Viagem Essencial",
    category: "Kits Promocionais",
    price: 129.00,
    image: "https://images.unsplash.com/photo-1598440499033-547119f8c4c9?w=800&auto=format&fit=crop",
    shortDescription: "Miniaturas dos seus produtos favoritos.",
    fullDescription: "Leve a Bella Glow com você para onde for. Shampoo, condicionador, sabonete líquido e hidratante em tamanhos compactos.",
    isFeatured: false
  },
  {
    id: "14",
    name: "Iluminador Líquido Rosé",
    category: "Maquiagem",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop",
    shortDescription: "Brilho multidimensional e natural.",
    fullDescription: "Pode ser usado sozinho ou misturado à base para um glow incrível em todo o rosto.",
    isFeatured: false
  },
  {
    id: "15",
    name: "Tônico Facial Equilibrante",
    category: "Skincare",
    price: 38.00,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop",
    shortDescription: "Limpeza profunda e equilíbrio do pH.",
    fullDescription: "Sem álcool e com extrato de camomila, acalma a pele enquanto remove as últimas impurezas.",
    isFeatured: false
  },
  {
    id: "16",
    name: "Perfume Masculino Deep Blue",
    category: "Perfumes",
    price: 175.00,
    image: "https://images.unsplash.com/photo-1557170334-a9632e77c6e4?w=800&auto=format&fit=crop",
    shortDescription: "Fragrância amadeirada e refrescante.",
    fullDescription: "Uma fragrância sofisticada para o homem moderno, com notas de cedro e brisa marinha.",
    isFeatured: false
  },
  {
    id: "17",
    name: "Shampoo Pós-Química",
    category: "Cabelos",
    price: 48.00,
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop",
    shortDescription: "Reparação e proteção para fios tingidos.",
    fullDescription: "Limpa suavemente sem desbotar a cor, ajudando a reconstruir a fibra capilar danificada por processos químicos.",
    isFeatured: false
  },
  {
    id: "18",
    name: "Sabonete em Barra Artesanal",
    category: "Corpo e Banho",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1600857062241-99e5da7f3ec4?w=800&auto=format&fit=crop",
    shortDescription: "Ingredientes naturais e óleos essenciais.",
    fullDescription: "Sabonete feito à mão com lavanda e mel, para um banho relaxante e hidratante.",
    isFeatured: false
  },
  {
    id: "19",
    name: "Kit Spa em Casa",
    category: "Kits Promocionais",
    price: 199.00,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop",
    shortDescription: "Tudo para o seu momento de autocuidado.",
    fullDescription: "Inclui vela aromática, sais de banho, máscara facial de argila e uma toalha de rosto aveludada.",
    isFeatured: false
  },
  {
    id: "20",
    name: "Corretivo Líquido Alta Cobertura",
    category: "Maquiagem",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=800&auto=format&fit=crop",
    shortDescription: "Camuflagem perfeita sem craquelar.",
    fullDescription: "Textura leve que permite construir camadas, cobrindo olheiras e manchas com naturalidade.",
    isFeatured: false
  }
];
