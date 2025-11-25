import { h } from '@stencil/core';
import { Icon } from 'common/Icon';

// prettier-ignore
const styles = {
    copyButton: 'copy-button mvx:flex',
    copyButtonIcon: 'copy-button-icon mvx:flex mvx:cursor-pointer mvx:justify-center mvx:transition-opacity mvx:duration-200 mvx:ease-in-out mvx:hover:opacity-80',
    copyButtonIconCheck: 'copy-button-icon-check mvx:hover:opacity-100! mvx:cursor-default!',
} satisfies Record<string, string>;

interface CopyButtonPropsType {
    iconClass?: string;
    class?: string;
    text: string;
    isSuccessOnCopy?: boolean;
    handleCopyButtonClick?: (event: MouseEvent) => void;
}

export function CopyButton({ iconClass, class: className, isSuccessOnCopy, handleCopyButtonClick }: CopyButtonPropsType) {
    return (
        <div
            onClick={(event) => handleCopyButtonClick?.(event)}
            class={{
                [styles.copyButton]: true,
                [className]: Boolean(className),
            }}
        >
            <Icon
                name={isSuccessOnCopy ? 'check' : 'copy'}
                class={{
                    [styles.copyButtonIcon]: true,
                    [styles.copyButtonIconCheck]: isSuccessOnCopy,
                    [iconClass]: Boolean(iconClass),
                }}
            />
        </div>
    );
}
