import { MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#243b4f] pt-12 pb-6 text-gray-200 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Coluna 1: Sobre a Loja */}
          <div>
            <h4 className="font-bold text-white mb-4 pb-2 border-b border-[#3d5a73] inline-block pr-8">
              Sobre a Loja
            </h4>
            <p className="text-sm leading-relaxed text-gray-300">
              Trabalhamos com produtos de qualidade, oferecendo um atendimento rápido e de confiança para você.
            </p>
          </div>

          {/* Coluna 2: Atendimento */}
          <div>
            <h4 className="font-bold text-white mb-4 pb-2 border-b border-[#3d5a73] inline-block pr-8">
              Atendimento
            </h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-300">
              <li>
                <a 
                  href="https://api.whatsapp.com/send/?phone=5555999911746&text=Ol%C3%A1%21+Vim+pelo+site+da+loja.&type=phone_number&app_absent=0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  WhatsApp: (55) 99991-1746 <MessageCircle className="h-4 w-4" />
                </a>
              </li>
              <li>Atendimento online e entregas</li>
              <li>São Gabriel - RS</li>
            </ul>
          </div>

          {/* Coluna 3: Redes Sociais */}
          <div>
            <h4 className="font-bold text-white mb-4 pb-2 border-b border-[#3d5a73] inline-block pr-8">
              Redes Sociais
            </h4>
            <div className="text-sm">
              <a 
                href="https://www.facebook.com/people/Loja-da-Preta/61575780244892/?rdid=dA766IfOt12Zt6cf&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1NHuw1rSzF%2F" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1 text-gray-300"
              >
                Acompanhe nossa página no Facebook 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
          
        </div>

        <div className="border-t border-[#3d5a73] pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
          <p>© 2026 Loja da Preta. Todos os direitos reservados.</p>
          <a href="#/admin" className="mt-4 sm:mt-0 hover:text-white transition-colors flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Acesso Restrito
          </a>
        </div>
      </div>
    </footer>
  );
}
