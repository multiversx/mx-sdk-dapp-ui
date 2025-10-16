import { h } from '@stencil/core';
import { DataTestIdsEnum } from 'constants/dataTestIds.enum';
import { ELLIPSIS } from 'constants/htmlStrings';
import styles from './trim.styles'

interface TrimPropsType {
    dataTestId?: string;
    class?: string;
    text: string;
    shouldTrim?: boolean;
    trimFontSize?: string;
    onTrimElementReference?: (element: HTMLDivElement) => void;
    onFullWidthTrimElementReference?: (element: HTMLDivElement) => void;
}

export function Trim({
    dataTestId = DataTestIdsEnum.trim,
    class: className,
    text,
    shouldTrim = false,
    trimFontSize = '1rem',
    onTrimElementReference,
    onFullWidthTrimElementReference
}: TrimPropsType) {
    const middleTextIndex = Math.floor(text.length / 2);
    const leftHandText = text.slice(0, middleTextIndex);
    const rightHandText = text.slice(middleTextIndex);

    return (
        <div
            data-testid={dataTestId}
            ref={onTrimElementReference}
            class={{ [styles.trim]: true, [className]: Boolean(className) }}
        >
            <div
                data-testid={DataTestIdsEnum.trimFullAddress}
                ref={onFullWidthTrimElementReference}
                class={{ [styles.trimFull]: true, [styles.trimFullVisible]: !shouldTrim }}
            >
                {text}
            </div>

            <div class={{ [styles.trimWrapper]: true, [styles.trimWrapperVisible]: shouldTrim }}>
                <div class={styles.trimLeftWrapper}>
                    <div class={styles.trimLeft} style={{ fontSize: trimFontSize }}>
                        {leftHandText}
                    </div>
                </div>

                <div class={styles.trimEllipsisWrapper}>
                    <div class={styles.trimEllipsis}>{ELLIPSIS}</div>
                </div>

                <div class={styles.trimRightWrapper}>
                    <div class={styles.trimRight} style={{ fontSize: trimFontSize }}>
                        {rightHandText}
                    </div>
                </div>
            </div>
        </div>
    );
}