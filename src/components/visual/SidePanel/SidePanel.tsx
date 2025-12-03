import { h } from '@stencil/core';
import classNames from 'classnames';
import { SidePanelHeader } from './components/SidePanelHeader/SidePanelHeader';
import { SidePanelSwiper } from './components/SidePanelSwiper/SidePanelSwiper';
import { handleSidePanelOpenChange } from './helpers/handleSidePanelOpenChange';
import state from './sidePanelStore';

// prettier-ignore
// const styles = {
//   sidePanelWrapper: 'side-panel-wrapper mvx:flex mvx:justify-end mvx:items-start mvx:z-50 mvx:pointer-events-none mvx:invisible mvx:xs:fixed mvx:xs:top-0 mvx:xs:left-0 mvx:xs:right-0 mvx:xs:bottom-0 mvx:xs:p-4 mvx:xs:pr-0 mvx:xs:items-center mvx:before:opacity-0 mvx:before:left-0 mvx:before:top-0 mvx:before:right-0 mvx:before:bottom-0 mvx:before:transition-all mvx:before:absolute mvx:before:duration-200 mvx:before:pointer-events-none mvx:before:ease-in-out mvx:before:bg-neutral-900 mvx:before:content-[""] mvx:before:supports-[backdrop-filter]:opacity-50 mvx:before:supports-[backdrop-filter]:backdrop-blur-sm mvx:before:supports-[backdrop-filter]:bg-neutral-900',
//   sidePanelWrapperVisible: 'side-panel-wrapper-visible mvx:pointer-events-auto mvx:visible mvx:before:opacity-90 mvx:before:supports-[backdrop-filter]:opacity-50',
//   sidePanel: 'side-panel mvx:p-6 mvx:w-full mvx:flex mvx:overflow-hidden mvx:flex-col mvx:transition-all mvx:ease-in-out mvx:duration-200 mvx:rounded-tl-3xl mvx:rounded-tr-3xl mvx:backdrop-blur mvx:pb-0 mvx:border mvx:border-outline mvx:bg-surface mvx:xs:w-110 mvx:xs:h-full mvx:xs:mr-4 mvx:xs:rounded-[20px] mvx:xs:translate-x-[calc(100%+48px)] mvx:after:left-0 mvx:after:right-0 mvx:after:h-0 mvx:after:absolute mvx:after:shadow-lg mvx:after:shadow-surface mvx:after:-bottom-1 mvx:after:content-[""]',
//   sidePanelVisible: 'side-panel-visible mvx:transform mvx:translate-y-0 mvx:xs:translate-x-0',
//   sidePanelContent: 'side-panel-content mvx:flex-1 mvx:flex mvx:flex-col mvx:overflow-auto mvx:scrollbar-hide'
// } satisfies Record<string, string>;

interface SidePanelPropsType {
  isOpen?: boolean;
  panelClassName?: string;
  panelTitle: string;
  hasBackButton?: boolean;
  showHeader?: boolean;
  onClose?: () => void;
  onBack?: () => void;
}

export function SidePanel({
  isOpen = false,
  panelClassName,
  panelTitle,
  hasBackButton,
  showHeader = true,
  onClose,
  onBack
}: SidePanelPropsType, children: JSX.Element) {
  if (isOpen !== undefined) {
    handleSidePanelOpenChange(isOpen, (shouldAnimate) => {
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
      // class={classNames([styles.sidePanelWrapper], {
      //   [styles.sidePanelWrapperVisible]: shouldAnimate,
      // })}
      class={classNames('side-panel-wrapper', {
        visible: shouldAnimate,
      })}
    >
      <SidePanelSwiper
        open={shouldAnimate}
        onSheetDismiss={onClose}
      >
        <div
          id={sidePanelIdentifier}
          // class={classNames([styles.sidePanel], { [styles.sidePanelVisible]: shouldAnimate }, panelClassName)}
          class={classNames('side-panel', { visible: shouldAnimate }, panelClassName)}
        >
          {showHeader && (
            <SidePanelHeader
              panelTitle={panelTitle}
              panelClassName={panelClassName}
              hasLeftButton={hasBackButton}
              onRightButtonClick={handleCloseClick}
              onLeftButtonClick={handleBackClick}
            />
          )}

          <div
            // class={styles.sidePanelContent}
            class="side-panel-content"
          >
            {children}
          </div>
        </div>
      </SidePanelSwiper>
    </div>
  );
}

