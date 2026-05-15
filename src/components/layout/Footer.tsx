import { Camera, Globe, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="bg-primary text-white p-1 rounded-lg">BG</span>
              <span>Bella Glow</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Realçando sua beleza natural com produtos de alta qualidade e sofisticação desde 2024.
            </p>
            <div className="flex gap-4">
              <Camera className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Globe className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <MessageCircle className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-primary">Navegação</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">Página Inicial</Link></li>
              <li><Link to="/catalog" className="hover:text-primary transition-colors">Catálogo</Link></li>
              <li><Link to="/#about" className="hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link to="/admin" className="hover:text-primary transition-colors">Administração</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-4 text-primary">Categorias</h4>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li><Link to="/catalog?cat=Skincare" className="hover:text-primary transition-colors">Skincare</Link></li>
              <li><Link to="/catalog?cat=Maquiagem" className="hover:text-primary transition-colors">Maquiagem</Link></li>
              <li><Link to="/catalog?cat=Perfumes" className="hover:text-primary transition-colors">Perfumes</Link></li>
              <li><Link to="/catalog?cat=Cabelos" className="hover:text-primary transition-colors">Cabelos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-primary">Contato</h4>
            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> (11) 99999-9999
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> contato@bellaglow.com.br
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Av. Paulista, 1000 - São Paulo, SP
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-xs text-muted-foreground">
          <p>© 2026 Bella Glow Cosméticos. Todos os direitos reservados. Feito com ✨ para você.</p>
        </div>
      </div>
    </footer>
  );
}
