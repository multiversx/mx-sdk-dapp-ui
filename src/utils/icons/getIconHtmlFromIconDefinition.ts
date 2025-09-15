import type { Icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { icon } from '@fortawesome/fontawesome-svg-core';

export function getIconHtmlFromIconDefinition(iconDefinition: IconDefinition): string | null {
  if (!iconDefinition) {
    return null;
  }

  let faIcon: Icon;
  faIcon = icon(iconDefinition);

  return faIcon ? faIcon.html[0] : null;
}
