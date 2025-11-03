import { IconNamesEnum } from "common/Icon/icon.types";

const iconMap: Record<IconNamesEnum, true> = Object.values(IconNamesEnum).reduce((acc, icon) => {
    acc[icon] = true;
    return acc;
}, {} as Record<IconNamesEnum, true>);

function isValidIcon(value: string): value is IconNamesEnum {
    return value in iconMap;
}

export function getValidIcon(icon: string): IconNamesEnum {
    return isValidIcon(icon) ? icon : null;
}

