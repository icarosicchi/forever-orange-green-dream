
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { PlusCircle, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface BucketItem {
  id: string;
  text: string;
  category: string;
  type: "meu" | "teu" | "nosso";
  completed: boolean;
}

const categories = [
  { id: "all", label: "Todos" },
  { id: "viagem", label: "Viagem" },
  { id: "aventura", label: "Aventuras" },
  { id: "experiencia", label: "Experiências" },
  { id: "meta", label: "Metas" },
];

const types = [
  { id: "all", label: "Todos" },
  { id: "meu", label: "Sonhos Meus" },
  { id: "teu", label: "Sonhos Teus" },
  { id: "nosso", label: "Sonhos Nossos" },
];

const BucketListPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [bucketItems, setBucketItems] = useState<BucketItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItemText, setNewItemText] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('viagem');
  const [newItemType, setNewItemType] = useState<"meu" | "teu" | "nosso">('nosso');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch bucket items from Supabase
  useEffect(() => {
    const fetchBucketItems = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('bucket_items')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          setBucketItems(data);
        }
      } catch (error) {
        console.error('Error fetching bucket items:', error);
        toast({
          title: "Erro ao carregar sonhos e metas",
          description: "Ocorreu um erro ao buscar seus sonhos e metas.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBucketItems();
  }, [user, toast]);

  const filteredItems = bucketItems.filter(item => {
    const categoryMatch = activeCategory === "all" || item.category === activeCategory;
    const typeMatch = activeType === "all" || item.type === activeType;
    return categoryMatch && typeMatch;
  });

  const completedCount = bucketItems.filter(item => item.completed).length;
  const progressPercentage = bucketItems.length ? Math.round((completedCount / bucketItems.length) * 100) : 0;

  const toggleItemCompletion = async (id: string) => {
    try {
      const itemToUpdate = bucketItems.find(item => item.id === id);
      if (!itemToUpdate) return;
      
      const newCompletedStatus = !itemToUpdate.completed;
      
      const { error } = await supabase
        .from('bucket_items')
        .update({ completed: newCompletedStatus })
        .eq('id', id);
        
      if (error) throw error;
      
      setBucketItems(bucketItems.map(item =>
        item.id === id ? { ...item, completed: newCompletedStatus } : item
      ));
      
      toast({
        title: newCompletedStatus ? "Sonho realizado!" : "Sonho marcado como pendente",
        description: newCompletedStatus ? "Você completou esse sonho!" : "Esse sonho foi marcado como pendente novamente.",
      });
    } catch (error) {
      console.error('Error toggling item completion:', error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar o status do item.",
        variant: "destructive"
      });
    }
  };
  
  const addNewItem = async () => {
    if (!newItemText.trim() || !user) return;
    
    try {
      const newItem = {
        user_id: user.id,
        text: newItemText.trim(),
        category: newItemCategory,
        type: newItemType,
        completed: false
      };
      
      const { data, error } = await supabase
        .from('bucket_items')
        .insert(newItem)
        .select();
        
      if (error) throw error;
      
      if (data && data[0]) {
        setBucketItems([data[0], ...bucketItems]);
        setNewItemText('');
        setIsAddingItem(false);
        
        toast({
          title: "Novo sonho adicionado!",
          description: "Seu novo sonho foi adicionado com sucesso.",
        });
      }
    } catch (error) {
      console.error('Error adding new item:', error);
      toast({
        title: "Erro ao adicionar",
        description: "Não foi possível adicionar o novo sonho.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={130} />
      
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
              <span className="text-sm font-medium">Nosso Progresso</span>
              <span className="text-sm font-medium">{completedCount} de {bucketItems.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-love-green/20" />
            <div className="mt-2 text-center text-sm text-muted-foreground">
              {progressPercentage}% completo
            </div>
          </div>

          {/* Botão para adicionar novo item */}
          {!isAddingItem ? (
            <div className="mb-6 text-center">
              <Button 
                onClick={() => setIsAddingItem(true)}
                className="bg-love-orange hover:bg-love-orange-dark"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Novo Sonho
              </Button>
            </div>
          ) : (
            <div className="love-card mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">Novo Sonho</h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsAddingItem(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <Input
                    placeholder="Descreva seu sonho ou meta..."
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Categoria</label>
                    <select 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value)}
                    >
                      {categories.filter(cat => cat.id !== 'all').map(category => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Tipo</label>
                    <select 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={newItemType}
                      onChange={(e) => setNewItemType(e.target.value as "meu" | "teu" | "nosso")}
                    >
                      {types.filter(type => type.id !== 'all').map(type => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <Button 
                    onClick={addNewItem} 
                    className="w-full bg-love-green hover:bg-love-green-dark"
                    disabled={!newItemText.trim()}
                  >
                    Salvar Sonho
                  </Button>
                </div>
              </div>
            </div>
          )}

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

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {types.map(type => (
              <button
                key={type.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeType === type.id
                    ? 'bg-love-orange text-white'
                    : 'bg-white/80 text-foreground hover:bg-love-orange/20'
                }`}
                onClick={() => setActiveType(type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <p>Carregando sonhos e metas...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
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
                ))
              ) : (
                <div className="col-span-2 text-center py-10 bg-white/50 rounded-lg">
                  <p className="text-muted-foreground">
                    Nenhum item encontrado para os filtros selecionados.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BucketListPage;
