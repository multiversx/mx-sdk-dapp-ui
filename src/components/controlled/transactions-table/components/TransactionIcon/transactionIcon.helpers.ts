import { IconNameEnum } from "common/Icon/icon.types";

const iconMap: Record<IconNameEnum, true> = Object.values(IconNameEnum).reduce((acc, icon) => {
    acc[icon] = true;
    return acc;
}, {} as Record<IconNameEnum, true>);

function isValidIcon(value: string): value is IconNameEnum {
    return value in iconMap;
}

export function getValidIcon(icon: string): IconNameEnum {
    return isValidIcon(icon) ? icon : IconNameEnum.arrowUpRight;
}

