import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import CrudDialog, { FieldConfig } from '@/components/CrudDialog';
import CrudActionBar from '@/components/CrudActionBar';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import ItemPickerDialog from '@/components/ItemPickerDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getCurrentSpaceId } from '@/lib/space';

interface LoveItem {
  id: string;
  text: string;
  category: string;
  sort_order: number;
}

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'personality', label: 'Sua Personalidade' },
  { id: 'beauty', label: 'Sua Beleza' },
  { id: 'moments', label: 'Nossos Momentos' },
  { id: 'little-things', label: 'Coisinhas Pequenas' },
  { id: 'inside-jokes', label: 'Nossas Piadas Internas' },
];

const fields: FieldConfig[] = [
  { name: 'text', label: 'Texto', type: 'text', required: true, placeholder: 'O que você ama...' },
  { name: 'category', label: 'Categoria', type: 'select', options: categories.filter((category) => category.id !== 'all').map((category) => ({ value: category.id, label: category.label })) },
];

const LoveListPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [items, setItems] = useState<LoveItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState<'edit' | 'delete' | null>(null);
  const [editItem, setEditItem] = useState<LoveItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<LoveItem | null>(null);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('love_items')
      .select('id, text, category, sort_order')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao carregar itens' });
      return;
    }

    setItems(data ?? []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter((item) => item.category === activeCategory);

  const getCategoryLabel = (categoryId: string) => (
    categories.find((category) => category.id === categoryId)?.label ?? 'Sem categoria'
  );

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
        .from('love_items')
        .update({ text: data.text, category: data.category })
        .eq('id', editItem.id);

      if (error) {
        toast({ variant: 'destructive', title: 'Erro ao atualizar item' });
        return;
      }

      toast({ title: 'Atualizado!' });
    } else {
      const spaceId = await getCurrentSpaceId(user.id);
      const nextSortOrder = items.length > 0 ? Math.max(...items.map((item) => item.sort_order)) + 1 : 1;

      const { error } = await supabase.from('love_items').insert({
        text: data.text,
        category: data.category || 'personality',
        user_id: user.id,
        space_id: spaceId,
        sort_order: nextSortOrder,
      });

      if (error) {
        toast({ variant: 'destructive', title: 'Erro ao adicionar item' });
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

    const { error } = await supabase.from('love_items').delete().eq('id', deleteItem.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao excluir item' });
      return;
    }

    toast({ title: 'Excluido!' });
    setDeleteItem(null);
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={130} />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient">O Que Amo em Voce</h1>
              <p className="mt-3 text-left text-xl text-foreground/80">
                Algumas das razoes pelas quais meu coracao bate por voce
              </p>
            </div>
            <CrudActionBar
              onCreate={() => { setEditItem(null); setDialogOpen(true); }}
              onEdit={() => setSelectionMode('edit')}
              onDelete={() => setSelectionMode('delete')}
              createClassName="bg-love-orange hover:bg-love-orange-dark"
              managementDisabled={items.length === 0}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id ? 'bg-love-orange text-white' : 'bg-white/80 text-foreground hover:bg-love-orange/20'}`}
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
                  <CardContent className="p-6">
                    <p className="text-foreground/90">{item.text}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>

      <CrudDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditItem(null); }}
        onSave={handleSave}
        fields={fields}
        initialData={editItem ? { text: editItem.text, category: editItem.category } : undefined}
        title={editItem ? 'Editar Item' : 'Novo Item'}
      />
      <ItemPickerDialog
        open={selectionMode !== null}
        onClose={() => setSelectionMode(null)}
        onSelect={handleSelectItem}
        title={selectionMode === 'edit' ? 'Escolha o item para editar' : 'Escolha o item para excluir'}
        items={items.map((item) => ({
          id: item.id,
          title: item.text,
          subtitle: getCategoryLabel(item.category),
          searchText: `${item.text} ${item.category} ${getCategoryLabel(item.category)}`,
        }))}
        searchPlaceholder="Buscar item..."
      />
      <DeleteConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDelete} />
    </div>
  );
};

export default LoveListPage;
