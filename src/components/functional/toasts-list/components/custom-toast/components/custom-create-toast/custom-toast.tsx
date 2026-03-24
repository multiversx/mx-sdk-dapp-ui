import { h } from '@stencil/core';
import { Icon } from 'common/Icon';
import type { IComponentToast } from 'components/functional/toasts-list/components/transaction-toast/transaction-toast.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

interface CustomToastPropsType {
  toast: IComponentToast;
  onDeleteToast?: () => void;
}

export function CustomToast({ toast, onDeleteToast }: CustomToastPropsType) {
  const initializeToast = (container: HTMLElement) => {
    if (!container) {
      return;
    }

    // Clear previous toast element
    if (container.hasChildNodes()) {
      container.innerHTML = '';
    }

    const customElement = toast.instantiateToastElement();
    if (!customElement) {
      return;
    }
    container.appendChild(customElement);
  };

  return (
    <div class="toast-wrapper" data-testid={DataTestIdsEnum.transactionToastContent}>
      {toast.hasCloseButton !== false && (
        <button onClick={onDeleteToast} type="button" class="icon-close">
          <Icon name="close" />
        </button>
      )}
      <div class="toast-body" ref={initializeToast}></div>
    </div>
  );
}
