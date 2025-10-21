import { h } from '@stencil/core';
import { Icon } from 'common/Icon';

// prettier-ignore
const styles = {
    explorerLink: 'explorer-link mvx:decoration-0 mvx:flex',
    explorerLinkIcon: 'explorer-link-icon mvx:flex mvx:justify-center mvx:transition-opacity mvx:duration-200 mvx:ease-in-out mvx:hover:opacity-80'
} satisfies Record<string, string>;

interface ExplorerLinkPropsType {
    class?: string;
    iconClass?: string;
    dataTestId?: string;
    link: string;
}

export function ExplorerLink({ class: className, iconClass, dataTestId, link }: ExplorerLinkPropsType, children: JSX.Element) {
    if (!link) {
        return null;
    }

    const hasToAddress = link.split('/').length > 3;

    return (
        <a
            target="_blank"
            rel="noreferrer"
            href={link}
            data-testid={dataTestId}
            class={{ [styles.explorerLink]: true, [className]: Boolean(className) }}
        >
            {children[0].$children$ !== null ? children : (
                hasToAddress &&
                <Icon
                    name="arrow-up-right-from-square-icon"
                    class={{ [styles.explorerLinkIcon]: true, [iconClass]: Boolean(iconClass) }}
                />
            )}
        </a>
    );

}
