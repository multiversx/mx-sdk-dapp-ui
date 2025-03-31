import type { Icon, IconName } from '@fortawesome/fontawesome-svg-core';
import { icon, library } from '@fortawesome/fontawesome-svg-core';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';

export function getIconHtmlFromIconName(iconName: IconName | string): string | null {
  let faIcon: Icon;
  const usedIconName = iconName.includes('fa') ? iconName : `fa${capitalize(iconName)}`;
  const dynamicIcon = solidIcons[usedIconName];

  if (!dynamicIcon) {
    console.error(`Icon "${iconName}" not found"`);
    return null;
  }

  library.add(dynamicIcon);
  faIcon = icon(dynamicIcon);

  return faIcon ? faIcon.html[0] : null;
}

function capitalize(iconName: string): string {
  if (!iconName) {
    return iconName;
  }
  return iconName.charAt(0).toUpperCase() + iconName.slice(1);
}
