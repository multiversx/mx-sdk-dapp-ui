import { h } from '@stencil/core';
import { Tooltip as TooltipComponent } from 'common/Tooltip/Tooltip';

const tooltipVisibilityMap = new Map<string, boolean>();
let tooltipCounter = 0;

interface MvxTooltipPropsType {
  position?: 'top' | 'bottom';
  triggerOnClick?: boolean;
  trigger: HTMLElement;
  class?: string;
  isTooltipVisible?: boolean;
  onVisibilityChange?: (isVisible: boolean) => void;
  onTriggerRender?: (isVisible: boolean) => void;
  tooltipKey?: string;
}

export function MvxTooltip(
  {
    position = 'top',
    triggerOnClick = false,
    trigger,
    class: className,
    isTooltipVisible,
    onVisibilityChange,
    onTriggerRender,
    tooltipKey,
  }: MvxTooltipPropsType,
  children?: any,
) {
  const key = tooltipKey ?? `tooltip-${tooltipCounter++}`;
  const visible = isTooltipVisible ?? (tooltipVisibilityMap.get(key) ?? false);

  const handleVisibilityChange = (isVisible: boolean) => {
    tooltipVisibilityMap.set(key, isVisible);
    onVisibilityChange?.(isVisible);
    onTriggerRender?.(isVisible);
  };

  return (
    <TooltipComponent
      position={position}
      triggerOnClick={triggerOnClick}
      trigger={trigger}
      class={className}
      isTooltipVisible={visible}
      onVisibilityChange={handleVisibilityChange}
    >
      {children}
    </TooltipComponent>
  );
}
