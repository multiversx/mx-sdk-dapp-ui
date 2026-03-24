import { h } from '@stencil/core';
import type {
  CustomToastType,
  IComponentToast,
  ISimpleToast,
} from 'components/functional/toasts-list/components/transaction-toast/transaction-toast.type';

import { CustomToast } from './components/custom-create-toast/custom-toast';
import { SimpleToast } from './components/simple-toast/simple-toast';

interface GenericToastPropsType {
  toast: CustomToastType;
  onDeleteToast?: (toastId: string) => void;
}

export function GenericToast({ toast, onDeleteToast }: GenericToastPropsType) {
  const isComponentToast = 'instantiateToastElement' in toast;
  if (isComponentToast) {
    return (
      <CustomToast
        toast={toast as IComponentToast}
        onDeleteToast={() => onDeleteToast?.(toast.toastId)}
      />
    );
  }

  return (
    <SimpleToast
      toast={toast as ISimpleToast}
      onDeleteToast={() => onDeleteToast?.(toast.toastId)}
    />
  );
}
