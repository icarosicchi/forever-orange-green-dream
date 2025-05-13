
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface MemoryCardProps {
  imageUrl?: string;
  title?: string;
  content?: string;
  memoryId: number;
  isSaved?: boolean;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ 
  imageUrl = 'https://images.unsplash.com/photo-1500673922987-e212871fec22', 
  title = 'Our Memory',
  content = 'This is where you can write a special memory or message for your loved one.',
  memoryId,
  isSaved = false
}) => {
  return (
    <Link to={`/memory/${memoryId}`}>
      <Card className="w-full max-w-xl mx-auto overflow-hidden border-love-orange/20 animate-fade-in relative">
        {isSaved && (
          <div className="absolute top-2 right-2 z-10 bg-love-green rounded-full p-1">
            <Check className="h-4 w-4 text-white" />
          </div>
        )}
        
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
          <p className="text-foreground/90 leading-relaxed line-clamp-3">{content}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MemoryCard;
