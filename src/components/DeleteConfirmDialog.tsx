import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open, onClose, onConfirm, title = 'Tem certeza que deseja excluir?'
}) => (
  <AlertDialog open={open} onOpenChange={v => !v && onClose()}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>Essa ação não pode ser desfeita.</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Excluir</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default DeleteConfirmDialog;
