import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import CrudDialog, { FieldConfig } from '@/components/CrudDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface BucketItem {
  id: string;
  text: string;
  category: string;
  type: string;
  completed: boolean;
  isLocal?: boolean;
}

const hardcodedItems: BucketItem[] = [
  { id: "local-1", text: "Viajar para a Itália na Primavera", category: "viagem", type: "nosso", completed: false, isLocal: true },
  { id: "local-2", text: "Viajar para a Argentina e comer muita carne", category: "viagem", type: "meu", completed: false, isLocal: true },
  { id: "local-3", text: "Viajar para a Europa ou EUA", category: "viagem", type: "nosso", completed: false, isLocal: true },
  { id: "local-4", text: "Assistir às luzes da Aurora Boreal juntos", category: "aventura", type: "nosso", completed: false, isLocal: true },
  { id: "local-5", text: "Conhecer o Salar de Uyuni", category: "aventura", type: "nosso", completed: false, isLocal: true },
  { id: "local-6", text: "Ir para a Guatemala ver vulcões", category: "aventura", type: "teu", completed: false, isLocal: true },
  { id: "local-7", text: "Fazer um passeio de balão de ar quente ao amanhecer", category: "aventura", type: "meu", completed: false, isLocal: true },
  { id: "local-8", text: "Fazer observação das estrelas no deserto do Atacama", category: "aventura", type: "nosso", completed: false, isLocal: true },
  { id: "local-9", text: "Fazer uma aula de culinária juntos", category: "experiencia", type: "meu", completed: false, isLocal: true },
  { id: "local-10", text: "Assistir a um show ao vivo do ABBA (Holograma)", category: "experiencia", type: "teu", completed: false, isLocal: true },
  { id: "local-11", text: "Assistir a um show ao vivo do Red Hot Chilli Peppers", category: "experiencia", type: "meu", completed: false, isLocal: true },
  { id: "local-12", text: "Fazer uma sessão de fotos para capturar nosso amor", category: "experiencia", type: "meu", completed: true, isLocal: true },
  { id: "local-13", text: "Ir assistir um Grand Slam, de preferência Wimbledon", category: "experiencia", type: "nosso", completed: false, isLocal: true },
  { id: "local-14", text: "Ficarmos ricos o suficiente para não passar vontade", category: "meta", type: "nosso", completed: false, isLocal: true },
  { id: "local-15", text: "Casarmos e termos uma família", category: "meta", type: "nosso", completed: false, isLocal: true },
  { id: "local-16", text: "Aprender um novo idioma juntos", category: "meta", type: "meu", completed: false, isLocal: true },
  { id: "local-17", text: "Começar uma tradição que continuaremos por anos", category: "meta", type: "meu", completed: false, isLocal: true },
  { id: "local-18", text: "Escrever cartas de amor para abrir em um aniversário especial", category: "meta", type: "meu", completed: false, isLocal: true },
];

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

const fields: FieldConfig[] = [
  { name: 'text', label: 'Descrição', type: 'text', required: true, placeholder: 'Ex: Viajar para o Japão' },
  { name: 'category', label: 'Categoria', type: 'select', options: categories.filter(c => c.id !== 'all').map(c => ({ value: c.id, label: c.label })) },
  { name: 'type', label: 'Tipo', type: 'select', options: types.filter(t => t.id !== 'all').map(t => ({ value: t.id, label: t.label })) },
];

const BucketListPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [dbItems, setDbItems] = useState<BucketItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<BucketItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<BucketItem | null>(null);

  const fetchItems = async () => {
    const { data } = await supabase.from('bucket_items').select('*').order('created_at', { ascending: true });
    if (data) setDbItems(data.map(d => ({ ...d, isLocal: false })));
  };

  useEffect(() => { fetchItems(); }, []);

  const allItems = [...hardcodedItems, ...dbItems];

  const filteredItems = allItems.filter(item => {
    const categoryMatch = activeCategory === "all" || item.category === activeCategory;
    const typeMatch = activeType === "all" || item.type === activeType;
    return categoryMatch && typeMatch;
  });

  const completedCount = allItems.filter(item => item.completed).length;
  const progressPercentage = Math.round((completedCount / allItems.length) * 100);

  const toggleItemCompletion = async (item: BucketItem) => {
    if (item.isLocal) return; // Can't toggle hardcoded items
    await supabase.from('bucket_items').update({ completed: !item.completed }).eq('id', item.id);
    fetchItems();
  };

  const handleSave = async (data: Record<string, string>) => {
    if (!user) return;
    if (editItem && !editItem.isLocal) {
      await supabase.from('bucket_items').update({ text: data.text, category: data.category, type: data.type }).eq('id', editItem.id);
      toast({ title: 'Item atualizado!' });
    } else {
      await supabase.from('bucket_items').insert({ text: data.text, category: data.category || 'meta', type: data.type || 'nosso', user_id: user.id });
      toast({ title: 'Item adicionado!' });
    }
    setEditItem(null);
    fetchItems();
  };

  const handleDelete = async () => {
    if (!deleteItem || deleteItem.isLocal) return;
    await supabase.from('bucket_items').delete().eq('id', deleteItem.id);
    toast({ title: 'Item excluído!' });
    setDeleteItem(null);
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={130} />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">Nossos Sonhos e Metas</h1>
            <Button onClick={() => { setEditItem(null); setDialogOpen(true); }} className="bg-love-green hover:bg-love-green-dark">
              <Plus className="h-4 w-4 mr-1" /> Novo
            </Button>
          </div>

          <p className="text-xl text-center mb-6 text-foreground/80">Aventuras que queremos compartilhar juntos!</p>

          <div className="love-card mb-12">
            <div className="mb-2 flex justify-between items-center">
              <span className="text-sm font-medium">Nosso Progresso</span>
              <span className="text-sm font-medium">{completedCount} de {allItems.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-love-green/20" />
            <div className="mt-2 text-center text-sm text-muted-foreground">{progressPercentage}% completo</div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map(category => (
              <button key={category.id} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id ? 'bg-love-green text-white' : 'bg-white/80 text-foreground hover:bg-love-green/20'}`} onClick={() => setActiveCategory(category.id)}>
                {category.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {types.map(type => (
              <button key={type.id} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeType === type.id ? 'bg-love-orange text-white' : 'bg-white/80 text-foreground hover:bg-love-orange/20'}`} onClick={() => setActiveType(type.id)}>
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
                    disabled={item.isLocal}
                    className={item.completed ? 'bg-love-green border-love-green' : ''}
                  />
                  <span className={`flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {item.text}
                  </span>
                  {!item.isLocal && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => { setEditItem(item); setDialogOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteItem(item)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  )}
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
