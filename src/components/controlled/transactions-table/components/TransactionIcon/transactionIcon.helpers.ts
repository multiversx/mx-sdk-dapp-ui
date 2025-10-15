import { getValidIconName } from "common/Icon/icon.helpers";
import { IconNameEnum } from "common/Icon/icon.types";

const iconMap: Record<IconNameEnum, true> = Object.values(IconNameEnum).reduce((acc, icon) => {
    acc[icon] = true;
    return acc;
}, {} as Record<IconNameEnum, true>);

function isValidIcon(value: string): value is IconNameEnum {
    return value in iconMap;
}

export function getValidIcon(icon: string): IconNameEnum {
    const validIconName = getValidIconName(icon);
    return isValidIcon(validIconName) ? validIconName : null;
}

