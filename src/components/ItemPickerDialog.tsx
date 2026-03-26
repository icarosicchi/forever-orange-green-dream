import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface ItemPickerOption {
  id: string | number;
  title: string;
  subtitle?: string;
  searchText?: string;
}

interface ItemPickerDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (id: string | number) => void;
  title: string;
  items: ItemPickerOption[];
  searchPlaceholder?: string;
  emptyText?: string;
}

const ItemPickerDialog: React.FC<ItemPickerDialogProps> = ({
  open,
  onClose,
  onSelect,
  title,
  items,
  searchPlaceholder = 'Buscar item...',
  emptyText = 'Nenhum item encontrado.',
}) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  const normalizedSearch = search.trim().toLowerCase();
  const filteredItems = normalizedSearch
    ? items.filter((item) => {
        const haystack = `${item.title} ${item.subtitle ?? ''} ${item.searchText ?? ''}`.toLowerCase();
        return haystack.includes(normalizedSearch);
      })
    : items;

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchPlaceholder}
          />

          <ScrollArea className="h-80 rounded-md border">
            <div className="space-y-2 p-2">
              {filteredItems.length === 0 ? (
                <div className="py-10 text-center text-sm text-muted-foreground">{emptyText}</div>
              ) : (
                filteredItems.map((item) => (
                  <Button
                    key={item.id}
                    type="button"
                    variant="ghost"
                    className="h-auto w-full justify-start rounded-lg px-3 py-3 text-left hover:bg-accent"
                    onClick={() => onSelect(item.id)}
                  >
                    <div className="flex w-full flex-col items-start gap-1">
                      <span className="font-medium leading-snug">{item.title}</span>
                      {item.subtitle && (
                        <span className="text-xs text-muted-foreground">{item.subtitle}</span>
                      )}
                    </div>
                  </Button>
                ))
              )}
            </div>
          </ScrollArea>

          <div className="flex justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ItemPickerDialog;
