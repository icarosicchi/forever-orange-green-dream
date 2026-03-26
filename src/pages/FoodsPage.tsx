import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import CrudDialog, { FieldConfig } from '@/components/CrudDialog';
import CrudActionBar from '@/components/CrudActionBar';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import ItemPickerDialog from '@/components/ItemPickerDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getCurrentSpaceId } from '@/lib/space';

interface FoodItem {
  id: string;
  imageUrl: string;
  description: string;
  sort_order: number;
}

const fields: FieldConfig[] = [
  { name: 'image_url', label: 'Foto', type: 'image' },
  { name: 'description', label: 'Descricao', type: 'text', placeholder: 'Descreva a comida...' },
];

const FoodsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<FoodItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState<'edit' | 'delete' | null>(null);
  const [editItem, setEditItem] = useState<FoodItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<FoodItem | null>(null);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('food_items')
      .select('id, image_url, description, sort_order')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao carregar comidas' });
      return;
    }

    setItems((data ?? []).map((item) => ({
      id: item.id,
      imageUrl: item.image_url,
      description: item.description,
      sort_order: item.sort_order,
    })));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSelectItem = (id: string | number) => {
    const selectedItem = items.find((item) => item.id === id);
    const currentMode = selectionMode;

    if (!selectedItem || !currentMode) {
      return;
    }

    setSelectionMode(null);

    if (currentMode === 'edit') {
      setEditItem(selectedItem);
      setDialogOpen(true);
      return;
    }

    setDeleteItem(selectedItem);
  };

  const handleSave = async (data: Record<string, string>) => {
    if (!user) {
      return;
    }

    if (editItem) {
      const { error } = await supabase
        .from('food_items')
        .update({ image_url: data.image_url, description: data.description || '' })
        .eq('id', editItem.id);

      if (error) {
        toast({ variant: 'destructive', title: 'Erro ao atualizar comida' });
        return;
      }

      toast({ title: 'Atualizado!' });
    } else {
      const spaceId = await getCurrentSpaceId(user.id);
      const nextSortOrder = items.length > 0 ? Math.max(...items.map((item) => item.sort_order)) + 1 : 1;

      const { error } = await supabase.from('food_items').insert({
        image_url: data.image_url,
        description: data.description || '',
        user_id: user.id,
        space_id: spaceId,
        sort_order: nextSortOrder,
      });

      if (error) {
        toast({ variant: 'destructive', title: 'Erro ao adicionar comida' });
        return;
      }

      toast({ title: 'Adicionado!' });
    }

    setEditItem(null);
    setDialogOpen(false);
    fetchItems();
  };

  const handleDelete = async () => {
    if (!deleteItem) {
      return;
    }

    const { error } = await supabase.from('food_items').delete().eq('id', deleteItem.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao excluir comida' });
      return;
    }

    toast({ title: 'Excluido!' });
    setDeleteItem(null);
    fetchItems();
  };

  const handleImgError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;

    if (image.dataset.triedFallback === 'true') {
      return;
    }

    const match = image.src.match(/memory(\d+)\.jpg$/);

    if (!match) {
      return;
    }

    image.dataset.triedFallback = 'true';
    image.src = `/images/memory${match[1]}_.jpg`;
  };

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={130} />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-gradient">Nossas Comidas Favoritas</h1>
            <p className="mt-3 text-left text-lg text-muted-foreground">
              Percebi que a gente sai MUITO para comer. Entao nada mais justo que uma pagina com voce e nossas comidinhas.
            </p>
          </div>
          <CrudActionBar
            onCreate={() => { setEditItem(null); setDialogOpen(true); }}
            onEdit={() => setSelectionMode('edit')}
            onDelete={() => setSelectionMode('delete')}
            createClassName="bg-love-green hover:bg-love-green-dark"
            managementDisabled={items.length === 0}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-transparent relative">
              <img src={item.imageUrl} alt={item.description} className="h-80 w-auto object-cover" onError={handleImgError} />
              {item.description && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2 text-center">{item.description}</div>
              )}
            </div>
          ))}
        </div>
      </main>

      <CrudDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditItem(null); }}
        onSave={handleSave}
        fields={fields}
        initialData={editItem ? { image_url: editItem.imageUrl, description: editItem.description } : undefined}
        title={editItem ? 'Editar Comida' : 'Nova Comida'}
      />
      <ItemPickerDialog
        open={selectionMode !== null}
        onClose={() => setSelectionMode(null)}
        onSelect={handleSelectItem}
        title={selectionMode === 'edit' ? 'Escolha a comida para editar' : 'Escolha a comida para excluir'}
        items={items.map((item, index) => ({
          id: item.id,
          title: item.description || `Foto ${index + 1}`,
          subtitle: `Imagem ${index + 1}`,
          searchText: `${item.description} ${item.imageUrl}`,
        }))}
        searchPlaceholder="Buscar comida..."
      />
      <DeleteConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDelete} />
    </div>
  );
};

export default FoodsPage;
