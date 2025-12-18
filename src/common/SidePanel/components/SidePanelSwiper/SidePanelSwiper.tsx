import { h } from '@stencil/core';

import { state } from '../../sidePanelStore';
import styles from './sidePanelSwiper.styles';

interface SidePanelSwiperPropsType {
  open: boolean;
  onSheetDismiss?: () => void;
  onSheetSnapChange?: (index: number, snapPoint: string) => void;
}

let hasInitialized = false;
let previousOpen: boolean | null = null;

const snapPointsArray: string[] = ['100%'];
const SNAP_PERCENT_DEFAULT = '50';
const OPEN_TIMEOUT_VALUE = 50;
const CLOSE_TIMEOUT_VALUE = 300;
const TRANSLATE_Y_VALUE = 100;
let sheetElement: HTMLElement | null = null;

let dragState = {
  startY: 0,
  currentY: 0,
  startTransform: 100,
  isAnimating: false,
};

let isDragging = false;

export function SidePanelSwiper(
  { open = false, onSheetDismiss, onSheetSnapChange }: SidePanelSwiperPropsType,
  children: JSX.Element,
) {
  const handleSheetDismiss = () => {
    onSheetDismiss?.();
  };

  const animateToPosition = (snapIndex: number, emitEvent: boolean = true) => {
    if (!sheetElement || dragState.isAnimating) {
      return;
    }

    const snapPercent = parseFloat(snapPointsArray[snapIndex] || SNAP_PERCENT_DEFAULT);
    const targetY = 100 - snapPercent;

    dragState.isAnimating = true;
    dragState.startTransform = targetY;

    sheetElement.style.transition = 'transform 350ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    sheetElement.style.transform = `translateY(${targetY}%)`;

    setTimeout(() => {
      dragState.isAnimating = false;
      if (emitEvent && state.isVisible) {
        onSheetSnapChange?.(snapIndex, snapPointsArray[snapIndex]);
      }
      if (sheetElement) {
        sheetElement.style.transition = '';
      }
    }, 350);
  };

  const openToSnapPoint = (snapIndex: number = 1) => {
    if (dragState.isAnimating) {
      return;
    }

    state.currentSnapIndex = Math.max(0, Math.min(snapIndex, snapPointsArray.length - 1));
    state.isVisible = true;

    setTimeout(() => {
      if (sheetElement && state.isVisible) {
        animateToPosition(state.currentSnapIndex, false);
      }
    }, OPEN_TIMEOUT_VALUE);
  };

  const animateToClose = () => {
    if (!sheetElement || dragState.isAnimating) {
      return;
    }

    dragState.isAnimating = true;
    sheetElement.style.transition = 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    sheetElement.style.transform = 'translateY(100%)';

    setTimeout(() => {
      dragState.isAnimating = false;
      state.isVisible = false;
      handleSheetDismiss();
      if (sheetElement) {
        sheetElement.style.transition = '';
      }
    }, CLOSE_TIMEOUT_VALUE);
  };

  const closeSwiper = () => {
    if (dragState.isAnimating || !state.isVisible) {
      return;
    }

    animateToClose();
  };

  if (previousOpen !== null && previousOpen !== open) {
    if (open && !state.isVisible) {
      openToSnapPoint(state.currentSnapIndex);
    } else if (!open && state.isVisible) {
      closeSwiper();
    }
  }

  previousOpen = open;

  const setSheetRef = (el: HTMLElement | null) => {
    sheetElement = el;

    if (el && !hasInitialized) {
      hasInitialized = true;
      state.isVisible = open;

      if (window.innerWidth <= 480) {
        el.style.transform = 'translateY(100%)';
      }

      if (open) {
        openToSnapPoint(state.currentSnapIndex);
      }
    }
  };

  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    if (dragState.isAnimating) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    isDragging = true;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragState.startY = clientY;
    dragState.currentY = clientY;

    // Get current transform
    const transform = getCurrentTransform();
    dragState.startTransform = transform;

    // Add global event listeners
    document.addEventListener('mousemove', handleDragMove, {
      passive: false,
    });
    document.addEventListener('touchmove', handleDragMove, {
      passive: false,
    });
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !sheetElement || dragState.isAnimating) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragState.currentY = clientY;

    const deltaY = dragState.currentY - dragState.startY;
    const viewportHeight = window.innerHeight;
    const deltaPercent = (deltaY / viewportHeight) * 100;

    const newTransform = Math.min(100, Math.max(0, dragState.startTransform + deltaPercent));

    sheetElement.style.transform = `translateY(${newTransform}%)`;
  };

  const handleDragEnd = () => {
    if (!isDragging || dragState.isAnimating) {
      return;
    }

    isDragging = false;

    // Remove global event listeners
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('touchmove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchend', handleDragEnd);

    const currentTransform = getCurrentTransform();
    const velocity = dragState.currentY - dragState.startY;

    // Close if dragged down significantly or fast downward velocity
    if (currentTransform > 70 || velocity > 150) {
      closeSwiper();
      return;
    }

    // Find closest snap point
    const snapPercentages = snapPointsArray.map(point => parseFloat(point));
    let closestIndex = 0;
    let closestDistance = Math.abs(100 - currentTransform - snapPercentages[0]);

    for (let i = 1; i < snapPercentages.length; i++) {
      const distance = Math.abs(100 - currentTransform - snapPercentages[i]);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    }

    state.currentSnapIndex = closestIndex;
    animateToPosition(closestIndex, true);
  };

  const getCurrentTransform = (): number => {
    if (!sheetElement) {
      return TRANSLATE_Y_VALUE;
    }

    const transform = sheetElement.style.transform;
    if (transform && transform.includes('translateY')) {
      const match = transform.match(/translateY\(([^)]+)%?\)/);
      if (match) {
        return parseFloat(match[1].replace('%', ''));
      }
    }
    return TRANSLATE_Y_VALUE;
  };
  return (
    <div class={styles.sidePanelSwiperContainer}>
      <div
        class={{
          [styles.sidePanelSwiperWrapper]: true,
          [styles.sidePanelSwiperWrapperVisible]: state.isVisible,
          [styles.sidePanelSwiperWrapperHidden]: !state.isVisible,
        }}
      >
        <div class={styles.sidePanelSwiper} ref={setSheetRef} onClick={(event: MouseEvent) => event.stopPropagation()}>
          <div class={styles.sidePanelSwiperHandleWrapper}>
            <div
              class={styles.sidePanelSwiperHandleContainer}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            >
              <div class={styles.sidePanelSwiperHandle} />
            </div>
          </div>

          <div class={styles.sidePanelSwiperContent}>{children}</div>
        </div>
      </div>
    </div>
  );
}
