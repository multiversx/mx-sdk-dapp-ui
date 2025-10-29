import { h } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { ELLIPSIS } from 'constants/htmlStrings';
import { safeWindow } from 'constants/window.constants';

import styles from './trim.styles';

interface TrimPropsType {
  dataTestId?: string;
  class?: string;
  text: string;
  onTrimElementReference?: (element: HTMLDivElement) => void;
  onFullWidthTrimElementReference?: (element: HTMLDivElement) => void;
}

export function Trim({ dataTestId = DataTestIdsEnum.trim, class: className, text }: TrimPropsType) {
  const middleTextIndex = Math.floor(text.length / 2);
  const leftHandText = text.slice(0, middleTextIndex);
  const rightHandText = text.slice(middleTextIndex);

  // Keep references to elements and observer
  let fullWidthUntrimmedElementReference: HTMLDivElement;
  let trimElementReference: HTMLDivElement;
  let trimFullElement: HTMLDivElement;
  let trimWrapperElement: HTMLDivElement;
  let resizeObserver: ResizeObserver;
  let currentTrimFontSize = '1rem';

  const handleTrimElementReference = (element: HTMLDivElement) => {
    if (element) {
      trimElementReference = element;
      setupResizeObserver();
      requestAnimationFrame(checkOverflow);
    }
  };

  const handleFullWidthTrimElementReference = (element: HTMLDivElement) => {
    if (element) {
      fullWidthUntrimmedElementReference = element;
    }
  };

  const handleTrimFullRef = (element: HTMLDivElement) => {
    if (element) {
      trimFullElement = element;
    }
  };

  const handleTrimWrapperRef = (element: HTMLDivElement) => {
    if (element) {
      trimWrapperElement = element;
    }
  };

  const setupResizeObserver = () => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }

    resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    if (trimElementReference) {
      resizeObserver.observe(trimElementReference);
    }
  };

  const checkOverflow = () => {
    if (!fullWidthUntrimmedElementReference || !trimElementReference || !trimFullElement || !trimWrapperElement) {
      return;
    }

    const hiddenFullWidthElementWidth = fullWidthUntrimmedElementReference.offsetWidth;
    const trimmedElementWidth = trimElementReference.offsetWidth;
    const isTrimElementOverflowing = hiddenFullWidthElementWidth > trimmedElementWidth;

    if (safeWindow) {
      currentTrimFontSize = safeWindow.getComputedStyle(trimElementReference).fontSize;
      // Update font size on trim elements
      const trimLeftElement = trimElementReference.querySelector(`.${styles.trimLeft}`) as HTMLElement;
      const trimRightElement = trimElementReference.querySelector(`.${styles.trimRight}`) as HTMLElement;
      if (trimLeftElement) {
        trimLeftElement.style.fontSize = currentTrimFontSize;
      }

      if (trimRightElement) {
        trimRightElement.style.fontSize = currentTrimFontSize;
      }
    }

    // Update classes based on overflow
    if (isTrimElementOverflowing) {
      // Show trimmed version
      trimFullElement.classList.remove(styles.trimFullVisible);
      trimWrapperElement.classList.add(styles.trimWrapperVisible);
    } else {
      // Show full text
      trimFullElement.classList.add(styles.trimFullVisible);
      trimWrapperElement.classList.remove(styles.trimWrapperVisible);
    }
  };

  return (
    <div
      data-testid={dataTestId}
      ref={handleTrimElementReference}
      class={{ [styles.trim]: true, [className]: Boolean(className) }}
    >
      <div
        data-testid={DataTestIdsEnum.trimFullAddress}
        ref={el => {
          handleFullWidthTrimElementReference(el);
          handleTrimFullRef(el);
        }}
        class={styles.trimFull}
      >
        {text}
      </div>

      <div ref={handleTrimWrapperRef} class={styles.trimWrapper}>
        <div class={styles.trimLeftWrapper}>
          <div class={styles.trimLeft} style={{ fontSize: currentTrimFontSize }}>
            {leftHandText}
          </div>
        </div>

        <div class={styles.trimEllipsisWrapper}>
          <div class={styles.trimEllipsis}>{ELLIPSIS}</div>
        </div>

        <div class={styles.trimRightWrapper} style={{ direction: 'rtl' }}>
          <div class={styles.trimRight} style={{ fontSize: currentTrimFontSize }}>
            {rightHandText}
          </div>
        </div>
      </div>
    </div>
  );
}
