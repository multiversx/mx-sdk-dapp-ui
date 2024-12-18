import { library, icon, IconDefinition, Icon, IconName } from '@fortawesome/fontawesome-svg-core';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';

export function getIconHtmlFromIconLookup(iconName: IconName | string): string | null {
  let faIcon: Icon;
  const dynamicIcon = solidIcons[`fa${capitalize(iconName)}`];

  if (!dynamicIcon) {
    console.error(`Icon "${iconName}" not found"`);
    return null;
  }

  library.add(dynamicIcon);
  faIcon = icon(dynamicIcon);

  return faIcon ? faIcon.html[0] : null;
}

export function getIconHtmlFromIconDefinition(iconDefinition: IconDefinition): string | null {
  let faIcon: Icon;
  library.add(iconDefinition);
  faIcon = icon(iconDefinition);

  return faIcon ? faIcon.html[0] : null;
}

function capitalize(iconName: string): string {
  if (!iconName) {
    return iconName;
  }
  return iconName.charAt(0).toUpperCase() + iconName.slice(1);
}
