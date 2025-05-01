
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface MemoryCardProps {
  imageUrl?: string;
  title?: string;
  content?: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ 
  imageUrl = 'https://images.unsplash.com/photo-1500673922987-e212871fec22', 
  title = 'Our Memory',
  content = 'This is where you can write a special memory or message for your loved one.'
}) => {
  return (
    <Card className="w-full max-w-xl mx-auto overflow-hidden border-love-orange/20 animate-fade-in">
      {imageUrl && (
        <div className="w-full h-64 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <CardContent className="p-6 bg-gradient-to-br from-white to-love-green-light/10">
        <h2 className="text-2xl font-bold mb-4 text-gradient">{title}</h2>
        <p className="text-foreground/90 leading-relaxed">{content}</p>
      </CardContent>
    </Card>
  );
};

export default MemoryCard;
