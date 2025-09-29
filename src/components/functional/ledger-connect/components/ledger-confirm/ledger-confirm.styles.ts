// prettier-ignore
export default {
  ledgerConfirmHost: 'ledger-confirm-host mvx:flex mvx:flex-col mvx:flex-1 mvx:overflow-hidden',
  ledgerConfirm: 'ledger-confirm mvx:flex mvx:flex-col mvx:flex-1 mvx:gap-3 mvx:overflow-auto mvx:py-6 mvx:text-primary mvx:scrollbar-hide',
  ledgerConfirmItems: 'ledger-confirm-items mvx:flex mvx:flex-col mvx:gap-5',
  ledgerConfirmItem: 'ledger-confirm-item mvx:flex mvx:flex-col mvx:gap-4',
  ledgerConfirmItemLabel: 'ledger-confirm-item-label mvx:text-base mvx:leading-none',
  ledgerConfirmItemValue: 'ledger-confirm-item-value mvx:min-h-16 mvx:p-3 mvx:rounded-xl mvx:flex mvx:gap-3 mvx:items-center mvx:justify-between mvx:bg-secondary',
  ledgerConfirmItemValueText: 'ledger-confirm-item-value-text mvx:relative mvx:break-all',
  ledgerConfirmItemValueTextHighlighted: 'ledger-confirm-item-value-text-highlighted mvx:text-accent',
  ledgerConfirmItemValueActions: 'ledger-confirm-item-value-actions mvx:relative mvx:flex mvx:items-center mvx:gap-3 mvx:z-1 mvx:flex-1 mvx:justify-end',
  ledgerConfirmAction: 'ledger-confirm-action',
  ledgerConfirmActionEmphasized: 'ledger-confirm-action-emphasized mvx:font-bold mvx:text-accent',
  ledgerConfirmFooter: 'ledger-confirm-footer mvx:mt-auto mvx:p-3 mvx:rounded-xl mvx:flex mvx:items-center mvx:gap-2 mvx:relative mvx:xs:min-h-16 mvx:before:absolute mvx:before:inset-0 mvx:before:-z-1 mvx:before:opacity-30 mvx:before:rounded-xl mvx:before:bg-ledger-warning',
  ledgerConfirmFooterIcon: 'ledger-confirm-footer-icon mvx:flex-1 mvx:min-w-6 mvx:p-0.5 mvx:text-ledger-warning-message',
  ledgerConfirmFooterDescription: 'ledger-confirm-footer-description mvx:text-xs mvx:text-secondary-text',
  ledgerConfirmFooterDescriptionSupport: 'ledger-confirm-footer-description-support mvx:underline mvx:cursor-pointer mvx:text-ledger-warning-message',

} satisfies Record<string, string>;
