import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import CrudDialog, { FieldConfig } from '@/components/CrudDialog';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface LoveItem {
  id: string;
  text: string;
  category: string;
  isLocal?: boolean;
}

const hardcodedLoveItems: LoveItem[] = [
  { id: "l-1", text: "Sua personalidade", category: "personality", isLocal: true },
  { id: "l-2", text: "Sua vontade", category: "personality", isLocal: true },
  { id: "l-3", text: "Sua disciplina", category: "personality", isLocal: true },
  { id: "l-4", text: "Sua responsabilidade", category: "personality", isLocal: true },
  { id: "l-5", text: "Sua inteligência", category: "personality", isLocal: true },
  { id: "l-6", text: "Sua dedicação", category: "personality", isLocal: true },
  { id: "l-7", text: "Seu gênio forte", category: "personality", isLocal: true },
  { id: "l-8", text: "Seu jeito de defender seus valores", category: "personality", isLocal: true },
  { id: "l-9", text: "Seu carinho por sua família", category: "personality", isLocal: true },
  { id: "l-10", text: "Seu jeito manhoso de ser", category: "personality", isLocal: true },
  { id: "l-11", text: "Como você ativa o modo nenequinha", category: "personality", isLocal: true },
  { id: "l-12", text: "Suas manias", category: "personality", isLocal: true },
  { id: "l-13", text: "Suas músicas", category: "personality", isLocal: true },
  { id: "l-14", text: "Seus filmes", category: "personality", isLocal: true },
  { id: "l-15", text: "Sua cultura", category: "personality", isLocal: true },
  { id: "l-16", text: "Sua curiosidade", category: "personality", isLocal: true },
  { id: "l-17", text: "Seu posicionamento", category: "personality", isLocal: true },
  { id: "l-18", text: "O jeito que você pede desculpas", category: "personality", isLocal: true },
  { id: "l-19", text: "Seu instinto", category: "personality", isLocal: true },
  { id: "l-20", text: "Como você me entende", category: "personality", isLocal: true },
  { id: "l-21", text: "Como você me permite ser eu mesmo", category: "personality", isLocal: true },
  { id: "l-22", text: "Como você me cuida", category: "personality", isLocal: true },
  { id: "l-23", text: "Como você se preocupa comigo", category: "personality", isLocal: true },
  { id: "l-24", text: "Como você ama receber carinho", category: "personality", isLocal: true },
  { id: "l-25", text: "Como você enxerga o futuro", category: "personality", isLocal: true },
  { id: "l-26", text: "Sua sinceridade", category: "personality", isLocal: true },
  { id: "l-27", text: "Sua companhia", category: "personality", isLocal: true },
  { id: "l-28", text: "Sua risada", category: "personality", isLocal: true },
  { id: "l-29", text: "Seu senso de humor", category: "personality", isLocal: true },
  { id: "l-30", text: "Suas piadas", category: "personality", isLocal: true },
  { id: "l-31", text: "Sua ironia", category: "personality", isLocal: true },
  { id: "l-32", text: "Seu respeito", category: "personality", isLocal: true },
  { id: "l-33", text: "Como você me torna o melhor de mim", category: "personality", isLocal: true },
  { id: "l-34", text: "Sua paixão", category: "personality", isLocal: true },
  { id: "l-35", text: "Sua independência", category: "personality", isLocal: true },
  { id: "l-36", text: "Sua gratidão", category: "personality", isLocal: true },
  { id: "l-37", text: "Sua beleza encantadora", category: "personality", isLocal: true },
  { id: "l-38", text: "Sua presença", category: "personality", isLocal: true },
  { id: "l-39", text: "Sua simpatia", category: "personality", isLocal: true },
  { id: "l-40", text: "Seu lado nerdolinha", category: "personality", isLocal: true },
  { id: "l-41", text: "Sua confiança em mim", category: "personality", isLocal: true },
  { id: "l-42", text: "Sua admiração e fé em mim", category: "personality", isLocal: true },
  { id: "l-43", text: "Seus olhos", category: "beauty", isLocal: true },
  { id: "l-44", text: "Sua boca", category: "beauty", isLocal: true },
  { id: "l-45", text: "Seu sorriso", category: "beauty", isLocal: true },
  { id: "l-46", text: "Seu cabelo ondulado perfeitinho", category: "beauty", isLocal: true },
  { id: "l-47", text: "Seu nariz", category: "beauty", isLocal: true },
  { id: "l-48", text: "Seu rosto", category: "beauty", isLocal: true },
  { id: "l-49", text: "Suas orelhas", category: "beauty", isLocal: true },
  { id: "l-50", text: "Seu queixinho", category: "beauty", isLocal: true },
  { id: "l-51", text: "Suas bochechinhas", category: "beauty", isLocal: true },
  { id: "l-52", text: "Seus lábios", category: "beauty", isLocal: true },
  { id: "l-53", text: "Seu braço", category: "beauty", isLocal: true },
  { id: "l-54", text: "Seu selinho", category: "beauty", isLocal: true },
  { id: "l-55", text: "Seu beijo demorado", category: "beauty", isLocal: true },
  { id: "l-56", text: "Suas pernocas", category: "beauty", isLocal: true },
  { id: "l-57", text: "Seus bracinhos", category: "beauty", isLocal: true },
  { id: "l-58", text: "Seu pé", category: "beauty", isLocal: true },
  { id: "l-59", text: "Sua coxa", category: "beauty", isLocal: true },
  { id: "l-60", text: "Sua barriguinha", category: "beauty", isLocal: true },
  { id: "l-61", text: "Seus peitos", category: "beauty", isLocal: true },
  { id: "l-62", text: "Sua bunda", category: "beauty", isLocal: true },
  { id: "l-63", text: "Sua mãozinha", category: "beauty", isLocal: true },
  { id: "l-64", text: "Seu dedinho com aliança", category: "beauty", isLocal: true },
  { id: "l-65", text: "Seu corpo escultural", category: "beauty", isLocal: true },
  { id: "l-66", text: "Seu umbiguinho", category: "beauty", isLocal: true },
  { id: "l-67", text: "Suas pintas", category: "beauty", isLocal: true },
  { id: "l-68", text: "Seu óculos", category: "beauty", isLocal: true },
  { id: "l-69", text: "Seu cheiro", category: "beauty", isLocal: true },
  { id: "l-70", text: "Sua pele macia", category: "beauty", isLocal: true },
  { id: "l-71", text: "Seu pescoço", category: "beauty", isLocal: true },
  { id: "l-72", text: "Como você deita no meu peito", category: "beauty", isLocal: true },
  { id: "l-73", text: "Nossos beijos especiais", category: "moments", isLocal: true },
  { id: "l-74", text: "Nossas brincadeiras", category: "moments", isLocal: true },
  { id: "l-75", text: "Nosso autisminho", category: "moments", isLocal: true },
  { id: "l-76", text: "Seu jeito de ficar surpresa", category: "moments", isLocal: true },
  { id: "l-77", text: "Seu jeito bobinho de pensar às vezes", category: "moments", isLocal: true },
  { id: "l-78", text: "Seu jeito de se distrair", category: "moments", isLocal: true },
  { id: "l-79", text: "Ter você", category: "moments", isLocal: true },
  { id: "l-80", text: "Pensar em você", category: "moments", isLocal: true },
  { id: "l-81", text: "Planejar o futuro com você", category: "moments", isLocal: true },
  { id: "l-82", text: "Ficar à toa com você", category: "moments", isLocal: true },
  { id: "l-83", text: "Viajar com você", category: "moments", isLocal: true },
  { id: "l-84", text: "Fazer planos", category: "moments", isLocal: true },
  { id: "l-85", text: "Jogar algo com você", category: "moments", isLocal: true },
  { id: "l-86", text: "Assistir algo com você", category: "moments", isLocal: true },
  { id: "l-87", text: "Conversar com você", category: "moments", isLocal: true },
  { id: "l-88", text: "Me aconchegar com você", category: "moments", isLocal: true },
  { id: "l-89", text: "Dirigir com você", category: "moments", isLocal: true },
  { id: "l-90", text: "Comer com você", category: "moments", isLocal: true },
  { id: "l-91", text: "Como você me apoia", category: "moments", isLocal: true },
  { id: "l-92", text: "Como você compartilha minhas loucuras", category: "moments", isLocal: true },
  { id: "l-93", text: "Como estamos misturando nossas manias", category: "moments", isLocal: true },
  { id: "l-94", text: "Nossas sapequices", category: "moments", isLocal: true },
  { id: "l-95", text: "Como você fica animada contando uma fofoca", category: "moments", isLocal: true },
  { id: "l-96", text: "Nossa presença", category: "moments", isLocal: true },
  { id: "l-97", text: "Como você é minha sombrinha quando está com vergonha", category: "moments", isLocal: true },
  { id: "l-98", text: "Segurar sua mão", category: "little-things", isLocal: true },
  { id: "l-99", text: "Como você me entende", category: "little-things", isLocal: true },
  { id: "l-100", text: "Como você me permite ser eu mesmo", category: "little-things", isLocal: true },
  { id: "l-101", text: "Como você me cuida", category: "little-things", isLocal: true },
  { id: "l-102", text: "Como você se preocupa comigo", category: "little-things", isLocal: true },
  { id: "l-103", text: "Como você ama receber carinho", category: "little-things", isLocal: true },
  { id: "l-104", text: "Como você enxerga o futuro", category: "little-things", isLocal: true },
  { id: "l-105", text: "Seu carinho por sua família", category: "little-things", isLocal: true },
  { id: "l-106", text: "O jeito que você pede desculpas", category: "little-things", isLocal: true },
  { id: "l-107", text: "Como você fala nada com nada quando vai dormir", category: "little-things", isLocal: true },
  { id: "l-108", text: "Seu jeitinho manhoso de ser", category: "inside-jokes", isLocal: true },
  { id: "l-109", text: "Como você ativa o modo nenequinha", category: "inside-jokes", isLocal: true },
  { id: "l-110", text: "Nossas piadas internas", category: "inside-jokes", isLocal: true },
  { id: "l-111", text: "Seu jeito bobinho de pensar às vezes", category: "inside-jokes", isLocal: true },
  { id: "l-112", text: "Seu jeito de se distrair", category: "inside-jokes", isLocal: true },
  { id: "l-113", text: "Como você fica animada contando uma fofoca", category: "inside-jokes", isLocal: true },
  { id: "l-114", text: "Como estamos misturando nossas manias", category: "inside-jokes", isLocal: true },
  { id: "l-115", text: "Como você é minha sombrinha quando está com vergonha", category: "inside-jokes", isLocal: true },
  { id: "l-116", text: "Ser babai e babae", category: "inside-jokes", isLocal: true },
  { id: "l-117", text: "Ser fofos e queridos por muitos", category: "inside-jokes", isLocal: true },
];

const categories = [
  { id: "all", label: "Todos" },
  { id: "personality", label: "Sua Personalidade" },
  { id: "beauty", label: "Sua Beleza" },
  { id: "moments", label: "Nossos Momentos" },
  { id: "little-things", label: "Coisinhas Pequenas" },
  { id: "inside-jokes", label: "Nossas Piadas Internas" },
];

const fields: FieldConfig[] = [
  { name: 'text', label: 'Texto', type: 'text', required: true, placeholder: 'O que você ama...' },
  { name: 'category', label: 'Categoria', type: 'select', options: categories.filter(c => c.id !== 'all').map(c => ({ value: c.id, label: c.label })) },
];

const LoveListPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("all");
  const [dbItems, setDbItems] = useState<LoveItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<LoveItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<LoveItem | null>(null);

  const fetchItems = async () => {
    const { data } = await supabase.from('love_items').select('*').order('created_at');
    if (data) setDbItems(data.map(d => ({ id: d.id, text: d.text, category: d.category })));
  };

  useEffect(() => { fetchItems(); }, []);

  const allItems = [...hardcodedLoveItems, ...dbItems];
  const filteredItems = activeCategory === "all" ? allItems : allItems.filter(item => item.category === activeCategory);

  const handleSave = async (data: Record<string, string>) => {
    if (!user) return;
    if (editItem && !editItem.isLocal) {
      await supabase.from('love_items').update({ text: data.text, category: data.category }).eq('id', editItem.id);
      toast({ title: 'Atualizado!' });
    } else {
      await supabase.from('love_items').insert({ text: data.text, category: data.category || 'personality', user_id: user.id });
      toast({ title: 'Adicionado!' });
    }
    setEditItem(null);
    fetchItems();
  };

  const handleDelete = async () => {
    if (!deleteItem || deleteItem.isLocal) return;
    await supabase.from('love_items').delete().eq('id', deleteItem.id);
    toast({ title: 'Excluído!' });
    setDeleteItem(null);
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-love-gradient">
      <Header totalPages={130} />
      <main className="pt-24 pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">O Que Amo em Você</h1>
            <Button onClick={() => { setEditItem(null); setDialogOpen(true); }} className="bg-love-orange hover:bg-love-orange-dark">
              <Plus className="h-4 w-4 mr-1" /> Novo
            </Button>
          </div>
          <p className="text-xl text-center mb-10 text-foreground/80">Algumas das razões pelas quais meu coração bate por você</p>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(category => (
              <button key={category.id} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id ? 'bg-love-orange text-white' : 'bg-white/80 text-foreground hover:bg-love-orange/20'}`} onClick={() => setActiveCategory(category.id)}>
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="transform hover:scale-105 transition-transform duration-300">
                <Card className="h-full border-love-orange/20 overflow-hidden">
                  <CardContent className="p-6 flex items-start justify-between gap-2">
                    <p className="text-foreground/90 flex-1">{item.text}</p>
                    {!item.isLocal && (
                      <div className="flex gap-1 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditItem(item); setDialogOpen(true); }}><Pencil className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeleteItem(item)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </main>

      <CrudDialog open={dialogOpen} onClose={() => { setDialogOpen(false); setEditItem(null); }} onSave={handleSave} fields={fields}
        initialData={editItem ? { text: editItem.text, category: editItem.category } : undefined}
        title={editItem ? 'Editar Item' : 'Novo Item'} />
      <DeleteConfirmDialog open={!!deleteItem} onClose={() => setDeleteItem(null)} onConfirm={handleDelete} />
    </div>
  );
};

export default LoveListPage;
