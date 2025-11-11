import { h } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { ELLIPSIS } from 'constants/htmlStrings';
import { safeWindow } from 'constants/window.constants';

import styles from './trim.styles'

interface TrimPropsType {
    dataTestId?: string;
    class?: string;
    text: string;
}

export function Trim({
    dataTestId = DataTestIdsEnum.trim,
    class: className,
    text
}: TrimPropsType) {
    let fullWidthUntrimmedElementReference: HTMLDivElement;
    let trimElementReference: HTMLDivElement;
    let resizeObserver: ResizeObserver;
    let currentTrimFontSize = '1rem';
    let trimFullElement: HTMLDivElement;
    let trimWrapperElement: HTMLDivElement;
    let isCurrentlyOverflowing: boolean | null = null;
    let isCheckingOverflow = false;

    const handleTrimElementReference = (element: HTMLDivElement) => {
        if (element) {
            trimElementReference = element;
            setupResizeObserver();
            requestAnimationFrame(checkOverflow);
        }
    }

    const handleFullWidthTrimElementReference = (element: HTMLDivElement) => {
        if (element) {
            fullWidthUntrimmedElementReference = element;
        }
    }

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
    }

    const checkOverflow = () => {
        if (isCheckingOverflow) {
            return;
        }

        if (!fullWidthUntrimmedElementReference || !trimElementReference || !trimFullElement || !trimWrapperElement) {
            return;
        }

        isCheckingOverflow = true;

        if (resizeObserver) {
            resizeObserver.disconnect();
        }

        const trimFullVisibleClasses = styles.trimFullVisible.split(/\s+/);
        const trimWrapperVisibleClasses = styles.trimWrapperVisible.split(/\s+/);

        const hasFullVisible = trimFullElement.classList.contains(trimFullVisibleClasses[0]);
        const hasWrapperVisible = trimWrapperElement.classList.contains(trimWrapperVisibleClasses[0]);

        if (hasFullVisible) {
            trimFullElement.classList.remove(...trimFullVisibleClasses);
        }
        if (hasWrapperVisible) {
            trimWrapperElement.classList.remove(...trimWrapperVisibleClasses);
        }

        const hiddenFullWidthElementWidth = fullWidthUntrimmedElementReference.scrollWidth;
        const trimmedElementWidth = trimElementReference.clientWidth;
        const isTrimElementOverflowing = hiddenFullWidthElementWidth > trimmedElementWidth;

        if (isCurrentlyOverflowing === isTrimElementOverflowing) {
            if (hasFullVisible) {
                trimFullElement.classList.add(...trimFullVisibleClasses);
            }
            if (hasWrapperVisible) {
                trimWrapperElement.classList.add(...trimWrapperVisibleClasses);
            }

            isCheckingOverflow = false;

            setTimeout(() => {
                if (resizeObserver && trimElementReference) {
                    resizeObserver.observe(trimElementReference);
                }
            });
            return;
        }

        isCurrentlyOverflowing = isTrimElementOverflowing;

        requestAnimationFrame(() => {
            if (safeWindow) {
                currentTrimFontSize = safeWindow.getComputedStyle(trimElementReference).fontSize;
            }

            const getIdentifierClass = (classes: string) => classes.split(' ')[0];

            const trimLeftSelector = `.${getIdentifierClass(styles.trimLeft)}`;
            const trimRightSelector = `.${getIdentifierClass(styles.trimRight)}`;

            const trimLeftElement = trimElementReference.querySelector(trimLeftSelector) as HTMLElement;
            const trimRightElement = trimElementReference.querySelector(trimRightSelector) as HTMLElement;
            if (trimLeftElement) {
                trimLeftElement.style.fontSize = currentTrimFontSize;
            }

            if (trimRightElement) {
                trimRightElement.style.fontSize = currentTrimFontSize;
            }

            if (isTrimElementOverflowing) {
                trimFullElement.classList.remove(...trimFullVisibleClasses);
                trimWrapperElement.classList.add(...trimWrapperVisibleClasses);
            } else {
                trimFullElement.classList.add(...trimFullVisibleClasses);
                trimWrapperElement.classList.remove(...trimWrapperVisibleClasses);
            }

            isCheckingOverflow = false;

            requestAnimationFrame(() => {
                if (resizeObserver && trimElementReference) {
                    resizeObserver.observe(trimElementReference);
                }
            });
        });
    };

    const middleTextIndex = Math.floor(text.length / 2);
    const leftHandText = text.slice(0, middleTextIndex);
    const rightHandText = text.slice(middleTextIndex);

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