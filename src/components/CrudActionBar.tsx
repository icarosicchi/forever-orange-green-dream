import React from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CrudActionBarProps {
  onCreate: () => void;
  onEdit: () => void;
  onDelete: () => void;
  createLabel?: string;
  editLabel?: string;
  deleteLabel?: string;
  createClassName?: string;
  className?: string;
  managementDisabled?: boolean;
}

const CrudActionBar: React.FC<CrudActionBarProps> = ({
  onCreate,
  onEdit,
  onDelete,
  createLabel = 'Novo',
  editLabel = 'Editar',
  deleteLabel = 'Excluir',
  createClassName,
  className,
  managementDisabled = false,
}) => (
  <div className={cn('flex flex-wrap items-center justify-end gap-2', className)}>
    <Button onClick={onCreate} className={createClassName}>
      <Plus className="h-4 w-4" /> {createLabel}
    </Button>
    <Button variant="outline" onClick={onEdit} disabled={managementDisabled}>
      <Pencil className="h-4 w-4" /> {editLabel}
    </Button>
    <Button
      variant="outline"
      onClick={onDelete}
      disabled={managementDisabled}
      className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
    >
      <Trash2 className="h-4 w-4" /> {deleteLabel}
    </Button>
  </div>
);

export default CrudActionBar;
