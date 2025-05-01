
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';

interface LoveItem {
  id: number;
  text: string;
  icon: string;
  category?: string;
}

const loveItems: LoveItem[] = [
  // Personality traits
  { id: 1, text: "The way you smile when you're happy", icon: "😊", category: "personality" },
  { id: 2, text: "How you always know what to say to cheer me up", icon: "🌈", category: "personality" },
  { id: 3, text: "Your incredible passion for the things you love", icon: "🔥", category: "personality" },
  { id: 4, text: "The sound of your laugh", icon: "😂", category: "personality" },
  { id: 5, text: "Your kindness to everyone you meet", icon: "💖", category: "personality" },
  
  // Physical traits
  { id: 6, text: "The way your eyes light up when you talk about things you love", icon: "👀", category: "physical" },
  { id: 7, text: "How beautiful you look first thing in the morning", icon: "🌞", category: "physical" },
  { id: 8, text: "Your adorable dimples when you smile", icon: "🥰", category: "physical" },
  
  // Moments
  { id: 9, text: "Our first date at the beach", icon: "🏖️", category: "moments" },
  { id: 10, text: "When we got caught in the rain and shared an umbrella", icon: "☔", category: "moments" },
  { id: 11, text: "Our midnight conversations about everything and nothing", icon: "🌙", category: "moments" },
  
  // Little things
  { id: 12, text: "How you make me coffee just the way I like it", icon: "☕", category: "little-things" },
  { id: 13, text: "The way you send me random messages throughout the day", icon: "📱", category: "little-things" },
  { id: 14, text: "Your thoughtful surprises for no reason at all", icon: "🎁", category: "little-things" },
  { id: 15, text: "How you remember tiny details about things I mention", icon: "🧠", category: "little-things" },
  
  // Inside jokes
  { id: 16, text: "Our silly dance moves that make us laugh", icon: "💃", category: "inside-jokes" },
  { id: 17, text: "The way we can communicate with just a look", icon: "👁️", category: "inside-jokes" },
  { id: 18, text: "Our made-up words that only we understand", icon: "🔤", category: "inside-jokes" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "personality", label: "Your Personality" },
  { id: "physical", label: "Your Beauty" },
  { id: "moments", label: "Our Moments" },
  { id: "little-things", label: "Little Things" },
  { id: "inside-jokes", label: "Our Inside Jokes" },
];

const LoveListPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState("all");
  
  const filteredItems = activeCategory === "all" 
    ? loveItems 
    : loveItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={100} />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gradient">
            What I Love About You
          </h1>
          
          <p className="text-xl text-center mb-10 text-foreground/80">
            All the reasons why my heart beats for you
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-love-orange text-white' 
                    : 'bg-white/80 text-foreground hover:bg-love-orange/20'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
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
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-love-green-dark italic">
              And countless more reasons that I discover each day...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoveListPage;
