
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LoveItem {
  id: number;
  text: string;
  icon: string;
}

const loveItems: LoveItem[] = [
  { id: 1, text: "Seu sorriso quando você está feliz", icon: "😊" },
  { id: 2, text: "Como você sempre sabe o que dizer para me animar", icon: "🌈" },
  { id: 3, text: "Sua paixão pelas coisas que ama", icon: "🔥" },
  { id: 4, text: "O som da sua risada", icon: "😂" },
  { id: 5, text: "Como você transforma até os dias comuns em especiais", icon: "✨" },
  { id: 6, text: "Sua gentileza com todo mundo que encontra", icon: "💖" },
  { id: 7, text: "Seu jeitinho de dançar quando ninguém está olhando", icon: "💃" },
  { id: 8, text: "Sua criatividade e imaginação", icon: "🎨" },
  { id: 9, text: "Como você sempre está comigo quando eu preciso", icon: "🤗" },
];

const LoveList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {loveItems.map((item) => (
        <div key={item.id} className="transform hover:scale-105 transition-transform duration-300">
          <Card className="h-full border-love-orange/20 overflow-hidden">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-love-orange-light text-2xl">
                {item.icon}
              </div>
              <div>
                <p className="text-foreground/90">{item.text}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
      
      <div className="transform hover:scale-105 transition-transform duration-300">
        <Card className="h-full border-love-green/20 overflow-hidden bg-love-green/10">
          <CardContent className="p-6 flex items-center justify-center h-full">
            <Link to="/love-list" className="flex flex-col items-center text-love-green hover:text-love-green-dark transition-colors">
              <Heart className="h-8 w-8 mb-2 fill-love-green stroke-love-green-dark" />
              <p className="text-lg font-medium">Ver tudo</p>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoveList;
