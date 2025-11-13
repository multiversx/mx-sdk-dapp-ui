import { h } from '@stencil/core';
import { Icon } from 'common/Icon';
import { copyToClipboard } from 'utils/copyToClipboard';

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
}

let timeoutId: number | null = null;
let isSuccess: boolean = false;

export function CopyButton({ iconClass, class: className, text }: CopyButtonPropsType) {

    const handleClick = async (event: MouseEvent) => {
        const trimmedText = text ? text.trim() : text;
        const success = await copyToClipboard(trimmedText);

        event.preventDefault();
        event.stopPropagation();

        isSuccess = success;

        if (success) {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            timeoutId = window.setTimeout(() => {
                isSuccess = false;
            }, 2000);
        }
    }

    return (
        <div
            onClick={handleClick}
            class={{
                [styles.copyButton]: true,
                [className]: Boolean(className),
            }}
        >
            <Icon
                name={isSuccess ? 'check' : 'copy'}
                class={{
                    [styles.copyButtonIcon]: true,
                    [styles.copyButtonIconCheck]: isSuccess,
                    [iconClass]: Boolean(iconClass),
                }}
            />
        </div>
    );
}
