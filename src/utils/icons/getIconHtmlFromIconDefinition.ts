import type { Icon,IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { icon,library } from '@fortawesome/fontawesome-svg-core';

export function getIconHtmlFromIconDefinition(iconDefinition: IconDefinition): string | null {
  if (!iconDefinition) {
    return null;
  }

  let faIcon: Icon;
  library.add(iconDefinition);
  faIcon = icon(iconDefinition);

  return faIcon ? faIcon.html[0] : null;
}
