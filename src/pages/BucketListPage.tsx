
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface BucketItem {
  id: number;
  text: string;
  category: string;
  completed: boolean;
}

const initialBucketItems: BucketItem[] = [
  // Travel
  { id: 1, text: "Watch the Northern Lights together", category: "travel", completed: false },
  { id: 2, text: "Visit Paris and have a picnic under the Eiffel Tower", category: "travel", completed: false },
  { id: 3, text: "Go on a road trip with no set destination", category: "travel", completed: true },
  { id: 4, text: "Swim in the turquoise waters of the Maldives", category: "travel", completed: false },
  { id: 5, text: "Visit an ancient castle", category: "travel", completed: false },
  
  // Adventures
  { id: 6, text: "Go skydiving", category: "adventure", completed: false },
  { id: 7, text: "Take a hot air balloon ride at sunrise", category: "adventure", completed: false },
  { id: 8, text: "Go stargazing in the desert", category: "adventure", completed: false },
  { id: 9, text: "Learn to surf together", category: "adventure", completed: false },
  
  // Experiences
  { id: 10, text: "Take a cooking class together", category: "experience", completed: true },
  { id: 11, text: "Attend a live concert of our favorite band", category: "experience", completed: false },
  { id: 12, text: "Plant a tree that we can watch grow over the years", category: "experience", completed: true },
  { id: 13, text: "Have a photoshoot to capture our love", category: "experience", completed: true },
  
  // Goals
  { id: 14, text: "Learn a new language together", category: "goal", completed: false },
  { id: 15, text: "Create a scrapbook of our relationship", category: "goal", completed: false },
  { id: 16, text: "Start a tradition we'll continue for years", category: "goal", completed: true },
  { id: 17, text: "Write love letters to open on a special anniversary", category: "goal", completed: false },
];

const categories = [
  { id: "all", label: "All" },
  { id: "travel", label: "Travel" },
  { id: "adventure", label: "Adventures" },
  { id: "experience", label: "Experiences" },
  { id: "goal", label: "Goals" },
];

const BucketListPage: React.FC = () => {
  const [bucketItems, setBucketItems] = useState(initialBucketItems);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredItems = activeCategory === "all" 
    ? bucketItems 
    : bucketItems.filter(item => item.category === activeCategory);
    
  const completedCount = bucketItems.filter(item => item.completed).length;
  const progressPercentage = Math.round((completedCount / bucketItems.length) * 100);
  
  const toggleItemCompletion = (id: number) => {
    setBucketItems(bucketItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={100} />
      
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gradient">
            Nossos Sonhos e Metas
          </h1>
          
          <p className="text-xl text-center mb-6 text-foreground/80">
            Aventuras que queremos compartilhar juntos!
          </p>
          
          <div className="love-card mb-12">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm font-medium">Our Progress</span>
              <span className="text-sm font-medium">{completedCount} of {bucketItems.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-love-green/20" />
            <div className="mt-2 text-center text-sm text-muted-foreground">
              {progressPercentage}% complete
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-love-green text-white' 
                    : 'bg-white/80 text-foreground hover:bg-love-green/20'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <Card 
                key={item.id} 
                className={`border-love-green/20 transition-colors ${
                  item.completed ? 'bg-love-green/10' : 'bg-white/90'
                }`}
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Checkbox 
                    id={`item-${item.id}`}
                    checked={item.completed}
                    onCheckedChange={() => toggleItemCompletion(item.id)}
                    className={item.completed ? 'bg-love-green border-love-green' : ''}
                  />
                  <label 
                    htmlFor={`item-${item.id}`}
                    className={`flex-1 cursor-pointer ${item.completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {item.text}
                  </label>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BucketListPage;
