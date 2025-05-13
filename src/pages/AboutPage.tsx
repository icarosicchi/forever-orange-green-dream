
import React from 'react';
import Header from '@/components/Header';
import { Heart } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={130} />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-10 text-center text-gradient">
            Nossa História
          </h1>
          
          <div className="love-card mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-1/2 overflow-hidden">
                <img
                  src="/images/print_comeco.jpg"
                  alt="Us Together"
                  className="block w-full h-auto"
                />
              </div>
              
              <div className="w-full md:h-1/2">
                <h2 className="text-2xl font-bold mb-4 text-love-green">Como nos conhecemos</h2>
                <p className="mb-4 text-foreground/90">
                  Nos conhecemos graças ao vídeo sagrado do Corey bêbado, que eu estava muito curioso para ver, e
                  ele me disse que estava com você. Então tomei coragem e mandei mensagem para você falando que um
                  passarinho me contou...
                </p>
                <p className="text-foreground/90">
                  E desde aquele momento começamos a conversar muito, e eu fui pra São Paulo conhecer o Beco e 
                  principalmente TE VER (apesar de você não acreditar). E daí pra frente foi só felicidade!!!
                </p>
              </div>
            </div>
          </div>
          
          <div className="love-card mb-12">
            <h2 className="text-2xl font-bold mb-6 text-love-orange text-center">Nossas Coisas Favoritas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="h-6 w-6 fill-love-green stroke-love-green-dark" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Nossas Músicas</h3>
                  <p className="text-foreground/90">
                    Já foi "Home" por um tempo<br />
                    Mas a mais clássica é "Velha Infância"
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="h-6 w-6 fill-love-green stroke-love-green-dark" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Nossos Lugares</h3>
                  <p className="text-foreground/90">
                    O abraço um do outro hehe<br />
                    E o Rio de Janeirooooo
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="h-6 w-6 fill-love-green stroke-love-green-dark" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Nossos filmes</h3>
                  <p className="text-foreground/90">
                    Meu: "Inception"<br />
                    Seu: "Little Womem"<br />
                    Nosso: "La La Land" sepa kkkkk
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Heart className="h-6 w-6 fill-love-green stroke-love-green-dark" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Nossas comidas</h3>
                  <p className="text-foreground/90">
                    TODASSSSS UHUUUUUUUUU<br />
                    Repetimos bastante o China in Box<br />
                    Tinha o Poke do Rio<br />
                    Japoneses e carnes no geral hehe
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="love-card">
            <h2 className="text-2xl font-bold mb-6 text-love-green text-center">Fatos Curiosos Sobre Nós</h2>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="text-lg">💫</div>
                <p className="text-foreground/90">
                  O fato mais bizarro de todos é você ser prima de 5º grau da minha prima (Grande Sertãozinho!!!)
                </p>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="text-lg">💫</div>
                <p className="text-foreground/90">
                  Nós dois somos palmeirenses e sempre foi assim (Confia!)
                </p>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="text-lg">💫</div>
                <p className="text-foreground/90">
                  Meu aniversário é um sanduichinho entre você e sua irmã. 1 mês e 1 dia de diferença entre cada
                </p>
              </li>
              
              <li className="flex items-start gap-3">
                <div className="text-lg">💫</div>
                <p className="text-foreground/90">
                  Nós dois fazemos o mesmo curso hehe, e somos esquisitinhos iguais (dois doidinhos, autistinhas e queridos)
                </p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
