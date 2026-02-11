import { h } from '@stencil/core';
import classNames from 'classnames';
import { Icon } from 'common/Icon';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';

// prettier-ignore
const styles = {
  sidePanelHeading: 'side-panel-heading mvx:flex mvx:items-center mvx:leading-none mvx:gap-3 mvx:z-1 mvx:relative mvx:px-0 mvx:py-2 mvx:text-2xl mvx:shadow-lg mvx:shadow-surface',
  sidePanelHeadingLeft: 'side-panel-heading-left mvx:mr-auto mvx:hidden mvx:pointer-events-none mvx:cursor-pointer mvx:opacity-0 mvx:text-secondary-text mvx:xs:flex mvx:hover:opacity-75',
  sidePanelHeadingRight: 'side-panel-heading-right mvx:ml-auto mvx:hidden mvx:pointer-events-none mvx:cursor-pointer mvx:opacity-0 mvx:text-secondary-text mvx:xs:flex mvx:hover:opacity-75',
  sidePanelHeadingLeftVisible: 'side-panel-heading-left-visible mvx:transition-all mvx:opacity-100 mvx:duration-200 mvx:ease-in-out mvx:!pointer-events-auto mvx:flex mvx:hover:opacity-75',
  sidePanelHeadingRightVisible: 'side-panel-heading-right-visible mvx:transition-all mvx:opacity-100 mvx:duration-200 mvx:ease-in-out mvx:!pointer-events-auto mvx:!flex mvx:hover:opacity-75',
  sidePanelHeadingTitle: 'side-panel-heading-title mvx:font-medium mvx:text-primary'
} satisfies Record<string, string>;

interface SidePanelHeaderPropsType {
  panelClassName?: string;
  panelTitle: string;
  hasLeftButton?: boolean;
  hasRightButton?: boolean;
  onRightButtonClick?: (event: MouseEvent) => void;
  onLeftButtonClick?: (event: MouseEvent) => void;
  leftIcon?: any;
  rightIcon?: any;
}

export function SidePanelHeader({
  panelClassName,
  panelTitle,
  hasLeftButton = true,
  hasRightButton = true,
  onRightButtonClick,
  onLeftButtonClick,
  leftIcon,
  rightIcon,
}: SidePanelHeaderPropsType) {
  const handleRightIconClick = (event: MouseEvent) => {
    event.preventDefault();
    onRightButtonClick?.(event);
  };

  const handleLeftIconClick = (event: MouseEvent) => {
    event.preventDefault();
    onLeftButtonClick?.(event);
  };

  return (
    <div class={classNames(styles.sidePanelHeading, panelClassName)}>
      <div
        class={{ [styles.sidePanelHeadingLeft]: true, [styles.sidePanelHeadingLeftVisible]: hasLeftButton }}
        onClick={handleLeftIconClick}
      >
        {hasLeftButton && (leftIcon || <Icon name="back-arrow" />)}
      </div>

      <div class={styles.sidePanelHeadingTitle}>{panelTitle}</div>

      <div
        class={{ [styles.sidePanelHeadingRight]: true, [styles.sidePanelHeadingRightVisible]: hasRightButton }}
        onClick={handleRightIconClick}
        data-testid={DataTestIdsEnum.sidePanelCloseButton}
      >
        {hasRightButton && (rightIcon || <Icon name="close" />)}
      </div>
    </div>
  );
}
