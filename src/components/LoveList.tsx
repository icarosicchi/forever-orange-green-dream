
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
  { id: 1, text: "The way you smile when you're happy", icon: "😊" },
  { id: 2, text: "How you always know what to say to cheer me up", icon: "🌈" },
  { id: 3, text: "Your incredible passion for the things you love", icon: "🔥" },
  { id: 4, text: "The sound of your laugh", icon: "😂" },
  { id: 5, text: "How you make even ordinary days special", icon: "✨" },
  { id: 6, text: "Your kindness to everyone you meet", icon: "💖" },
  { id: 7, text: "The way you dance when nobody's watching", icon: "💃" },
  { id: 8, text: "Your creativity and imagination", icon: "🎨" },
  { id: 9, text: "How you're always there when I need you", icon: "🤗" },
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
              <p className="text-lg font-medium">See All</p>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoveList;
