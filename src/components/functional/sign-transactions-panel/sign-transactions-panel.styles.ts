// prettier-ignore
export default {
    signTransactionContent: 'sign-transaction-content mvx:flex mvx:flex-col mvx:items-center mvx:gap-2 mvx:relative mvx:min-w-0 mvx:self-stretch mvx:flex-nowrap mvx:shrink-0',
    signTransactionsTabs: 'sign-transactions-tabs mvx:px-4 mvx:gap-2 mvx:flex mvx:mr-auto',
    signTransactionsTab: 'sign-transactions-tab mvx:px-4 mvx:h-8 mvx:flex mvx:items-center mvx:leading-none mvx:justify-center mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:cursor-pointer mvx:relative mvx:rounded-3xl mvx:text-secondary-text mvx:hover:text-accent mvx:hover:bg-secondary mvx:active:text-accent mvx:active:bg-secondary',
    signTransactionsTabActive: 'sign-transactions-tab-active mvx:!text-accent mvx:!bg-secondary',
    signTransactionsTabText: 'sign-transactions-tab-text mvx:text-base mvx:z-1 mvx:relative mvx:capitalize',
    signTransactionsPanel: 'sign-transactions-panel mvx:flex mvx:flex-col mvx:flex-1 mvx:pb-6',
    button: 'button mvx:flex mvx:items-center mvx:justify-center mvx:font-bold mvx:leading-none mvx:px-4 mvx:max-h-full mvx:rounded-xl mvx:cursor-pointer mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:gap-2',
    buttonLarge: 'button-large mvx:h-12 mvx:text-base mvx:px-6',
    buttonSmall: 'button-small mvx:h-10 mvx:text-xs mvx:rounded-xl',
    buttonPrimary: 'button-primary mvx:text-button-primary mvx:bg-button-bg-primary mvx:border mvx:border-button-bg-primary',
    buttonSecondary: 'button-secondary mvx:relative mvx:text-button-secondary mvx:border mvx:border-transparent mvx:after:absolute mvx:after:inset-0 mvx:after:rounded-lg mvx:after:opacity-40 mvx:after:transition-all mvx:after:duration-200 mvx:after:ease-in-out mvx:after:bg-button-bg-secondary mvx:after:content-[""] mvx:after:-z-1 mvx:hover:opacity-100 mvx:hover:text-button-primary mvx:hover:after:opacity-100 mvx:hover:after:bg-button-bg-primary',
    buttonSecondarySmall: 'button-secondary-small mvx:after:rounded-xl',
    buttonNeutral: 'button-neutral mvx:text-neutral-925 mvx:bg-white mvx:hover:opacity-75',
    buttonDisabled: 'button-disabled mvx:pointer-events-none mvx:bg-transparent mvx:cursor-default mvx:border mvx:border-secondary-text mvx:!text-secondary-text mvx:hover:opacity-100',
    tooltipContent: 'tooltip-content mvx:flex-row mvx:cursor-default mvx:p-2 mvx:whitespace-nowrap mvx:text-xs mvx:rounded-xl mvx:leading-none mvx:!bg-surface mvx:border-outline-variant mvx:border mvx:text-primary mvx:after:left-1/2 mvx:after:origin-center mvx:after:w-2 mvx:after:h-2 mvx:after:absolute mvx:after:border mvx:after:border-outline-variant mvx:after:!bg-surface mvx:after:translate-x-[calc(50%-8px)] mvx:after:-rotate-[45deg] mvx:after:content-[""]',
} satisfies Record<string, string>;