// prettier-ignore
export default {
    trim: 'trim mvx:flex mvx:relative mvx:max-w-full mvx:overflow-hidden mvx:whitespace-nowrap',
    trimFull: 'trim-full mvx:text-transparent mvx:absolute mvx:leading-5',
    trimFullVisible: 'trim-full-visible mvx:!text-inherit mvx:relative mvx:leading-5',
    trimWrapper: 'trim-wrapper mvx:hidden',
    trimWrapperVisible: 'trim-wrapper-visible mvx:overflow-hidden mvx:max-w-full mvx:flex',
    trimEllipsisWrapper: 'trim-ellipsis-wrapper mvx:block mvx:flex-shrink-0 mvx:pointer-events-none mvx:select-none',
    trimEllipsis: 'trim-ellipsis mvx:block mvx:leading-5',
    trimLeftWrapper: 'trim-left-wrapper mvx:flex-shrink mvx:text-ellipsis mvx:overflow-hidden mvx:text-left mvx:text-[1px]',
    trimLeft: 'trim-left mvx:select-none mvx:pointer-events-none mvx:inline mvx:text-base mvx:leading-5 mvx:-webkit-letter-spacing',
    trimRightWrapper: 'trim-right-wrapper mvx:flex-shrink mvx:text-ellipsis mvx:overflow-hidden mvx:whitespace-nowrap mvx:text-right mvx:text-[1px]',
    trimRight: 'trim-right mvx:select-none mvx:pointer-events-none mvx:inline mvx:text-base mvx:leading-5 mvx:text-clip mvx:-webkit-letter-spacing',
    trimStoriesWrapper: 'trim-stories-wrapper mvx:text-primary'
} satisfies Record<string, string>;