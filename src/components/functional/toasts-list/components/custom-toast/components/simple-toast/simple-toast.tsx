import { h } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import type { ISimpleToast } from 'components/functional/toasts-list/components/transaction-toast/transaction-toast.type';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

interface SimpleToastPropsType {
  toast: ISimpleToast;
  onDeleteToast?: () => void;
}

export function SimpleToast({ toast, onDeleteToast }: SimpleToastPropsType) {
  const { icon, iconClassName, title, message, subtitle } = toast;

  const renderIcon = () => (
    <div
      class={{
        'content-icon': true,
        [iconClassName]: Boolean(iconClassName),
      }}
    >
      <Icon name={icon} />
    </div>
  );

  return (
    <div class="content" data-testid={DataTestIdsEnum.transactionToastContent} id={`toast-${toast.toastId}`}>
      <div class="content-left">
        {renderIcon()}
        <div class="content-right">
          <div class="content-heading">
            {title && (
              <h5 class="content-heading-title" data-testid={DataTestIdsEnum.transactionToastTitle}>
                {title}
              </h5>
            )}
            {toast.hasCloseButton !== false && (
              <button onClick={onDeleteToast} type="button" class="icon-close">
                <Icon name="close" />
              </button>
            )}
          </div>
          {subtitle && <div class="subtitle">{subtitle}</div>}
          {message && (
            <div class={classNames('content-message', { 'no-margin': !title && !subtitle })}>{message}</div>
          )}
        </div>
      </div>
    </div>
  );
}
