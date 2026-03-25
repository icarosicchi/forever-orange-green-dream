import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import CrudDialog, { FieldConfig } from '@/components/CrudDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface FoodItem {
  id: string;
  imageUrl: string;
  description: string;
  isLocal?: boolean;
}

const hardcodedPhotoIds = [8, 22, 27, 32, 38, 39, 59, 61, 64, 65, 68, 75, 76, 80, 81, 85, 99, 100, 102, 108];

const hardcodedFoods: FoodItem[] = hardcodedPhotoIds.map((id, i) => ({
  id: `food-${i}`,
  imageUrl: `/images/memory${id}.jpg`,
  description: `Memória #${id}`,
  isLocal: true,
}));

const fields: FieldConfig[] = [
  { name: 'image_url', label: 'Foto', type: 'image' },
  { name: 'description', label: 'Descrição', type: 'text', placeholder: 'Descreva a comida...' },
];

const FoodsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dbItems, setDbItems] = useState<FoodItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<FoodItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<FoodItem | null>(null);

  const fetchItems = async () => {
    const { data } = await supabase.from('food_items').select('*').order('created_at');
    if (data) setDbItems(data.map(d => ({ id: d.id, imageUrl: d.image_url, description: d.description })));
  };

  useEffect(() => { fetchItems(); }, []);

  const allItems = [...hardcodedFoods, ...dbItems];

  const handleSave = async (data: Record<string, string>) => {
    if (!user) return;
    if (editItem && !editItem.isLocal) {
      await supabase.from('food_items').update({ image_url: data.image_url, description: data.description }).eq('id', editItem.id);
      toast({ title: 'Atualizado!' });
    } else {
      await supabase.from('food_items').insert({ image_url: data.image_url, description: data.description || '', user_id: user.id });
      toast({ title: 'Adicionado!' });
    }
    setEditItem(null);
    fetchItems();
  };

  const handleDelete = async () => {
    if (!deleteItem || deleteItem.isLocal) return;
    await supabase.from('food_items').delete().eq('id', deleteItem.id);
    toast({ title: 'Excluído!' });
    setDeleteItem(null);
    fetchItems();
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>, item: FoodItem) => {
    if (item.isLocal) {
      const img = e.currentTarget;
      if (!img.dataset.triedNormal) {
        img.dataset.triedNormal = 'true';
        const id = item.description.replace('Memória #', '');
        img.src = `/images/memory${id}_.jpg`;
      }
    }
  };

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={130} />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gradient">Nossas Comidas Favoritas</h1>
          <Button onClick={() => { setEditItem(null); setDialogOpen(true); }} className="bg-love-green hover:bg-love-green-dark">
            <Plus className="h-4 w-4 mr-1" /> Nova
          </Button>
        </div>
        <p className="mb-8 text-center text-lg text-muted-foreground">Percebi que a gente sai MUITO pra comer. Então nada mais justo que uma página com você e nossas comidinhas</p>

        <div className="flex flex-wrap justify-center gap-6">
          {allItems.map(item => (
            <div key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-transparent relative group">
              <img src={item.imageUrl} alt={item.description} className="h-80 w-auto object-cover" onError={e => handleImgError(e, item)} />
              {!item.isLocal && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => { setEditItem(item); setDialogOpen(true); }}><Pencil className="h-3 w-3" /></Button>
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => setDeleteItem(item)}><Trash2 className="h-3 w-3" /></Button>
                </div>
              )}
              {item.description && !item.isLocal && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2 text-center">{item.description}</div>
              )}
            </div>
          ))}
        </div>
      </main>

      <CrudDialog open={dialogOpen} onClose={() => { setDialogOpen(false); setEditItem(null); }} onSave={handleSave} fields={fields}
        initialData={editItem ? { image_url: editItem.imageUrl, description: editItem.description } : undefined}
        title={editItem ? 'Editar Comida' : 'Nova Comida'} />
      <DeleteConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDelete} />
    </div>
  );
};

export default FoodsPage;
