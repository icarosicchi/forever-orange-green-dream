import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import CrudDialog, { FieldConfig } from '@/components/CrudDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getCurrentSpaceId } from '@/lib/space';

interface BucketItem {
  id: string;
  text: string;
  category: string;
  type: string;
  completed: boolean;
  sort_order: number;
}

const categories = [
  { id: 'all', label: 'Todos' },
  { id: 'viagem', label: 'Viagem' },
  { id: 'aventura', label: 'Aventuras' },
  { id: 'experiencia', label: 'Experiencias' },
  { id: 'meta', label: 'Metas' },
];

const types = [
  { id: 'all', label: 'Todos' },
  { id: 'meu', label: 'Sonhos Meus' },
  { id: 'teu', label: 'Sonhos Teus' },
  { id: 'nosso', label: 'Sonhos Nossos' },
];

const fields: FieldConfig[] = [
  { name: 'text', label: 'Descricao', type: 'text', required: true, placeholder: 'Ex: Viajar para o Japao' },
  { name: 'category', label: 'Categoria', type: 'select', options: categories.filter((category) => category.id !== 'all').map((category) => ({ value: category.id, label: category.label })) },
  { name: 'type', label: 'Tipo', type: 'select', options: types.filter((type) => type.id !== 'all').map((type) => ({ value: type.id, label: type.label })) },
];

const BucketListPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<BucketItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<BucketItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<BucketItem | null>(null);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('bucket_items')
      .select('id, text, category, type, completed, sort_order')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao carregar sonhos e metas' });
      return;
    }

    setItems(data ?? []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
    const typeMatch = activeType === 'all' || item.type === activeType;
    return categoryMatch && typeMatch;
  });

  const completedCount = items.filter((item) => item.completed).length;
  const progressPercentage = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  const toggleItemCompletion = async (item: BucketItem) => {
    const { error } = await supabase
      .from('bucket_items')
      .update({ completed: !item.completed })
      .eq('id', item.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao atualizar progresso' });
      return;
    }

    fetchItems();
  };

  const handleSave = async (data: Record<string, string>) => {
    if (!user) {
      return;
    }

    if (editItem) {
      const { error } = await supabase
        .from('bucket_items')
        .update({ text: data.text, category: data.category, type: data.type })
        .eq('id', editItem.id);

      if (error) {
        toast({ variant: 'destructive', title: 'Erro ao atualizar item' });
        return;
      }

      toast({ title: 'Item atualizado!' });
    } else {
      const spaceId = await getCurrentSpaceId(user.id);
      const nextSortOrder = items.length > 0 ? Math.max(...items.map((item) => item.sort_order)) + 1 : 1;

      const { error } = await supabase.from('bucket_items').insert({
        text: data.text,
        category: data.category || 'meta',
        type: data.type || 'nosso',
        completed: false,
        user_id: user.id,
        space_id: spaceId,
        sort_order: nextSortOrder,
      });

      if (error) {
        toast({ variant: 'destructive', title: 'Erro ao adicionar item' });
        return;
      }

      toast({ title: 'Item adicionado!' });
    }

    setEditItem(null);
    setDialogOpen(false);
    fetchItems();
  };

  const handleDelete = async () => {
    if (!deleteItem) {
      return;
    }

    const { error } = await supabase.from('bucket_items').delete().eq('id', deleteItem.id);

    if (error) {
      toast({ variant: 'destructive', title: 'Erro ao excluir item' });
      return;
    }

    toast({ title: 'Item excluido!' });
    setDeleteItem(null);
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={130} />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gradient">Nossos Sonhos e Metas</h1>
              <p className="mt-3 text-left text-xl text-foreground/80">
                Aventuras que queremos compartilhar juntos!
              </p>
            </div>
            <Button onClick={() => { setEditItem(null); setDialogOpen(true); }} className="bg-love-green hover:bg-love-green-dark">
              <Plus className="h-4 w-4 mr-1" /> Novo
            </Button>
          </div>

          <div className="love-card mb-12">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm font-medium">Nosso Progresso</span>
              <span className="text-sm font-medium">{completedCount} de {items.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-love-green/20" />
            <div className="mt-2 text-center text-sm text-muted-foreground">{progressPercentage}% completo</div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id ? 'bg-love-green text-white' : 'bg-white/80 text-foreground hover:bg-love-green/20'}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {types.map((type) => (
              <button
                key={type.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeType === type.id ? 'bg-love-orange text-white' : 'bg-white/80 text-foreground hover:bg-love-orange/20'}`}
                onClick={() => setActiveType(type.id)}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className={`border-love-green/20 transition-colors ${item.completed ? 'bg-love-green/10' : 'bg-white/90'}`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <Checkbox
                    checked={item.completed}
                    onCheckedChange={() => toggleItemCompletion(item)}
                    className={item.completed ? 'bg-love-green border-love-green' : ''}
                  />
                  <span className={`flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {item.text}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => { setEditItem(item); setDialogOpen(true); }}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setDeleteItem(item)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <CrudDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditItem(null); }}
        onSave={handleSave}
        fields={fields}
        initialData={editItem ? { text: editItem.text, category: editItem.category, type: editItem.type } : undefined}
        title={editItem ? 'Editar Sonho' : 'Novo Sonho'}
      />
      <DeleteConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDelete} />
    </div>
  );
};

export default BucketListPage;
