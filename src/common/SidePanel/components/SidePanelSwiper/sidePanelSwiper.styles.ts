// prettier-ignore
export default {
    sidePanelSwiperContainer: 'side-panel-swiper-container mvx:flex mvx:xs:flex-col mvx:xs:h-full',
    sidePanelSwiperWrapper: 'side-panel-swiper-wrapper mvx:fixed mvx:left-0 mvx:top-0 mvx:bottom-0 mvx:right-0 mvx:z-50 mvx:xs:static mvx:xs:h-full mvx:before:opacity-90 mvx:before:left-0 mvx:before:top-0 mvx:before:right-0 mvx:before:bottom-0 mvx:before:transition-all mvx:before:duration-200 mvx:before:pointer-events-none mvx:before:absolute mvx:before:ease-in-out mvx:before:bg-neutral-900 mvx:before:content-[""] mvx:before:supports-[backdrop-filter]:opacity-50 mvx:before:supports-[backdrop-filter]:backdrop-blur-sm mvx:before:supports-[backdrop-filter]:bg-neutral-900 mvx:xs:before:content-none',
    sidePanelSwiperWrapperVisible: 'side-panel-swiper-visible mvx:!flex',
    sidePanelSwiperWrapperHidden: 'side-panel-swiper-wrapper-hidden mvx:hidden mvx:xs:block',
    sidePanelSwiperHidden: 'side-panel-swiper-hidden mvx:translate-y-full',
    sidePanelSwiper: 'side-panel-swiper mvx:bottom-0 mvx:absolute mvx:left-0 mvx:right-0 mvx:flex mvx:flex-col mvx:justify-end mvx:touch-pan-y mvx:h-auto mvx:min-h-dvh mvx:rounded-t-3xl mvx:transition-none mvx:backface-hidden mvx:will-change-transform mvx:xs:h-full mvx:xs:static mvx:xs:rounded-none mvx:xs:transform-none mvx:xs:[justify-content:unset] mvx:xs:min-h-auto',
    sidePanelSwiperHandleWrapper: 'side-panel-swiper-handle-wrapper mvx:top-8 mvx:relative mvx:h-8 mvx:w-full mvx:z-12 mvx:xs:hidden',
    sidePanelSwiperHandleContainer: 'side-panel-swiper-handle-container mvx:flex mvx:top-0 mvx:bottom-0 mvx:absolute mvx:right-0 mvx:left-0 mvx:justify-center mvx:touch-none mvx:select-none mvx:cursor-grab mvx:active:cursor-grabbing',
    sidePanelSwiperHandle: 'side-panel-swiper-handle mvx:w-32 mvx:mt-3 mvx:h-1 mvx:rounded mvx:bg-primary',
    sidePanelSwiperContent: 'side-panel-swiper-content mvx:overflow-y-auto mvx:max-h-[calc(100dvh-4rem)] mvx:xs:max-h-none mvx:xs:h-full'
} satisfies Record<string, string>;
