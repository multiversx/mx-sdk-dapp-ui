// prettier-ignore
export default {
    pagination: 'pagination mvx:flex mvx:items-center mvx:gap-2 mvx:leading-none mvx:select-none mvx:justify-center mvx:text-base mvx:max-w-120',
    paginationAngle: 'pagination-angle mvx:hidden mvx:text-primary mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:cursor-pointer mvx:hover:text-accent mvx:mobile-lg:flex',
    paginationAngleDisabled: 'pagination-angle-disabled mvx:pointer-events-none mvx:text-secondary-text mvx:opacity-50',
    paginationAngleInactive: 'pagination-angle-inactive mvx:pointer-events-none mvx:text-secondary-text',
    paginationAngleIcon: 'pagination-angle-icon mvx:text-xs mvx:xxs:text-base mvx:xxs:leading-none',
    paginationEdgeButton: 'pagination-edge-button mvx:text-primary mvx:hidden mvx:gap-2 mvx:items-center mvx:cursor-pointer mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:hover:text-accent mvx:mobile-lg:p-0 mvx:mobile-lg:my-0 mvx:mobile-lg:mx-1 mvx:mobile-lg:flex',
    paginationEdgeButtonDisabled: 'pagination-edge-button-disabled mvx:pointer-events-none mvx:text-secondary-text mvx:opacity-50',
    paginationEdgeButtonInactive: 'pagination-edge-button-inactive mvx:pointer-events-none mvx:text-secondary-text',
    paginationEdgeButtonIcon: 'pagination-edge-button-icon mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:text-xs mvx:xxs:text-base',
    paginationItems: 'pagination-items mvx:flex mvx:gap-2 mvx:my-0 mvx:mx-1 mvx:items-center',
    paginationItemWrapper: 'pagination-item-wrapper mvx:cursor-pointer mvx:text-center mvx:h-7 mvx:w-7 mvx:flex mvx:items-center mvx:justify-center mvx:transition-all mvx:duration-200 mvx:ease-in-out mvx:md:h-8 mvx:md:w-8',
    paginationItemWrapperDisabled: 'pagination-item-wrapper-disabled mvx:pointer-events-none mvx:cursor-default mvx:opacity-50',
    paginationItem: 'pagination-item mvx:text-primary mvx:relative mvx:flex mvx:justify-center mvx:items-center mvx:py-2 mvx:px-0 mvx:text-center mvx:w-7 mvx:h-7 mvx:transition-colors mvx:duration-200 mvx:ease-in-out mvx:rounded mvx:text-xs mvx:hover:text-accent mvx:md:text-base mvx:md:h-8 mvx:md:w-8',
    paginationItemBefore: 'pagination-item-before mvx:before:absolute mvx:before:transition-all mvx:before:duration-200 mvx:before:ease-in-out mvx:before:pointer-events-none mvx:before:transform mvx:before:w-7 mvx:before:left-1/2 mvx:before:top-1/2 mvx:before:h-7 mvx:before:z-1 mvx:before:rounded-full mvx:before:opacity-20 mvx:before:-translate-y-1/2 mvx:before:-translate-x-1/2 mvx:before:bg-pagination-item mvx:hover:before:opacity-100 mvx:hover:before:bg-pagination-item-hover mvx:md:before:h-8 mvx:md:before:w-8',
    paginationItemActive: 'pagination-item-active mvx:text-accent mvx:before:opacity-100 mvx:before:bg-pagination-item-hover',
    paginationItemHundreds: 'pagination-item-hundreds mvx:text-tiny! mvx:md:text-xxs!',
    paginationItemText: 'pagination-item-text mvx:z-2 mvx:relative'
} satisfies Record<string, string>;
