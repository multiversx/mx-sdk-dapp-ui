import { h } from '@stencil/core';
import classNames from 'classnames';
import { SidePanelHeader } from './components/SidePanelHeader/SidePanelHeader';
import { SidePanelSwiper } from './components/SidePanelSwiper/SidePanelSwiper';
import { handleSidePanelOpenChange } from './helpers/handleSidePanelOpenChange';
import { state } from './sidePanelStore';

import styles from './sidePanel.styles';

interface SidePanelPropsType {
  isOpen?: boolean;
  panelClassName?: string;
  panelTitle: string;
  hasBackButton?: boolean;
  showHeader?: boolean;
  onClose?: () => void;
  onBack?: () => void;
}

export function SidePanel(
  { isOpen = false, panelClassName, panelTitle, hasBackButton, showHeader = true, onClose, onBack }: SidePanelPropsType,
  children: JSX.Element,
) {
  if (isOpen !== undefined) {
    handleSidePanelOpenChange(isOpen, shouldAnimate => {
      state.shouldAnimate = shouldAnimate;
    });
  }

  const sidePanelIdentifier = 'side-panel';
  const shouldAnimate = state.shouldAnimate;

  const handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  const handleCloseClick = (event: MouseEvent) => {
    event.preventDefault();
    onClose?.();
  };

  const handleBackClick = (event: MouseEvent) => {
    event.preventDefault();
    onBack?.();
  };

  return (
    <div
      onClick={handleOverlayClick}
      class={classNames([styles.sidePanelWrapper], { [styles.sidePanelWrapperVisible]: shouldAnimate })}
    >
      <SidePanelSwiper open={shouldAnimate} onSheetDismiss={onClose}>
        <div
          id={sidePanelIdentifier}
          class={classNames([styles.sidePanel], { [styles.sidePanelVisible]: shouldAnimate }, panelClassName)}
        >
          <div>
            {showHeader && (
              <SidePanelHeader
                panelTitle={panelTitle}
                panelClassName={panelClassName}
                hasLeftButton={hasBackButton}
                onRightButtonClick={handleCloseClick}
                onLeftButtonClick={handleBackClick}
              />
            )}
          </div>
          <div class={styles.sidePanelContent}>{children}</div>
        </div>
      </SidePanelSwiper>
    </div>
  );
}
