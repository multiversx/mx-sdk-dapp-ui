import { copyToClipboard } from 'utils/copyToClipboard';

interface CopyHandlerOptions {
    onSuccessChange?: (isSuccess: boolean) => void;
}

export function CopyButtonHandler({ onSuccessChange }: CopyHandlerOptions) {
    let timeoutId: number | null = null;

    return async (event: MouseEvent, text?: string) => {
        const trimmedText = text ? text.trim() : text;
        const success = await copyToClipboard(trimmedText);

        event.preventDefault();
        event.stopPropagation();

        if (onSuccessChange) {
            onSuccessChange(success);

            window.clearTimeout(timeoutId);
            if (success) {
                timeoutId = window.setTimeout(() => onSuccessChange(false), 2000);
            }
        }
    };
}