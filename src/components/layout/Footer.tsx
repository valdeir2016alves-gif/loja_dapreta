import { Camera, Globe, MessageCircle, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2 leading-tight">
              <span className="bg-primary text-white p-2 rounded-xl text-lg">LP</span>
              <div className="flex flex-col">
                <span>Loja da</span>
                <span className="text-2xl text-accent-foreground font-extrabold tracking-wide">Preta</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm">
              Trabalhamos com produtos de qualidade, oferecendo um atendimento rápido e de confiança para você.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/people/Loja-da-Preta/61575780244892/?rdid=dA766IfOt12Zt6cf&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1NHuw1rSzF%2F" target="_blank" rel="noopener noreferrer">
                <Camera className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </a>
              <Globe className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <a href="https://wa.me/55997214164" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </a>
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
                <Phone className="h-4 w-4" /> (99) 7214-164
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> São Gabriel - RS
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-xs text-muted-foreground">
          <p>© 2026 Loja da Preta. Todos os direitos reservados. Feito com ✨ para você.</p>
        </div>
      </div>
    </footer>
  );
}
