import { h } from '@stencil/core';

// prettier-ignore
const styles = {
  tooltip: 'tooltip mvx:flex mvx:relative',
  tooltipContentWrapper: 'tooltip-content-wrapper mvx:left-1/2 mvx:absolute mvx:z-1 mvx:transform mvx:-translate-x-1/2',
  tooltipContent: 'tooltip-content mvx:flex-row mvx:cursor-default mvx:p-2 mvx:whitespace-nowrap mvx:text-xs mvx:rounded-xl mvx:leading-none mvx:!bg-surface mvx:border-outline-variant mvx:border mvx:text-primary mvx:after:left-1/2 mvx:after:origin-center mvx:after:w-2 mvx:after:h-2 mvx:after:absolute mvx:after:border mvx:after:border-outline-variant mvx:after:!bg-surface mvx:after:translate-x-[calc(50%-8px)] mvx:after:-rotate-[45deg] mvx:after:content-[""]',
  tooltipContentTop: 'tooltip-content-top mvx:after:border-t-0 mvx:after:border-r-0 mvx:after:-bottom-1',
  tooltipContentBottom: 'tooltip-content-bottom mvx:after:border-b-0 mvx:after:border-l-0 mvx:after:-top-1'
} satisfies Record<string, string>;

interface TooltipPropsType {
  position?: 'top' | 'bottom';
  triggerOnClick?: boolean;
  trigger: HTMLElement;
  class?: string;
  contentClass?: string;
  isTooltipVisible?: boolean;
  onVisibilityChange?: (isTooltipVisible: boolean) => void;
}

export function Tooltip(
  {
    position = 'top',
    triggerOnClick = false,
    trigger,
    class: className,
    contentClass,
    onVisibilityChange,
    isTooltipVisible = false,
  }: TooltipPropsType,
  children?: any,
) {
  const setTooltipVisible = (isTooltipVisible: boolean) => {
    onVisibilityChange?.(isTooltipVisible);
  };

  const handleEllipsisClick = (event: MouseEvent) => {
    if (!triggerOnClick) {
      return;
    }

    event.preventDefault();
    setTooltipVisible(!isTooltipVisible);
  };

  const handleFocusOut = (event: FocusEvent) => {
    const relatedTarget = event.relatedTarget as Node;
    const currentTarget = event.currentTarget as HTMLElement;

    if (!currentTarget.contains(relatedTarget)) {
      setTooltipVisible(false);
    }
  };

  const handleMouseEvent = (isTooltipVisible: boolean) => {
    if (triggerOnClick) {
      return;
    }

    return (event: MouseEvent) => {
      event.preventDefault();
      setTooltipVisible(isTooltipVisible);
    };
  };

  return (
    <div
      onClick={handleEllipsisClick}
      onMouseEnter={handleMouseEvent(true)}
      onMouseLeave={handleMouseEvent(false)}
      class={{ [styles.tooltip]: true, [className]: Boolean(className) }}
    >
      {isTooltipVisible && (
        <div
          class={styles.tooltipContentWrapper}
          style={{
            top: position === 'bottom' ? 'calc(100% + 16px)' : undefined,
            bottom: position === 'top' ? 'calc(100% + 16px)' : undefined,
          }}
        >
          <div
            class={{
              [styles.tooltipContent]: true,
              [styles.tooltipContentTop]: position === 'top',
              [styles.tooltipContentBottom]: position === 'bottom',
              [contentClass || '']: Boolean(contentClass),
            }}
            tabIndex={-1}
            onFocusout={handleFocusOut}
            onClick={(event: MouseEvent) => event.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
      <span>{trigger}</span>
    </div>
  );
}
