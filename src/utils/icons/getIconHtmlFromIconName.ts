import type { Icon, IconDefinition, IconName } from '@fortawesome/fontawesome-svg-core';
import { icon } from '@fortawesome/fontawesome-svg-core';

const iconCache = new Map<string, IconDefinition>();

export async function getIconHtmlFromIconName(iconName: IconName | string): Promise<string | null> {
  const usedIconName = iconName.includes('fa') ? iconName : `fa${capitalize(iconName)}`;

  try {
    let iconDefinition: IconDefinition | undefined = iconCache.get(usedIconName);
    if (!iconDefinition) {
      const module = await import(`@fortawesome/free-solid-svg-icons/${usedIconName}`);
      iconDefinition = module?.[usedIconName] as IconDefinition | undefined;
      if (iconDefinition) {
        iconCache.set(usedIconName, iconDefinition);
      }
    }

    if (!iconDefinition) {
      console.error(`Icon "${iconName}" not found"`);
      return null;
    }

    const faIcon: Icon = icon(iconDefinition);
    return faIcon ? faIcon.html[0] : null;
  } catch (err) {
    console.error(`Failed to load icon "${iconName}":`, err);
    return null;
  }
}

function capitalize(iconName: string): string {
  if (!iconName) {
    return iconName;
  }
  return iconName.charAt(0).toUpperCase() + iconName.slice(1);
}
